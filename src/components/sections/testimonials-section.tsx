import { Container } from "@/components/ui/container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Loved by Developers
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            See what developers are saying about mockr
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col justify-between">
            <CardContent className="pt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                &quot;mockr has completely transformed our testing workflow.
                The context-aware data generation is a game-changer for our
                microservices architecture.&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Jamie Smith</p>
                  <p className="text-xs text-muted-foreground">
                    Senior Developer at TechCorp
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardContent className="pt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                &quot;The VS Code extension is brilliant. I can generate
                realistic test data without leaving my editor. It&apos;s saved
                our team countless hours.&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  AL
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Alex Lee</p>
                  <p className="text-xs text-muted-foreground">
                    Lead Engineer at StartupX
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
          <Card className="flex flex-col justify-between">
            <CardContent className="pt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="text-primary"
                  />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                &quot;As a healthcare developer, the HIPAA-compliant mock data
                templates are invaluable. mockr understands industry-specific
                needs.&quot;
              </p>
            </CardContent>
            <CardFooter>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  MP
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Maria Patel</p>
                  <p className="text-xs text-muted-foreground">
                    CTO at HealthTech Solutions
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Container>
    </section>
  );
}
