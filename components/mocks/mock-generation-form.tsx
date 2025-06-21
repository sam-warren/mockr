"use client";

import React, { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";
import {
  Sparkles,
  Wand2,
  Copy,
  Download,
  RefreshCw,
  Code2,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JsonHighlighter } from "@/components/ui/json-highlighter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "sonner";

interface MockGenerationFormProps {
  initialPrompt?: string;
  initialSchema?: string;
}

// Sheet content component for generated data
function GeneratedDataSheet({
  object,
  isLoading,
  error,
  open,
  onOpenChange,
}: {
  object: unknown;
  isLoading: boolean;
  error: Error | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "mock-data.json";
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-4xl flex flex-col p-2 md:p-6">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Code2 className="h-5 w-5" />
            <div>
              <SheetTitle className="text-xl">Generated Mock Data</SheetTitle>
              <SheetDescription>Your AI-generated mock data</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-hidden mt-4">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Generated Mock Data</CardTitle>
                {object !== undefined && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyData}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy JSON
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
            <CardContent className="flex-1 overflow-hidden">
              {error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium mb-2">
                    Generation Error
                  </p>
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
                      <p className="font-medium">
                        Generating your mock data...
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This may take a few moments
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {object !== undefined && (
                <ScrollArea className="h-full">
                  <JsonHighlighter data={object} />
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
                        Fill in the prompt and click generate to create your
                        mock data
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function MockGenerationForm({
  initialPrompt = "",
  initialSchema = "",
}: MockGenerationFormProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [schema, setSchema] = useState(initialSchema);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { object, isLoading, error, submit } = useObject({
    api: "/api/mock",
    schema: z.unknown(),
  });

  const handleSubmit = () => {
    submit({
      prompt: prompt.trim(),
      schema: schema.trim(),
    });
    setIsSheetOpen(true);
  };

  const handleReset = () => {
    setPrompt("");
    setSchema("");
    setIsSheetOpen(false);
  };

  const isFormValid = prompt.trim() || schema.trim();

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-6">
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
                Describe the type of mock data you want to generate in natural
                language.
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
                Provide a JSON schema to enforce a specific structure for your
                mock data.
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
            <CardTitle className="text-lg">
              💡 Tips for Better Results
            </CardTitle>
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

      {/* Generated Data Sheet */}
      <GeneratedDataSheet
        object={object}
        isLoading={isLoading}
        error={error}
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      />
    </>
  );
}
