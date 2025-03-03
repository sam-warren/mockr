import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code, FileJson, Brain, CheckCircle } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

const userProfilesCode = `// Generate AI-enhanced user profiles
const users = await mockr.generate({
  type: "users",
  count: 5,
  fields: {
    id: "uuid",
    name: "fullName",
    email: "email",
    role: "jobTitle",
    department: "department",
    skills: "array:skill:3-5",
    bio: "paragraph"
  },
  ai: {
    contextual: true,
    consistency: 0.9,
    enhance: {
      bio: "Write a professional bio that matches the person's job role and skills"
    }
  }
});

// Result preview:
[
  {
    "id": "8f4e2a1c-9b7d-5e6f-3c2d-1a0b9c8d7e6f",
    "name": "Alex Rivera",
    "email": "alex.rivera@techcorp.com",
    "role": "Senior Data Scientist",
    "department": "Analytics",
    "skills": ["Python", "TensorFlow", "Data Visualization", "Statistical Analysis"],
    "bio": "Experienced data scientist with 8+ years specializing in predictive modeling and machine learning algorithms. Passionate about transforming complex data into actionable insights that drive business decisions."
  },
  ...
]`;

export default function Home() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-12 md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          {/* Animated gradient orbs */}
          <div className="absolute top-1/4 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="container px-6 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="flex flex-col space-y-8 pt-8 md:pt-12">
                <Badge className="w-fit" variant="outline">
                  <Brain className="mr-1 h-3 w-3" /> AI-Powered Mock Data
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Generate <span className="text-primary">Intelligent</span> Mock Data in Seconds
                </h1>
                <p className="text-xl text-muted-foreground">
                  mockr.io uses advanced AI to create contextually relevant, realistic mock data for your applications.
                  Perfect for developers, testers, and data scientists.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/register">
                    <Button size="lg" className="rounded-full">
                      Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline" size="lg" className="rounded-full">
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
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/40 blur-xl opacity-70"></div>
                <div className="relative bg-background border rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-muted/50 p-4  flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs font-medium">mockr.io - AI Data Generator</div>
                  </div>
                  <div className="font-mono text-sm overflow-hidden">
                    <CodeBlock code={userProfilesCode} language="javascript" showLineNumbers={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Features Section */}
        <section className="py-28 bg-background">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <Badge className="mb-4" variant="outline">
                <Brain className="mr-1 h-3 w-3" /> AI-Powered Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Intelligent Mock Data for Modern Applications
              </h2>
              <p className="text-xl text-muted-foreground">
                Our AI understands context, relationships, and domain-specific patterns to generate the most realistic mock data possible.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col p-8 bg-background rounded-xl border shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Brain className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Contextual Intelligence</h3>
                <p className="text-muted-foreground flex-1">
                  Our AI understands relationships between data fields, ensuring names match genders, addresses are geographically accurate, and more.
                </p>
                <Link href="/features" className="text-primary font-medium mt-6 inline-flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="flex flex-col p-8 bg-background rounded-xl border shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <FileJson className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Schema Detection</h3>
                <p className="text-muted-foreground flex-1">
                  Upload your database schema or API spec, and our AI will automatically generate perfectly matching mock data with realistic values.
                </p>
                <Link href="/features" className="text-primary font-medium mt-6 inline-flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="flex flex-col p-8 bg-background rounded-xl border shadow-sm">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <Code className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Content Generation</h3>
                <p className="text-muted-foreground flex-1">
                  Generate realistic articles, product descriptions, user bios, and more with our AI content generator tailored to your specific needs.
                </p>
                <Link href="/features" className="text-primary font-medium mt-6 inline-flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5 border-y">
          <div className="container px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Ready to transform your development workflow?
              </h2>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of developers who are already using mockr.io to create intelligent mock data for their applications.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
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
      <footer className="border-t py-12">
        <div className="container px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/features" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <ul className="space-y-3">
                <li><Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">Twitter</Link></li>
                <li><Link href="https://github.com" className="text-muted-foreground hover:text-foreground">GitHub</Link></li>
                <li><Link href="https://discord.com" className="text-muted-foreground hover:text-foreground">Discord</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-10 pt-10 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} mockr.io. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
