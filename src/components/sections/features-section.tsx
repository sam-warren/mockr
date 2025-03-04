import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, Code, Package } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Why Choose mockr?
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Our platform offers unique advantages over traditional mock data
            libraries.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Semantic Relationship Mapping</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our AI Context Engine analyzes database schemas and API specs to
                maintain referential integrity across your data.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Box className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Real-World Data Patterns</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Pre-built industry templates and behavioral modeling for
                healthcare, e-commerce, and more.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Developer-Centric Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                VS Code extension and GitHub Action integration for seamless
                development experience.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
