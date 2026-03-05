import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const user = {
    name: "Alex Morgan",
    email: "alex@example.com",
    imageUrl: "",
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader user={user} />

      <Container>
        <PageHeader
          heading="Profile"
          description="Manage your account settings and preferences."
        />

        <div className="grid gap-6 pb-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border bg-background p-6">
              <h2 className="mb-4 text-lg font-semibold">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    {user.imageUrl ? (
                      <AvatarImage src={user.imageUrl} alt={user.name} />
                    ) : null}
                    <AvatarFallback className="text-lg">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Change photo
                    </Button>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Full name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save changes</Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-background p-6">
              <h2 className="mb-4 text-lg font-semibold">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Current password
                  </label>
                  <input
                    type="password"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    New password
                  </label>
                  <input
                    type="password"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Confirm new password
                  </label>
                  <input
                    type="password"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="flex justify-end">
                  <Button>Update password</Button>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
              <h2 className="mb-2 text-lg font-semibold text-red-900 dark:text-red-200">
                Danger Zone
              </h2>
              <p className="mb-4 text-sm text-red-700 dark:text-red-300">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950">
                Delete account
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-xl border bg-background p-4">
                <h3 className="mb-3 font-semibold">Account Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Plan</span>
                    <span className="font-medium">Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member since</span>
                    <span className="font-medium">Jan 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="mt-4 w-full" size="sm">
                  <Link href="/pricing">Upgrade plan</Link>
                </Button>
              </div>

              <div className="rounded-xl border bg-muted/30 p-4">
                <h3 className="mb-2 font-semibold">Quick Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link
                      href="/docs"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Support
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
