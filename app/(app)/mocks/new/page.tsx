"use client";

import React, { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function NewMock() {
  const [prompt, setPrompt] = useState("");
  const [schema, setSchema] = useState("");

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

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="prompt">Prompt</Label>
        <Textarea
          id="prompt"
          placeholder="Describe the mock data you want…"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-24"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="schema">JSON Schema (optional)</Label>
        <Textarea
          id="schema"
          placeholder="Provide a JSON schema to structure the response…"
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
          className="min-h-24 font-mono text-sm"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={isLoading || (!prompt.trim() && !schema.trim())}
      >
        {isLoading ? "Generating…" : "Generate"}
      </Button>

      <Card>
        <CardContent className="whitespace-pre-wrap break-all p-4">
          {error && <p className="text-red-500 mb-2">{`${error}`}</p>}
          {isLoading && !object && (
            <p className="text-muted-foreground">Streaming…</p>
          )}
          {object !== undefined && <pre>{JSON.stringify(object, null, 2)}</pre>}
        </CardContent>
      </Card>
    </div>
  );
}
