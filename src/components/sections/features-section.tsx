import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles, Workflow, ArrowRightLeft } from "lucide-react";
import { CodeBlock } from "@/components/ui/code-block";

export function FeaturesSection() {
  const mockrExample = `// Generated code from your visual model
{
  "generated_data": {
    "users": [
      {
        "id": "u-5f3a12",
        "name": "Alex Rivera",
        "email": "alex.rivera@example.com",
        "role": "admin",
        "department": "Engineering",
        "posts": [
          {
            "id": "p-7e921d",
            "title": "Optimizing Database Performance",
            "status": "published",
            "comments": [{"id": "c-3d45f1", "author": "Jamie Chen"}]
          }
        ]
      },
      {
        "id": "u-8d21e7",
        "name": "Morgan Taylor",
        "role": "user",
        "department": "Marketing"
      }
    ]
  }
}`;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Why mockr?
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Our intuitive platform makes creating realistic mock data
            effortless.
          </p>
        </div>
        <div className="mx-auto mt-8 md:mt-12 flex flex-col gap-6 md:gap-8 max-w-6xl lg:grid lg:grid-cols-3 lg:min-h-[500px] lg:items-stretch">
          {/* Left column - Features cards (full width on mobile, 1/3 width on desktop) */}
          <div className="space-y-4 md:space-y-6 flex flex-col h-full">
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary/10">
                  <Workflow className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle>Visual Data Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Drag-and-drop interface to create data models, establish
                  relationships, and <span className="text-primary font-medium">visualize your data hierarchy</span> without
                  writing code.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle>AI-Assisted Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Describe what you need in plain English, and our <span className="text-primary font-medium">AI will
                  suggest</span> appropriate data models, field types, and realistic
                  values.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRightLeft className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <CardTitle>Smart Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Define complex relationships between entities with visual
                  connectors. Our system ensures <span className="text-primary font-medium">referential integrity</span> across
                  your generated data.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Visual Editor and Code block (full width on mobile, 2/3 width on desktop) */}
          <div className="lg:col-span-2 flex flex-col space-y-4 md:space-y-6 overflow-hidden lg:h-full">
            {/* Generated Data - Added overflow handling to prevent horizontal scroll */}
            <Card className="w-full h-full flex flex-col border-primary/20">
              <CardContent className="p-0 flex-grow flex flex-col">
                <CodeBlock
                  title="Generated Mock Data"
                  language="json"
                  code={mockrExample}
                  className="w-full border-0 shadow-none overflow-x-auto h-full flex-grow flex flex-col"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
