import Link from "next/link";
import { Check } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out and small projects.",
    features: [
      "Up to 3 projects",
      "Basic components",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    description: "For professionals and growing teams.",
    features: [
      "Unlimited projects",
      "All components",
      "Priority support",
      "Advanced analytics",
      "Custom domains",
      "Team collaboration",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs.",
    features: [
      "Everything in Pro",
      "Dedicated support",
      "SLA guarantees",
      "Custom integrations",
      "Advanced security",
      "Training & onboarding",
    ],
    cta: "Contact sales",
    popular: false,
  },
];

export default function PricingPage() {
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
          heading="Simple, transparent pricing"
          description="Choose the plan that's right for you. Start free and scale as you grow."
        />

        <div className="grid gap-6 pb-12 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border bg-background p-8 shadow-sm",
                plan.popular && "border-foreground shadow-md"
              )}
            >
              {plan.popular ? (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-foreground px-4 py-1 text-xs font-medium text-background">
                  Most popular
                </div>
              ) : null}

              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  {plan.price !== "Custom" ? (
                    <span className="text-muted-foreground">/month</span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <Button
                asChild
                className="mb-6 w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                <Link href="/login">{plan.cta}</Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-6 pb-12">
          <div className="rounded-xl border bg-background p-6">
            <h2 className="mb-3 text-xl font-semibold">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 font-medium">Can I change plans later?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade at any time. Changes take
                  effect immediately.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee on all paid plans. No
                  questions asked.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium">
                  What payment methods do you accept?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and offer invoicing
                  for Enterprise customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
