import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";

const DOCS_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Installation",
        description: "How to set up the project locally and configure it.",
        href: "#installation",
      },
      {
        title: "Project Structure",
        description: "Understanding the folder structure and organization.",
        href: "#structure",
      },
      {
        title: "Configuration",
        description: "Customize the template to match your needs.",
        href: "#configuration",
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "UI Components",
        description: "Button, Sheet, DropdownMenu, Avatar, and NavigationMenu.",
        href: "#ui-components",
      },
      {
        title: "Layout Components",
        description: "Header, Container, and PageHeader for consistent layouts.",
        href: "#layout-components",
      },
      {
        title: "Custom Components",
        description: "Build your own components using the shadcn patterns.",
        href: "#custom-components",
      },
    ],
  },
  {
    title: "Authentication",
    items: [
      {
        title: "Adding Auth",
        description: "Connect NextAuth, Clerk, or your preferred auth provider.",
        href: "#auth",
      },
      {
        title: "Protected Routes",
        description: "Implement route protection and middleware.",
        href: "#protected-routes",
      },
      {
        title: "User Profile",
        description: "Customize the profile page and user settings.",
        href: "#user-profile",
      },
    ],
  },
];

export default function DocsPage() {
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
          heading="Documentation"
          description="Learn how to use and customize this starter template for your next project."
        />

        <div className="grid gap-8 pb-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {DOCS_SECTIONS.map((section) => (
                <div key={section.title}>
                  <h2 className="mb-4 text-2xl font-bold tracking-tight">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg border bg-background p-4 transition-colors hover:bg-accent"
                      >
                        <h3 className="mb-1 font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div id="installation" className="rounded-xl border bg-muted/30 p-6">
                <h2 className="mb-3 text-xl font-semibold">Quick Start</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="mb-2 font-medium">1. Clone the repository</p>
                    <code className="block rounded bg-background p-2 font-mono text-xs">
                      git clone your-repo-url
                    </code>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">2. Install dependencies</p>
                    <code className="block rounded bg-background p-2 font-mono text-xs">
                      npm install
                    </code>
                  </div>
                  <div>
                    <p className="mb-2 font-medium">3. Run the dev server</p>
                    <code className="block rounded bg-background p-2 font-mono text-xs">
                      npm run dev
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl border bg-background p-4">
                <h3 className="mb-3 font-semibold">On this page</h3>
                <ul className="space-y-2 text-sm">
                  {DOCS_SECTIONS.map((section) => (
                    <li key={section.title}>
                      <span className="font-medium">{section.title}</span>
                      <ul className="ml-3 mt-1 space-y-1">
                        {section.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="text-muted-foreground hover:text-foreground"
                            >
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border bg-muted/30 p-4">
                <h3 className="mb-2 font-semibold">Need help?</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  Can't find what you're looking for?
                </p>
                <Button asChild variant="outline" className="w-full" size="sm">
                  <Link href="/about">Contact support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
