import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    title: "Responsive Navigation",
    description:
      "Desktop navigation menu with dropdowns and mobile-optimized sheet menu that works seamlessly across all devices.",
    icon: "📱",
  },
  {
    title: "User Authentication",
    description:
      "Pre-built login and profile pages with avatar dropdown menu. Easy to connect to your auth provider of choice.",
    icon: "🔐",
  },
  {
    title: "shadcn/ui Components",
    description:
      "Built with shadcn/ui and Radix primitives for accessible, customizable components that match your design system.",
    icon: "🎨",
  },
  {
    title: "Dark Mode Support",
    description:
      "Automatic dark mode detection with CSS variables. All components adapt to user's system preferences seamlessly.",
    icon: "🌙",
  },
  {
    title: "TypeScript First",
    description:
      "Full TypeScript support with proper typing throughout. Catch errors early and enjoy better IDE autocomplete.",
    icon: "📘",
  },
  {
    title: "Next.js 16",
    description:
      "Built on the latest Next.js with App Router, Server Components, and optimized for performance out of the box.",
    icon: "⚡",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader
        user={{
          name: "Alex Morgan",
          email: "alex@example.com",
        }}
      />

      <Container>
        <PageHeader
          heading="Features"
          description="Everything you need to build modern web applications with confidence."
        />

        <div className="grid gap-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-background p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border bg-muted/30 p-8 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Clone this template and start building your next project with all
            these features included.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/login">Get started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View pricing</Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
