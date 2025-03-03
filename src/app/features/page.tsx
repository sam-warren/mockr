import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Brain, 
  Sparkles, 
  Code, 
  Database, 
  FileJson, 
  Zap, 
  Users, 
  Lock, 
  Globe,
  BarChart
} from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

const contextualCode = `// Example of contextual intelligence
const employees = await mockr.generate({
  type: "employees",
  count: 3,
  fields: {
    name: "fullName",
    gender: "gender",
    department: "select:Engineering,Marketing,Finance,HR",
    jobTitle: "jobTitle",
    email: "email",
    location: "country"
  },
  ai: {
    contextual: true,
    // AI ensures job titles match departments
    // Emails follow company format with name
    // Names match selected genders
  }
});

// Result:
[
  {
    "name": "James Wilson",
    "gender": "male",
    "department": "Engineering",
    "jobTitle": "Senior Software Engineer",
    "email": "james.wilson@company.com",
    "location": "United States"
  },
  {
    "name": "Maria Rodriguez",
    "gender": "female",
    "department": "Marketing",
    "jobTitle": "Digital Marketing Specialist",
    "email": "maria.rodriguez@company.com",
    "location": "Spain"
  },
  ...
]`;

const schemaCode = `// Smart schema detection example
const schema = {
  "type": "object",
  "properties": {
    "products": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "format": "uuid" },
          "name": { "type": "string" },
          "price": { "type": "number" },
          "category": { "type": "string" },
          "description": { "type": "string" },
          "inStock": { "type": "boolean" }
        }
      }
    }
  }
};

// AI automatically detects schema and generates appropriate data
const data = await mockr.generateFromSchema(schema, {
  count: 5,
  ai: {
    enhance: {
      description: "Write product descriptions that match the product name and category"
    }
  }
});`;

const contentCode = `// AI Content Generation Example
const products = await mockr.generate({
  type: "products",
  count: 2,
  fields: {
    id: "uuid",
    name: "productName",
    category: "select:Electronics,Clothing,Home Goods",
    price: "number:50:1000",
    description: "paragraph"
  },
  ai: {
    enhance: {
      description: "Write a compelling product description that highlights features and benefits. Match the tone to the product category."
    }
  }
});

// Result:
[
  {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "UltraView 4K Smart TV",
    "category": "Electronics",
    "price": 799.99,
    "description": "Experience entertainment like never before with the UltraView 4K Smart TV. Featuring crystal-clear 4K resolution, HDR technology, and an intuitive smart interface, this TV delivers stunning visuals and seamless streaming. The slim bezel design and powerful audio system create an immersive viewing experience that transforms your living room into a personal theater."
  },
  ...
]`;

export default function FeaturesPage() {
  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-12 md:py-20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container px-6 md:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4" variant="outline">
                <Sparkles className="mr-1 h-3 w-3" /> Features
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                AI-Powered Features for <span className="text-primary">Intelligent</span> Mock Data
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover how mockr.io's advanced AI capabilities can transform your development workflow with realistic, contextual mock data.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="py-28 bg-background">
          <div className="container px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28">
              <div>
                <Badge className="mb-4" variant="outline">
                  <Brain className="mr-1 h-3 w-3" /> Core AI Technology
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Contextual Intelligence
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our AI understands the relationships between data fields, ensuring that generated data is not just random, but contextually relevant and realistic.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Names match cultural backgrounds and genders",
                    "Addresses are geographically accurate",
                    "Job titles align with industries and departments",
                    "Content reflects the appropriate tone and style for its purpose"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/40 blur-xl opacity-70"></div>
                <div className="relative bg-background border rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-muted/50 p-2 border-b flex items-center">
                    <div className="text-xs font-medium">JavaScript</div>
                  </div>
                  <CodeBlock code={contextualCode} language="javascript" showLineNumbers={true} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-28">
              <div className="order-2 md:order-1 relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/40 blur-xl opacity-70"></div>
                <div className="relative bg-background border rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-muted/50 p-2 border-b flex items-center">
                    <div className="text-xs font-medium">JavaScript</div>
                  </div>
                  <CodeBlock code={schemaCode} language="javascript" showLineNumbers={true} />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Badge className="mb-4" variant="outline">
                  <FileJson className="mr-1 h-3 w-3" /> Schema Intelligence
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  Smart Schema Detection
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Upload your database schema, JSON schema, or API specification, and our AI will automatically generate perfectly matching mock data with realistic values.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Supports JSON Schema, OpenAPI, GraphQL, and SQL schemas",
                    "Automatically detects field types and formats",
                    "Preserves relationships between entities",
                    "Generates consistent data across related fields"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-4" variant="outline">
                  <Code className="mr-1 h-3 w-3" /> Content Generation
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight mb-4">
                  AI Content Generator
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Generate realistic articles, product descriptions, user bios, and more with our AI content generator tailored to your specific needs.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "Generate content in specific tones and styles",
                    "Create contextually relevant text based on other fields",
                    "Support for multiple languages and locales",
                    "Customize content length and complexity"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="mr-2 mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-3 w-3 text-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/20 to-blue-500/40 blur-xl opacity-70"></div>
                <div className="relative bg-background border rounded-xl shadow-xl overflow-hidden">
                  <div className="bg-muted/50 p-2 border-b flex items-center">
                    <div className="text-xs font-medium">JavaScript</div>
                  </div>
                  <CodeBlock code={contentCode} language="javascript" showLineNumbers={true} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-28 bg-muted/30">
          <div className="container px-6 md:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4" variant="outline">
                <Zap className="mr-1 h-3 w-3" /> More Features
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Everything you need for perfect mock data
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Beyond our core AI capabilities, mockr.io offers a comprehensive suite of features to streamline your development workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Database className="h-6 w-6 text-primary" />,
                  title: "Multiple Data Types",
                  description: "Generate over 50 different types of data, from basic types like names and addresses to complex types like credit cards and product information."
                },
                {
                  icon: <FileJson className="h-6 w-6 text-primary" />,
                  title: "Export Formats",
                  description: "Export your mock data in JSON, CSV, SQL, XML, and more formats with a single click. Perfect for any use case."
                },
                {
                  icon: <Code className="h-6 w-6 text-primary" />,
                  title: "API Integration",
                  description: "Integrate with your applications via our simple and powerful API for automated data generation in your workflow."
                },
                {
                  icon: <Users className="h-6 w-6 text-primary" />,
                  title: "Team Collaboration",
                  description: "Share templates and datasets with your team for seamless collaboration on projects."
                },
                {
                  icon: <Lock className="h-6 w-6 text-primary" />,
                  title: "Data Privacy",
                  description: "All generated data stays on your servers. We never store or access your schemas or generated data."
                },
                {
                  icon: <BarChart className="h-6 w-6 text-primary" />,
                  title: "Custom Distributions",
                  description: "Define custom statistical distributions for your numerical data to match real-world patterns."
                },
                {
                  icon: <Globe className="h-6 w-6 text-primary" />,
                  title: "Localization",
                  description: "Generate data specific to different regions and languages with our comprehensive localization support."
                },
                {
                  icon: <Zap className="h-6 w-6 text-primary" />,
                  title: "Blazing Fast",
                  description: "Generate thousands of records in seconds with our optimized data generation engine."
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-primary" />,
                  title: "Custom Templates",
                  description: "Create and save your own data templates for quick access to your most common data generation needs."
                }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col p-6 bg-background rounded-xl border shadow-sm">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5 border-y">
          <div className="container px-6 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Ready to experience the power of AI-driven mock data?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start generating intelligent mock data today with our free trial. No credit card required.
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
    </>
  );
} 