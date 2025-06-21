import React from "react";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import templatesData from "@/lib/data/templates.json";
import { MockGenerationForm } from "@/components/mocks/mock-generation-form";

interface TemplateData {
  id: string;
  name: string;
  description: string;
  category: string;
  prompt: string;
  jsonSchema: Record<string, unknown>;
  sampleSize: number;
  tags: string[];
}

interface NewMockPageProps {
  searchParams: Promise<{ template?: string }>;
}

export default async function NewMockPage({ searchParams }: NewMockPageProps) {
  const params = await searchParams;
  const templateId = params.template;

  let selectedTemplate: TemplateData | null = null;
  let initialPrompt = "";
  let initialSchema = "";

  // Load template data if template parameter is provided
  if (templateId) {
    const template = (templatesData as TemplateData[]).find(
      (t) => t.id === templateId
    );
    if (template) {
      selectedTemplate = template;
      initialPrompt = template.prompt;
      initialSchema = JSON.stringify(template.jsonSchema, null, 2);
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/mocks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Mocks
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Generate Mock Data
            </h1>
            <p className="text-muted-foreground">
              Create realistic mock data using AI-powered generation
            </p>
          </div>
        </div>
      </div>

      {/* Template Banner */}
      {selectedTemplate && (
        <Alert className="mb-6">
          <FileText className="h-4 w-4" />
          <AlertDescription>
            Using template: <strong>{selectedTemplate.name}</strong>
            <Link href="/templates" className="text-primary hover:underline">
              Browse other templates
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Mock Generation Form */}
      <MockGenerationForm
        initialPrompt={initialPrompt}
        initialSchema={initialSchema}
      />
    </div>
  );
}
