import { cn } from "@/lib/utils";

export function PageHeader({
  heading,
  description,
  className,
}: {
  heading: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-3 py-8 sm:py-12", className)}>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        {heading}
      </h1>
      {description ? (
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
