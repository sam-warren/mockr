import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Choose the plan that&apos;s right for your team. All plans include a
            14-day free trial.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Free Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>
                Perfect for side projects and learning
              </CardDescription>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $0
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  /month
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">One project</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Basic data templates</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Community support</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">1,000 API calls/month</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <Button variant="outline" className="w-full cursor-pointer">
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="flex flex-col relative">
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <Badge className="bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>
                For professional developers and small teams
              </CardDescription>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $29
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  /month
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Unlimited projects</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Advanced data templates</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Priority email support</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">50,000 API calls/month</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">VS Code extension</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <Button className="w-full cursor-pointer">
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription>
                For large teams and organizations
              </CardDescription>
              <div className="mt-4 flex items-baseline text-3xl font-bold">
                $99
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  /month
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Everything in Pro</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Custom data templates</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Dedicated support</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">Unlimited API calls</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">SSO & advanced security</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <p className="text-sm">SLA & priority support</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto pt-4">
              <Button variant="outline" className="w-full cursor-pointer">
                Contact Sales
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </section>
  );
}
