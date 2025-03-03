import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Database,
  FileJson,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container relative">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col space-y-6">
                <Badge className="w-fit" variant="outline">
                  <Sparkles className="mr-1 h-3 w-3" /> AI-Powered Mock Data
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Generate Realistic{" "}
                  <span className="text-primary">Mock Data</span> in Seconds
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  mockr.io is an easy-to-use, powerful mock data generator with
                  AI integration. Perfect for developers, testers, and data
                  scientists.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      View Documentation
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    No credit card required
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    Free plan available
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-primary/40 blur-xl opacity-70"></div>
                <div className="relative bg-background border rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-muted/50 p-4 border-b flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-medium">
                      mockr.io - AI Data Generator
                    </div>
                  </div>
                  <div className="p-6 font-mono text-sm overflow-hidden">
                    <pre className="text-xs md:text-sm overflow-x-auto">
                      {`// Generate 10 users with AI
const users = await mockr.generate({
  type: "users",
  count: 10,
  fields: {
    id: "uuid",
    name: "fullName",
    email: "email",
    avatar: "avatar",
    role: "jobTitle",
    createdAt: "pastDate"
  },
  ai: {
    contextual: true,
    consistency: 0.8
  }
});

// Result preview:
[
  {
    "id": "f7c12a4e-8729-4f13-a43b-6ced54f4e4e2",
    "name": "Emma Thompson",
    "email": "emma.thompson@acmetech.com",
    "avatar": "https://randomuser.me/api/portraits/women/24.jpg",
    "role": "Senior Product Manager",
    "createdAt": "2023-08-12T09:34:21Z"
  },
  ...
]`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="text-center mb-8">
              <p className="text-sm font-medium text-muted-foreground">
                TRUSTED BY DEVELOPERS FROM
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
              {["Google", "Microsoft", "Airbnb", "Spotify", "Netflix"].map(
                (company) => (
                  <div
                    key={company}
                    className="text-xl font-bold text-muted-foreground"
                  >
                    {company}
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="mb-4" variant="outline">
                Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Everything you need to generate perfect mock data
              </h2>
              <p className="text-xl text-muted-foreground">
                mockr.io provides all the tools you need to create realistic,
                contextual mock data for your applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  AI-Powered Generation
                </h3>
                <p className="text-muted-foreground flex-1">
                  Generate realistic data using advanced AI models that
                  understand context and relationships between data points.
                </p>
                <Link
                  href="/features/ai"
                  className="text-primary font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileJson className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Multiple Export Formats
                </h3>
                <p className="text-muted-foreground flex-1">
                  Export your mock data in JSON, CSV, SQL, and more formats with
                  a single click. Perfect for any use case.
                </p>
                <Link
                  href="/features/exports"
                  className="text-primary font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">API Integration</h3>
                <p className="text-muted-foreground flex-1">
                  Integrate with your applications via our simple and powerful
                  API for automated data generation in your workflow.
                </p>
                <Link
                  href="/features/api"
                  className="text-primary font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Custom Templates</h3>
                <p className="text-muted-foreground flex-1">
                  Create and save your own data templates for quick access to
                  your most common data generation needs.
                </p>
                <Link
                  href="/features/templates"
                  className="text-primary font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Blazing Fast</h3>
                <p className="text-muted-foreground flex-1">
                  Generate thousands of records in seconds with our optimized
                  data generation engine. No waiting around.
                </p>
                <Link
                  href="/features/performance"
                  className="text-primary font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
                <p className="text-muted-foreground flex-1">
                  Share templates and datasets with your team for seamless
                  collaboration on projects.
                </p>
                <Link
                  href="/features/teams"
                  className="text-primary font-medium mt-4 inline-flex items-center hover:underline"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="mb-4" variant="outline">
                How It Works
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Generate mock data in three simple steps
              </h2>
              <p className="text-xl text-muted-foreground">
                mockr.io makes it easy to create realistic mock data for your
                applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative flex flex-col items-center text-center p-6">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Database className="h-20 w-20 text-primary/60" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Choose your data type
                </h3>
                <p className="text-muted-foreground">
                  Select from dozens of pre-built data types or create your own
                  custom schema.
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center p-6">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Sparkles className="h-20 w-20 text-primary/60" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customize with AI</h3>
                <p className="text-muted-foreground">
                  Fine-tune your data with AI to make it more realistic and
                  contextually relevant.
                </p>
              </div>

              <div className="relative flex flex-col items-center text-center p-6">
                <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <FileJson className="h-20 w-20 text-primary/60" />
                </div>
                <h3 className="text-xl font-bold mb-2">Export and use</h3>
                <p className="text-muted-foreground">
                  Export your data in your preferred format or use our API to
                  integrate directly.
                </p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/register">
                <Button size="lg" className="rounded-full">
                  Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-background">
          <div className="container">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="mb-4" variant="outline">
                Testimonials
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Loved by developers worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                See what our users have to say about mockr.io
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Senior Developer at TechCorp",
                  quote:
                    "mockr.io has saved me countless hours of creating test data. The AI-powered generation is incredibly realistic and the API is a breeze to work with.",
                },
                {
                  name: "Michael Chen",
                  role: "QA Engineer at StartupX",
                  quote:
                    "As a QA engineer, I need reliable test data. mockr.io provides exactly what I need with the ability to create consistent, realistic datasets for our testing scenarios.",
                },
                {
                  name: "Jessica Williams",
                  role: "Data Scientist at AnalyticsPro",
                  quote:
                    "The AI capabilities of mockr.io are impressive. I can generate contextually relevant data that actually makes sense for our machine learning models.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col p-6 bg-muted rounded-xl"
                >
                  <div className="flex-1">
                    <p className="italic text-muted-foreground mb-6">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5 border-y">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Ready to generate perfect mock data?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of developers who are already using mockr.io to
                create realistic mock data for their applications.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="rounded-full">
                    Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="rounded-full">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
