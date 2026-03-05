"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentLink,
  NavigationMenuContentPanel,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

type SiteUser = {
  name: string;
  email?: string;
  imageUrl?: string;
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase()).join("");
}

export function SiteHeader({
  user,
  className,
}: {
  user?: SiteUser;
  className?: string;
}) {
  const pathname = usePathname();
  const isAuthed = Boolean(user);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight hover:opacity-90"
          >
            Summarize
          </Link>
        </div>

        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle,
                  pathname === "/" && "bg-accent/80 text-accent-foreground"
                )}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuContentPanel>
                    <NavigationMenuLink asChild>
                      <NavigationMenuContentLink
                        href="/features"
                        title="Features"
                        description="All the components and tools included."
                      />
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <NavigationMenuContentLink
                        href="/pricing"
                        title="Pricing"
                        description="Simple, transparent pricing plans."
                      />
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <NavigationMenuContentLink
                        href="/docs"
                        title="Documentation"
                        description="Learn how to use the template."
                      />
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <NavigationMenuContentLink
                        href="/about"
                        title="About"
                        description="Learn more about this project."
                      />
                    </NavigationMenuLink>
                  </NavigationMenuContentPanel>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle,
                  pathname === "/pricing" && "bg-accent/80 text-accent-foreground"
                )}>
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={cn(
                  navigationMenuTriggerStyle,
                  pathname === "/docs" && "bg-accent/80 text-accent-foreground"
                )}>
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:flex md:items-center md:gap-2">
            {!isAuthed ? (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/login">Get started</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Open profile menu"
                  >
                    <Avatar>
                      {user?.imageUrl ? (
                        <AvatarImage src={user.imageUrl} alt={user.name} />
                      ) : null}
                      <AvatarFallback>
                        {initials(user?.name ?? "User")}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm">{user?.name}</span>
                      {user?.email ? (
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      ) : null}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="p-4">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
              </div>
              <div className="grid gap-1 px-2 pb-4">
                <SheetClose asChild>
                  <Link href="/" className={cn(
                    "rounded-md px-3 py-2 text-sm hover:bg-accent",
                    pathname === "/" && "bg-accent text-accent-foreground font-medium"
                  )}>
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/features" className={cn(
                    "rounded-md px-3 py-2 text-sm hover:bg-accent",
                    pathname === "/features" && "bg-accent text-accent-foreground font-medium"
                  )}>
                    Features
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/pricing" className={cn(
                    "rounded-md px-3 py-2 text-sm hover:bg-accent",
                    pathname === "/pricing" && "bg-accent text-accent-foreground font-medium"
                  )}>
                    Pricing
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/docs" className={cn(
                    "rounded-md px-3 py-2 text-sm hover:bg-accent",
                    pathname === "/docs" && "bg-accent text-accent-foreground font-medium"
                  )}>
                    Docs
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className={cn(
                    "rounded-md px-3 py-2 text-sm hover:bg-accent",
                    pathname === "/about" && "bg-accent text-accent-foreground font-medium"
                  )}>
                    About
                  </Link>
                </SheetClose>
              </div>
              <div className="border-t p-4">
                {!isAuthed ? (
                  <div className="grid gap-2">
                    <SheetClose asChild>
                      <Button asChild variant="outline" className="w-full">
                        <Link href="/login">Log in</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild className="w-full">
                        <Link href="/login">Get started</Link>
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        {user?.imageUrl ? (
                          <AvatarImage src={user.imageUrl} alt={user.name} />
                        ) : null}
                        <AvatarFallback>
                          {initials(user?.name ?? "User")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">
                          {user?.name}
                        </div>
                        {user?.email ? (
                          <div className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/profile">Profile</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="w-full">
                          <Link href="/settings">Settings</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="w-full">
                          <Link href="/logout">Log out</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
