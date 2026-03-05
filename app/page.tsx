import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader
        user={{
          name: "Alex Morgan",
          email: "alex@example.com",
        }}
      />

      <Container>
        <section className="py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-full bg-muted px-3 py-1 text-sm font-medium">
                  Modern Next.js Template
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Build faster with a solid foundation
                </h1>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  A production-ready starter template with Next.js 16, shadcn/ui,
                  TypeScript, and everything you need to ship quickly.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/login">Get started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/features">See features</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  ✓ <span>TypeScript</span>
                </div>
                <div className="flex items-center gap-2">
                  ✓ <span>Dark mode</span>
                </div>
                <div className="flex items-center gap-2">
                  ✓ <span>Responsive</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl border bg-muted/30 p-8">
                <div className="space-y-4">
                  <div className="rounded-lg border bg-background p-4 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="h-3 w-24 rounded bg-foreground/10" />
                      <div className="h-6 w-6 rounded-full bg-foreground/10" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-foreground/10" />
                      <div className="h-2 w-5/6 rounded bg-foreground/10" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg border bg-background p-3">
                      <div className="mb-2 h-8 w-8 rounded bg-foreground/10" />
                      <div className="h-2 w-16 rounded bg-foreground/10" />
                    </div>
                    <div className="rounded-lg border bg-background p-3">
                      <div className="mb-2 h-8 w-8 rounded bg-foreground/10" />
                      <div className="h-2 w-16 rounded bg-foreground/10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t py-16 sm:py-20">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="text-muted-foreground">
              Pre-built pages and components to accelerate your development
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              href="/features"
              className="group rounded-xl border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="mb-3 text-3xl">🎨</div>
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                Rich Features
              </h3>
              <p className="text-sm text-muted-foreground">
                Navigation, auth, dark mode, and more—all ready to use.
              </p>
            </Link>

            <Link
              href="/docs"
              className="group rounded-xl border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="mb-3 text-3xl">📚</div>
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                Documentation
              </h3>
              <p className="text-sm text-muted-foreground">
                Clear guides to help you get started and customize.
              </p>
            </Link>

            <Link
              href="/pricing"
              className="group rounded-xl border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="mb-3 text-3xl">💎</div>
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                Pricing Ready
              </h3>
              <p className="text-sm text-muted-foreground">
                Pre-built pricing page with multiple tiers.
              </p>
            </Link>

            <Link
              href="/about"
              className="group rounded-xl border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="mb-3 text-3xl">ℹ️</div>
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                About Page
              </h3>
              <p className="text-sm text-muted-foreground">
                Tell your story with a professional about page.
              </p>
            </Link>

            <Link
              href="/login"
              className="group rounded-xl border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="mb-3 text-3xl">🔐</div>
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                Auth Pages
              </h3>
              <p className="text-sm text-muted-foreground">
                Login and profile pages ready for your auth provider.
              </p>
            </Link>

            <Link
              href="/profile"
              className="group rounded-xl border bg-background p-6 transition-all hover:shadow-md"
            >
              <div className="mb-3 text-3xl">👤</div>
              <h3 className="mb-2 text-lg font-semibold group-hover:underline">
                User Profile
              </h3>
              <p className="text-sm text-muted-foreground">
                Complete profile page with settings and preferences.
              </p>
            </Link>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="rounded-3xl border bg-gradient-to-br from-muted/50 to-muted/30 p-8 text-center sm:p-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to start building?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Clone this template and have a production-ready app running in
              minutes. All the boilerplate is done for you.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/login">Get started for free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com" target="_blank">
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t py-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p>© {new Date().getFullYear()} Summarize. Built with Next.js & shadcn/ui</p>
            <div className="flex gap-6">
              <Link href="/docs" className="hover:text-foreground">
                Docs
              </Link>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
              <Link href="https://github.com" className="hover:text-foreground">
                GitHub
              </Link>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
}
