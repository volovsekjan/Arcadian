import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

/** Content column: max 1360px, generous side padding, never edge-to-edge. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
