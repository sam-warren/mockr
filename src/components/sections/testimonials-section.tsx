import { Container } from "@/components/ui/container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Loved by Developers
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            See what developers are saying about mockr.io
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col justify-between">
            <CardContent className="pt-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "mockr.io has completely transformed our testing workflow. The
                context-aware data generation is a game-changer for our
                microservices architecture."
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
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "The VS Code extension is brilliant. I can generate realistic
                test data without leaving my editor. It's saved our team
                countless hours."
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
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">
                "As a healthcare developer, the HIPAA-compliant mock data
                templates are invaluable. mockr.io understands industry-specific
                needs."
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
