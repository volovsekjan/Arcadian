import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";

/**
 * Contact form endpoint.
 *
 * The browser posts here (never to n8n directly); this server-only route
 * validates the payload with the shared Zod schema and forwards
 * { name, email, company, plan, message } as separate top-level fields to the
 * n8n webhook. `consent` is validation-only and is never forwarded. The webhook
 * URL lives in a server-only env var (N8N_EMAIL_WEBHOOK_URL) so it is never
 * shipped to the client, and internal errors / response bodies are never
 * surfaced to the browser.
 */

// This route performs a side effect (webhook POST); it must never be cached or
// statically evaluated.
export const dynamic = "force-dynamic";

const WEBHOOK_TIMEOUT_MS = 10_000;

const GENERIC_FAILURE = "We could not send your message right now. Please try again shortly.";

type ApiResponse = { ok: boolean; message: string };

function reply(body: ApiResponse, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  // 1. Parse the body defensively — malformed JSON must not throw.
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return reply({ ok: false, message: "Please check the form and try again." }, 400);
  }

  // 2. Validate + sanitize against the shared schema. `.trim()` in the schema
  //    trims all user strings; unknown/extra fields are dropped by the parse.
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return reply({ ok: false, message: "Please check the form and try again." }, 400);
  }
  const data = parsed.data;

  // 3. The destination is server configuration — never derived from user input.
  const webhookUrl = process.env.N8N_EMAIL_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[contact] N8N_EMAIL_WEBHOOK_URL is not configured.");
    return reply({ ok: false, message: "The contact form is temporarily unavailable." }, 500);
  }

  // 4. Forward the fields n8n expects as separate top-level values.
  //    `consent` and `authorized` are intentionally not forwarded
  //    (validation-only).
  //
  //    `plan` is sent EMPTY rather than dropped. The "Service of interest"
  //    field it carried has been removed from the form, but this key existed
  //    specifically so n8n could map it, and a workflow that maps a missing
  //    key can fail differently from one that maps an empty string. Sending
  //    "" keeps the payload shape n8n was built against.
  //    TODO: delete the key once the n8n workflow no longer references it.
  const outgoing = JSON.stringify({
    name: data.name,
    email: data.email,
    whatsapp: data.whatsapp,
    company: data.company,
    plan: "",
    listingUrl: data.listingUrl ?? "",
    listingsPerMonth: data.listingsPerMonth,
    message: data.message ?? "",
  });

  // 5. Forward to n8n with a bounded timeout; treat anything non-2xx as failure.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: outgoing,
      cache: "no-store",
      signal: controller.signal,
    });

    // Do not assume the response is JSON; read it defensively for logging only.
    const detail = await safeReadBody(res);

    if (!res.ok) {
      console.error(`[contact] n8n webhook responded ${res.status}: ${detail}`);
      return reply({ ok: false, message: GENERIC_FAILURE }, 502);
    }

    return reply({ ok: true, message: "Your message has been sent." }, 200);
  } catch (error) {
    if (isAbortError(error)) {
      console.error("[contact] n8n webhook timed out after", WEBHOOK_TIMEOUT_MS, "ms");
      return reply(
        { ok: false, message: "The request timed out. Please try again in a moment." },
        504,
      );
    }
    console.error("[contact] Failed to reach n8n webhook:", errorSummary(error));
    return reply({ ok: false, message: GENERIC_FAILURE }, 502);
  } finally {
    clearTimeout(timeout);
  }
}

/** Reads a response body as text without assuming JSON; never throws. */
async function safeReadBody(res: Response): Promise<string> {
  try {
    const text = await res.text();
    return text.trim() ? text.slice(0, 300) : "(empty body)";
  } catch {
    return "(unreadable body)";
  }
}

/** True for a fetch aborted by the timeout (DOMException or Error, name check). */
function isAbortError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    (error as { name: unknown }).name === "AbortError"
  );
}

function errorSummary(error: unknown): string {
  return error instanceof Error ? `${error.name}: ${error.message}` : "unknown error";
}
