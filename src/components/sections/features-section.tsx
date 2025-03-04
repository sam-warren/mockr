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
            "comments": [
              {
                "id": "c-3d45f1",
                "author": "Jamie Chen",
                "content": "Great insights! Have you considered sharding?"
              }
            ]
          }
        ]
      },
      {
        "id": "u-8d21e7",
        "name": "Morgan Taylor",
        "email": "morgan.t@example.com",
        "role": "user",
        "department": "Marketing",
        "posts": [
          {
            "id": "p-2c43a9",
            "title": "Q3 Campaign Results",
            "status": "draft"
          }
        ]
      }
    ]
  }
}`;

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <Container>
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Why Choose mockr?
          </h2>
          <p className="mt-4 max-w-[85%] text-muted-foreground sm:text-lg">
            Our intuitive platform makes creating realistic mock data
            effortless.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {/* Left column - Features cards (1/3 width) */}
          <div className="space-y-6 flex flex-col">
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Workflow className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visual Data Modeling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Drag-and-drop interface to create data models, establish
                  relationships, and visualize your data hierarchy without
                  writing code.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI-Assisted Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Describe what you need in plain English, and our AI will
                  suggest appropriate data models, field types, and realistic
                  values.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <ArrowRightLeft className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Define complex relationships between entities with visual
                  connectors. Our system ensures referential integrity across
                  your generated data.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Visual Editor and Code block (2/3 width) */}
          <div className="md:col-span-2 h-full flex flex-col space-y-6">
            {/* Visual Editor Interface */}

            {/* Generated Data */}
            <CodeBlock
              title="Generated Mock Data"
              language="json"
              code={mockrExample}
              className="w-full"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
