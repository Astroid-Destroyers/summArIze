import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
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
          heading="About this template"
          description="A modern Next.js starter built with shadcn/ui, TypeScript, and best practices."
        />

        <div className="space-y-8 pb-12">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="rounded-xl border bg-background p-6">
              <h2 className="mt-0 text-2xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground">
                This starter template was created to help developers quickly
                bootstrap modern web applications with a solid foundation. We
                believe in using battle-tested tools and following industry best
                practices.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border bg-background p-6">
                <h3 className="mt-0 text-lg font-semibold">Built with</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Next.js 16 (App Router)</li>
                  <li>• React 19</li>
                  <li>• TypeScript 5</li>
                  <li>• Tailwind CSS 4</li>
                  <li>• shadcn/ui + Radix</li>
                  <li>• Lucide Icons</li>
                </ul>
              </div>

              <div className="rounded-xl border bg-background p-6">
                <h3 className="mt-0 text-lg font-semibold">Includes</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Responsive navigation</li>
                  <li>• Multiple page templates</li>
                  <li>• Dark mode support</li>
                  <li>• Accessible components</li>
                  <li>• Mobile-first design</li>
                  <li>• TypeScript strict mode</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <h2 className="mt-0 text-2xl font-semibold">Why this stack?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Next.js</strong> provides
                  the best developer experience with features like server
                  components, automatic code splitting, and optimized
                  performance out of the box.
                </p>
                <p>
                  <strong className="text-foreground">shadcn/ui</strong> gives
                  you beautiful, accessible components that you can copy,
                  customize, and own. No npm bloat, just the code you need.
                </p>
                <p>
                  <strong className="text-foreground">TypeScript</strong>{" "}
                  catches bugs before they reach production and makes your code
                  more maintainable as your project grows.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border bg-muted/30 p-8 text-center">
              <h2 className="mt-0 text-2xl font-bold">Get in touch</h2>
              <p className="text-muted-foreground">
                Questions, feedback, or just want to say hi? We'd love to hear
                from you.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="mailto:hello@example.com">Send us an email</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="https://github.com" target="_blank">
                    View on GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
