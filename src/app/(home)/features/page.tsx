import { FeaturesSection } from "@/components/sections/features-section";
import { CtaSection } from "@/components/sections/cta-section";
import { SectionDivider } from "@/components/ui/section-divider";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Layers, Wand2, Workflow, Code, Zap } from "lucide-react";
import { GridBackground } from "@/components/layout/grid-background";

export const metadata = {
  title: "Features - mockr",
  description: "Discover the powerful features of mockr for generating realistic mock data.",
};

export default function FeaturesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20 md:py-24">
        <GridBackground />
        <Container className="relative">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border border-border/40 bg-background/95 pl-1 pr-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm mb-6">
              <Badge
                variant="secondary"
                className="mr-2 px-1.5 py-0.5 text-[10px]"
              >
                <Brain className="h-3 w-3 mr-1" />
                AI
              </Badge>
              Powered by advanced AI technology
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Powerful Features for Developers
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              mockr provides a comprehensive suite of tools to generate realistic, context-aware mock data
              for your applications and testing environments.
            </p>
          </div>
        </Container>
      </section>
      
      <SectionDivider variant="primary" />
      
      <FeaturesSection />
      
      <SectionDivider variant="primary" />
      
      <section className="relative py-12 md:py-16 overflow-hidden">
        <Container>
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center mb-12">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Advanced Capabilities
            </h2>
            <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
              Explore the full range of mockr&apos;s powerful features designed for modern development workflows.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Schema Import</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Import existing database schemas, JSON structures, or TypeScript interfaces to instantly generate compatible mock data.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Nested Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create complex data hierarchies with nested objects, arrays, and relationships that maintain referential integrity.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Wand2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Custom Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create and save your own data templates for reuse across projects, with support for custom generation rules.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>API Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seamlessly integrate with your development workflow using our RESTful API or CLI tools for automated data generation.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  See your generated data in real-time as you build your models, with instant feedback on changes to your schema.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Export your generated data in multiple formats including JSON, CSV, SQL, and TypeScript interfaces for maximum flexibility.
                </CardDescription>
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
