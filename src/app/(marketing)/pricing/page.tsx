import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { AppFooter } from "@/components/app-footer";

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold tracking-tighter mb-4">Simple, Transparent Pricing</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the plan that&apos;s right for you. All plans include a 14-day free trial.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Plan */}
              <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Free</h3>
                  <p className="text-sm text-muted-foreground">For personal projects and testing</p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">100 records per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Basic data types</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">JSON export</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Community support</span>
                  </li>
                </ul>
                <Link href="/register" className="mt-auto">
                  <Button className="w-full" variant="outline">
                    Get Started
                  </Button>
                </Link>
              </div>
              
              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-background rounded-lg border border-primary shadow-sm relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Pro</h3>
                  <p className="text-sm text-muted-foreground">For professionals and small teams</p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">10,000 records per day</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">All data types</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">JSON, CSV, SQL exports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Basic AI generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Link href="/register" className="mt-auto">
                  <Button className="w-full">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
              
              {/* Enterprise Plan */}
              <div className="flex flex-col p-6 bg-background rounded-lg border shadow-sm">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">Enterprise</h3>
                  <p className="text-sm text-muted-foreground">For large teams and organizations</p>
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Unlimited records</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">All data types</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">All export formats</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Advanced API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Advanced AI generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Custom templates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Link href="/register" className="mt-auto">
                  <Button className="w-full" variant="outline">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-bold mb-4">Need a custom plan?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We offer custom plans for organizations with specific needs. Contact us to discuss your requirements.
              </p>
              <Link href="/contact">
                <Button variant="outline">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <AppFooter />
    </div>
  );
} 