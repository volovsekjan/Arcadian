import { ArrowRight, Check, X } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  comparisonColumns,
  comparisonFootnote,
  comparisonRows,
  OURS,
  type ComparisonValue,
} from "@/content/comparison";
import { cn } from "@/lib/utils";

/**
 * How Arcadian compares with what an agency would otherwise do.
 *
 * The Arcadian column is a plain rectangle: a tint, gold on top, hairlines at
 * the sides. It carries no corner radius, because the table is
 * border-collapse and a rounded cell there clips its own background into a
 * curve while the cell box stays square, leaving white quarter-circles inside
 * the highlight.
 *
 * Desktop is a real <table>, so the row and column headers are announced with
 * each cell. A seven-by-four table cannot be read on a phone at any size and
 * sideways scrolling hides exactly the column that matters, so below `md` the
 * same rows render as one card per criterion. Only one of the two is in the
 * accessibility tree at a time, so nothing is announced twice.
 */
function Mark({ value, ours }: { value: ComparisonValue; ours: boolean }) {
  if (value === "yes") {
    return (
      <>
        <Check
          className={cn("icon-inline", ours ? "text-gold-deep" : "text-graphite")}
          strokeWidth={2.5}
          aria-hidden="true"
        />
        <span className="sr-only">Yes</span>
      </>
    );
  }
  if (value === "no") {
    return (
      <>
        <X className="icon-inline text-mist" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">No</span>
      </>
    );
  }
  return <span className="text-body font-medium leading-relaxed text-graphite">{value}</span>;
}

export function Comparison() {
  return (
    <section id="compare" className="bg-ivory py-section md:py-section-lg">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="The alternatives"
            title="What agencies usually do instead."
            description="There are several ways to produce property content. The difference is how repeatable the process is, how much your team needs to manage, and whether the workflow can scale with listing volume."
          />
        </Reveal>

        {/* Desktop and tablet — a real table. */}
        <Reveal delay={0.1}>
          <div className="mt-14 hidden md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Arcadian compared with a freelance editor and with an in-house marketer or the agent
                producing content himself.
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-[28%] pb-4 pr-6 align-bottom">
                    <span className="sr-only">Criterion</span>
                  </th>
                  {comparisonColumns.map((column, i) => (
                    <th
                      key={column}
                      scope="col"
                      className={cn(
                        "px-5 pb-4 align-bottom font-sans text-h3 font-semibold leading-snug",
                        i === OURS
                          ? "border-x border-t-2 border-x-line border-t-gold bg-gold/[0.06] pt-5 text-ink"
                          : "text-graphite",
                      )}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => (
                  <tr key={row.criterion} className="align-top">
                    <th
                      scope="row"
                      className="border-t border-line py-5 pr-6 text-body font-semibold leading-relaxed text-ink"
                    >
                      {row.criterion}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={comparisonColumns[i]}
                        className={cn(
                          "border-t border-line px-5 py-5",
                          i === OURS &&
                            "border-x border-x-line bg-gold/[0.06] text-body font-semibold text-ink",
                          i === OURS && rowIndex === comparisonRows.length - 1 && "border-b",
                        )}
                      >
                        <Mark value={value} ours={i === OURS} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile — one card per criterion, Arcadian first and in gold. */}
        <div className="mt-14 flex flex-col gap-4 md:hidden">
          {comparisonRows.map((row, i) => (
            <Reveal key={row.criterion} delay={Math.min(i, 4) * 0.06}>
              <div className="overflow-hidden rounded-2xl border border-line">
                <h3 className="border-b border-line px-5 py-4 font-sans text-h3 font-semibold leading-snug text-ink">
                  {row.criterion}
                </h3>
                <dl className="divide-y divide-line">
                  {row.values.map((value, columnIndex) => (
                    <div
                      key={comparisonColumns[columnIndex]}
                      className={cn(
                        "flex items-baseline gap-4 px-5 py-3.5",
                        columnIndex === OURS && "bg-gold/[0.06]",
                      )}
                    >
                      <dt
                        className={cn(
                          "w-32 shrink-0 text-fine font-semibold uppercase tracking-[0.11em]",
                          columnIndex === OURS ? "text-gold-deep" : "text-mist",
                        )}
                      >
                        {comparisonColumns[columnIndex]}
                      </dt>
                      <dd
                        className={cn(
                          "flex items-center text-body",
                          columnIndex === OURS
                            ? "font-semibold text-ink"
                            : "font-medium text-graphite",
                        )}
                      >
                        <Mark value={value} ours={columnIndex === OURS} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-col gap-6">
            <p className="max-w-2xl text-body-sm font-medium text-graphite">{comparisonFootnote}</p>
            <div>
              <Button variant="ghost" href="/#pricing">
                Work with us
                <ArrowRight className="icon-inline" strokeWidth={1.75} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
