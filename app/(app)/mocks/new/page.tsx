"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import { ArrowLeft, Sparkles, Wand2, Copy, Download, RefreshCw, FileText } from "lucide-react";
import Link from "next/link";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import templatesData from "@/lib/data/templates.json";

interface TemplateData {
  id: string
  name: string
  description: string
  category: string
  prompt: string
  jsonSchema: Record<string, unknown>
  sampleSize: number
  tags: string[]
}

export default function NewMock() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");
  
  const [prompt, setPrompt] = useState("");
  const [schema, setSchema] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  // Load template data if template parameter is provided
  useEffect(() => {
    if (templateId) {
      const template = (templatesData as TemplateData[]).find(t => t.id === templateId);
      if (template) {
        setSelectedTemplate(template);
        setPrompt(template.prompt);
        setSchema(JSON.stringify(template.jsonSchema, null, 2));
        toast.success(`Template "${template.name}" loaded successfully!`);
      } else {
        toast.error("Template not found");
      }
    }
  }, [templateId]);

  const { object, isLoading, error, submit } = useObject({
    api: "/api/mock",
    schema: z.unknown(),
  });

  const handleSubmit = () => {
    submit({
      prompt: prompt.trim(),
      schema: schema.trim(),
    });
  };

  const handleCopyData = async () => {
    if (object) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(object, null, 2));
        toast.success("Mock data copied to clipboard!");
      } catch {
        toast.error("Failed to copy data");
      }
    }
  };

  const handleDownloadData = () => {
    if (object) {
      try {
        const dataStr = JSON.stringify(object, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mock-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Mock data downloaded!");
      } catch {
        toast.error("Failed to download data");
      }
    }
  };

  const handleReset = () => {
    setPrompt("");
    setSchema("");
  };

  const isFormValid = prompt.trim() || schema.trim();

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
            <h1 className="text-3xl font-bold tracking-tight">Generate Mock Data</h1>
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
            Using template: <strong>{selectedTemplate.name}</strong> - {selectedTemplate.description}
            <Link href="/templates" className="ml-2 text-primary hover:underline">
              Browse other templates
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Generation Settings
              </CardTitle>
              <CardDescription>
                Describe what kind of mock data you need
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="prompt" className="text-base font-medium">
                  Prompt *
                </Label>
                <Textarea
                  id="prompt"
                  placeholder="Generate user data with names, emails, and addresses..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-32 resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Describe the type of mock data you want to generate in natural language.
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <Label htmlFor="schema" className="text-base font-medium">
                  JSON Schema <Badge variant="secondary">Optional</Badge>
                </Label>
                <Textarea
                  id="schema"
                  placeholder='{\n  "type": "array",\n  "items": {\n    "type": "object",\n    "properties": {\n      "name": { "type": "string" },\n      "email": { "type": "string" }\n    }\n  }\n}'
                  value={schema}
                  onChange={(e) => setSchema(e.target.value)}
                  className="min-h-40 max-h-60 font-mono text-sm resize-none overflow-y-auto"
                />
                <p className="text-sm text-muted-foreground">
                  Provide a JSON schema to enforce a specific structure for your mock data.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !isFormValid}
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Mock Data
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                  size="lg"
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Tips for Better Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p>• Be specific about the type and format of data you need</p>
                <p>• Include examples in your prompt for better accuracy</p>
                <p>• Use JSON schema for strict data structure requirements</p>
                <p>• Specify the number of records you want generated</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Generated Data
                  </CardTitle>
                  <CardDescription>
                    Your AI-generated mock data will appear here
                  </CardDescription>
                </div>
                                 {object !== undefined && (
                   <div className="flex gap-2">
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={handleCopyData}
                     >
                       <Copy className="h-4 w-4 mr-2" />
                       Copy
                     </Button>
                     <Button
                       variant="outline"
                       size="sm"
                       onClick={handleDownloadData}
                     >
                       <Download className="h-4 w-4 mr-2" />
                       Download
                     </Button>
                   </div>
                 )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-[400px]">
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <p className="text-sm text-destructive font-medium mb-2">Generation Error</p>
                    <p className="text-sm text-destructive">{`${error}`}</p>
                  </div>
                )}
                
                {isLoading && !object && (
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="text-center space-y-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                        <RefreshCw className="h-8 w-8 text-primary animate-spin" />
                      </div>
                      <div>
                        <p className="font-medium">Generating your mock data...</p>
                        <p className="text-sm text-muted-foreground">This may take a few moments</p>
                      </div>
                    </div>
                  </div>
                )}

                                 {object !== undefined && (
                   <ScrollArea className="h-[400px]">
                     <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                       <code>{JSON.stringify(object, null, 2)}</code>
                     </pre>
                   </ScrollArea>
                 )}

                {!isLoading && !object && !error && (
                  <div className="flex items-center justify-center h-[400px]">
                    <div className="text-center space-y-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
                        <Sparkles className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Ready to generate</p>
                        <p className="text-sm text-muted-foreground">
                          Fill in the prompt and click generate to create your mock data
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
