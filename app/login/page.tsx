import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <Container>
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            <div className="rounded-xl border bg-background p-6 shadow-sm">
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border"
                    />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link
                    href="#"
                    className="text-foreground hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button asChild className="w-full">
                  <Link href="/">Sign in</Link>
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">
                  GitHub
                </Button>
                <Button variant="outline" className="w-full">
                  Google
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="#" className="font-medium text-foreground hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
