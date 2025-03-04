import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/ui/section-divider";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Code, FileText, Github, Terminal, Video } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/code-block";
import { GridBackground } from "@/components/layout/grid-background";

export const metadata = {
  title: "Documentation - mockr",
  description: "Comprehensive guides and API references for using mockr.",
};

export default function DocsPage() {
  const quickStartCode = `// Install mockr CLI
npm install -g @mockr/cli

// Initialize a new project
mockr init my-project

// Generate mock data based on your schema
mockr generate --schema ./schema.json --output ./mock-data.json`;

  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24">
        <GridBackground />
        <Container className="relative">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 pl-1 pr-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm mb-6">
              <Badge
                variant="default"
                className="mr-2 px-1.5 py-0.5 text-[10px]"
              >
                DOCS
              </Badge>
              Complete API Reference & Guides
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Documentation
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Everything you need to know about using mockr to generate realistic, context-aware mock data for your applications.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="#quick-start">Quick Start Guide</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#api-reference">API Reference</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
      
      <SectionDivider variant="primary" />
      
      <section id="quick-start" className="relative py-12 md:py-16 overflow-hidden">
        <Container>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Quick Start Guide
            </h2>
            <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
              Get up and running with mockr in minutes
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  1
                </div>
                <h3 className="text-xl font-semibold">Install mockr</h3>
              </div>
              <p className="text-muted-foreground">
                Install the mockr CLI globally using npm, yarn, or pnpm to get started.
              </p>
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  2
                </div>
                <h3 className="text-xl font-semibold">Initialize a project</h3>
              </div>
              <p className="text-muted-foreground">
                Create a new mockr project with a sample configuration file to get started quickly.
              </p>
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  3
                </div>
                <h3 className="text-xl font-semibold">Generate mock data</h3>
              </div>
              <p className="text-muted-foreground">
                Use the CLI or web interface to generate mock data based on your schema or model.
              </p>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <CodeBlock
                  title="Quick Start Example"
                  language="bash"
                  code={quickStartCode}
                  className="w-full border-0 shadow-none"
                />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
      
      <SectionDivider variant="secondary" />
      
      <section id="api-reference" className="relative py-12 md:py-16 overflow-hidden">
        <Container>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Documentation Resources
            </h2>
            <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
              Comprehensive guides and references to help you make the most of mockr
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Book className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Learn the basics of mockr with our beginner-friendly guides and tutorials.
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link href="/docs/getting-started">Read Guide</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Detailed documentation of all API endpoints, parameters, and response formats.
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link href="/docs/api">View Reference</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Terminal className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>CLI Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Learn how to use the mockr command-line interface for automated workflows.
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link href="/docs/cli">View Commands</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Video className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Watch step-by-step video guides on using mockr's features effectively.
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link href="/docs/tutorials">Watch Tutorials</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Examples</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Browse example projects and use cases to jumpstart your implementation.
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link href="/docs/examples">View Examples</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>GitHub Repository</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Contribute to mockr, report issues, or explore the source code on GitHub.
                </CardDescription>
                <Button asChild variant="outline" size="sm">
                  <Link href="https://github.com/sam-warren/mockr">Visit GitHub</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
      
      <SectionDivider variant="primary" />
      
      <CtaSection />
    </>
  );
}
