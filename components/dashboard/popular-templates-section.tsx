import { TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { TemplateCard } from "@/components/template-card";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  jsonSchema: Record<string, unknown>;
  sampleSize: number;
  tags: string[];
}

interface PopularTemplatesSectionProps {
  templates: Template[];
}

export function PopularTemplatesSection({ templates }: PopularTemplatesSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Popular Templates</h2>
        </div>
        <Button variant="outline" asChild>
          <Link href="/templates">
            Browse All Templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
} 