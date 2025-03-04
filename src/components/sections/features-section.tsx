import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function FeaturesSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Why Choose mockr.io?
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Our platform offers unique advantages over traditional mock data
            libraries.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.29 7 12 12 20.71 7" />
                  <line x1="12" x2="12" y1="22" y2="12" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M12 2H2v10h10V2Z" />
                  <path d="M22 12h-8v10h8V12Z" />
                  <path d="M12 12H2v10h10V12Z" />
                  <path d="M22 2h-8v8h8V2Z" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
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
