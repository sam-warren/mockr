"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles, Zap } from "lucide-react";
import { createMockPlaceholderForStreaming } from "@/lib/supabase/actions/mock-generation";

const SAMPLE_SCHEMA = `{
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "email": {"type": "string", "format": "email"},
    "age": {"type": "integer", "minimum": 18}
  },
  "required": ["name", "email"]
}`;

export default function NewMockPage() {
  const [prompt] = useState(
    "Generate user profiles with name, email, age, and city"
  );
  const [sampleSize] = useState(5);
  const [jsonSchema] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await createMockPlaceholderForStreaming(formData);
        
        if (result.success && result.generationId) {
          // Navigate to the generation page (streaming will happen there)
          router.push(`/mocks/${result.generationId}`);
        } else {
          toast.error(result.error || "Failed to create generation");
        }
      } catch (error) {
        console.error(error);
        toast.error(error instanceof Error ? error.message : "Failed to create generation");
      }
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create Mock Data</h1>
        <p className="text-muted-foreground mt-2">
          Generate realistic mock data using AI with prompts or JSON schemas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Section */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Mock Data</CardTitle>
            <CardDescription>
              Configure your mock data generation parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              {/* Prompt Input */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="prompt">Description/Prompt</Label>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="size" className="text-sm">
                      Sample Size
                    </Label>
                    <Input
                      id="size"
                      name="sample_size"
                      type="number"
                      defaultValue={sampleSize}
                      min={1}
                      max={100}
                      className="w-20"
                    />
                  </div>
                </div>
                <Textarea
                  id="prompt"
                  name="prompt"
                  defaultValue={prompt}
                  placeholder="Describe what kind of mock data you want..."
                  rows={3}
                />
              </div>

              {/* JSON Schema */}
              <div className="space-y-2">
                <Label htmlFor="schema">JSON Schema (optional)</Label>
                <Textarea
                  id="schema"
                  name="json_schema"
                  defaultValue={jsonSchema}
                  placeholder={SAMPLE_SCHEMA}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Mock...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Mock Data
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Status Section */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>
              Tips for generating great mock data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  How It Works
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong>Prompt Only:</strong> Fill in description to get
                    contextual data
                  </p>
                  <p>
                    <strong>Schema Only:</strong> Provide JSON schema for exact
                    structure
                  </p>
                  <p>
                    <strong>Both:</strong> Combine for structured yet contextual
                    results
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Pro Tips
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Be specific in your descriptions for better results</li>
                  <li>
                    • Use realistic field names (name, email, age vs field1,
                    field2)
                  </li>
                  <li>• Start with 5-10 records to test your prompt</li>
                  <li>• Include data relationships in your description</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
