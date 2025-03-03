import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Book, 
  Code, 
  FileJson, 
  Terminal,
  Brain,
  Lightbulb,
  Search
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

const exampleCode = `// Import the mockr.io client
const mockr = require('mockr-io');

// Initialize the client with your API key
const client = new mockr.Client('your-api-key');

// Generate 5 users with AI-enhanced bios
async function generateUsers() {
  const users = await client.generate({
    type: "users",
    count: 5,
    fields: {
      id: "uuid",
      name: "fullName",
      email: "email",
      role: "jobTitle",
      bio: "paragraph"
    },
    ai: {
      contextual: true,
      enhance: {
        bio: "Write a professional bio that matches the person's job role"
      }
    }
  });
  
  console.log(users);
}

generateUsers();`;

export default function DocsPage() {
  return (
    <>
      <div className="flex flex-col md:flex-row pt-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r shrink-0 md:sticky md:top-16 md:h-[calc(100vh-4rem)]">
          <div className="p-6 md:p-8 overflow-y-auto h-full">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search documentation..." 
                  className="w-full rounded-md border border-input pl-8 py-2 text-sm"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/docs" className="text-sm text-primary hover:underline">
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/quickstart" className="text-sm text-muted-foreground hover:text-foreground">
                      Quick Start
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/installation" className="text-sm text-muted-foreground hover:text-foreground">
                      Installation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">AI Features</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/docs/ai/overview" className="text-sm text-muted-foreground hover:text-foreground">
                      AI Overview
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/ai/contextual" className="text-sm text-muted-foreground hover:text-foreground">
                      Contextual Intelligence
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/ai/content" className="text-sm text-muted-foreground hover:text-foreground">
                      Content Generation
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">API Reference</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/docs/api/authentication" className="text-sm text-muted-foreground hover:text-foreground">
                      Authentication
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api/endpoints" className="text-sm text-muted-foreground hover:text-foreground">
                      Endpoints
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/api/examples" className="text-sm text-muted-foreground hover:text-foreground">
                      Examples
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Guides</h3>
                <ul className="space-y-1">
                  <li>
                    <Link href="/docs/guides/schema" className="text-sm text-muted-foreground hover:text-foreground">
                      Working with Schemas
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/guides/templates" className="text-sm text-muted-foreground hover:text-foreground">
                      Custom Templates
                    </Link>
                  </li>
                  <li>
                    <Link href="/docs/guides/integration" className="text-sm text-muted-foreground hover:text-foreground">
                      Integration Examples
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6 md:p-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Badge className="mb-4" variant="outline">
                <Book className="mr-1 h-3 w-3" /> Documentation
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight mb-4">
                mockr.io Documentation
              </h1>
              <p className="text-xl text-muted-foreground">
                Learn how to use mockr.io to generate intelligent mock data for your applications.
              </p>
            </div>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2>Introduction</h2>
              <p>
                mockr.io is an AI-powered mock data generator designed for developers, testers, and data scientists. 
                It provides a simple yet powerful way to generate realistic, contextually relevant mock data for your applications.
              </p>
              
              <div className="bg-primary/5 border rounded-lg p-4 my-6 flex items-start">
                <Lightbulb className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                <div>
                  <p className="font-medium">What makes mockr.io different?</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Unlike traditional mock data generators that produce random data, mockr.io uses AI to understand the relationships between data fields, 
                    ensuring that the generated data is not just random, but contextually relevant and realistic.
                  </p>
                </div>
              </div>
              
              <h2>Key Features</h2>
              <ul>
                <li><strong>AI-Powered Generation:</strong> Generate realistic data using advanced AI models that understand context and relationships.</li>
                <li><strong>Smart Schema Detection:</strong> Upload your database schema or API spec for perfectly matching mock data.</li>
                <li><strong>Content Generation:</strong> Create realistic articles, product descriptions, user bios, and more.</li>
                <li><strong>Multiple Export Formats:</strong> Export your mock data in JSON, CSV, SQL, and more formats.</li>
                <li><strong>API Integration:</strong> Integrate with your applications via our simple and powerful API.</li>
              </ul>
              
              <h2>Quick Example</h2>
              <p>Here's a simple example of how to use mockr.io to generate user data:</p>
              
              <div className="relative bg-muted rounded-lg overflow-hidden my-6">
                <div className="bg-muted/50 p-2 border-b flex items-center">
                  <div className="text-xs font-medium">JavaScript</div>
                </div>
                <CodeBlock code={exampleCode} language="javascript" showLineNumbers={true} />
              </div>
              
              <h2>Getting Started</h2>
              <p>
                To get started with mockr.io, you'll need to create an account and obtain an API key. 
                Once you have your API key, you can install our client library and start generating mock data.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <Link href="/docs/quickstart" className="block">
                  <div className="border rounded-lg p-6 h-full hover:border-primary hover:bg-primary/5 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Terminal className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Quick Start Guide</h3>
                    <p className="text-muted-foreground mb-4">
                      Get up and running with mockr.io in minutes with our quick start guide.
                    </p>
                    <span className="text-primary font-medium inline-flex items-center">
                      Read guide <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
                <Link href="/docs/ai/overview" className="block">
                  <div className="border rounded-lg p-6 h-full hover:border-primary hover:bg-primary/5 transition-colors">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Brain className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">AI Features</h3>
                    <p className="text-muted-foreground mb-4">
                      Learn how to leverage our AI capabilities to generate more realistic mock data.
                    </p>
                    <span className="text-primary font-medium inline-flex items-center">
                      Explore AI features <ArrowRight className="ml-1 h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </div>
              
              <h2>Need Help?</h2>
              <p>
                If you need help with mockr.io, you can reach out to our support team or join our community on Discord.
                We're always happy to help you get the most out of mockr.io.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </Link>
                <Link href="https://discord.com">
                  <Button variant="outline" size="sm">
                    Join Discord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
      <footer className="border-t py-8 md:py-12">
        <div className="container px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} mockr.io. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
} 