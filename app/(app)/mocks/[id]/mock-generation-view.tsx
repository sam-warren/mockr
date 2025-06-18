"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStreamingMock } from "@/hooks/use-streaming-mock";
import { getMockGeneration } from "@/lib/supabase/actions/mock-generation";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Loader2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface MockGenerationViewProps {
  generationId: string;
}

export default function MockGenerationView({
  generationId,
}: MockGenerationViewProps) {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);
  const [mockGeneration, setMockGeneration] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsStreaming, setNeedsStreaming] = useState(false);

  // Streaming hook - only used when needed
  const {
    isStreaming,
    progress,
    streamedContent,
    generatedData,
    error: streamError,
    processingTime,
    isComplete: streamComplete,
    startStreaming,
    cancelStreaming,
    hasStarted,
  } = useStreamingMock({
    generationId,
    prompt: mockGeneration?.generation_prompt || "",
    jsonSchema: mockGeneration?.generation_schema || null,
    generationType: mockGeneration?.generation_type || "prompt",
    sampleSize: 10,
    onComplete: (data: unknown[]) => {
      toast.success(`Successfully generated ${data.length} records!`);
      // Refresh the generation data
      loadGeneration();
    },
    onError: (error: string) => {
      toast.error(`Generation failed: ${error}`);
      loadGeneration();
    },
  });

  // Load generation data
  const loadGeneration = async () => {
    try {
      const result = await getMockGeneration(generationId);
      if (result.success && result.data) {
        setMockGeneration(result.data);
        
        // Check if we need to start streaming
        const status = result.data.generation_status;
        if (status === 'pending' || status === 'processing') {
          setNeedsStreaming(true);
        } else if (status === 'failed') {
          // For failed generations, we can allow retry
          setNeedsStreaming(false);
        }
      } else {
        setError(result.error || "Generation not found");
      }
    } catch (err) {
      setError("Failed to load generation data");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadGeneration();
  }, [generationId]);

  // Auto-start streaming if needed
  useEffect(() => {
    if (needsStreaming && mockGeneration && !hasStarted) {
      startStreaming();
    }
  }, [needsStreaming, mockGeneration, hasStarted, startStreaming]);

  // Derived status helpers
  const isPending = mockGeneration?.generation_status === 'pending';
  const isProcessing = mockGeneration?.generation_status === 'processing' || isStreaming;
  const isCompleted = mockGeneration?.generation_status === 'completed' || streamComplete;
  const isFailed = mockGeneration?.generation_status === 'failed' || streamError;

  // Get the data to display (streamed data takes precedence)
  const displayData = generatedData || mockGeneration?.generated_data;

  const handleCopyJson = async () => {
    if (!displayData) return;

    try {
      await navigator.clipboard.writeText(
        JSON.stringify(displayData, null, 2)
      );
      toast.success("JSON copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownloadJson = () => {
    if (!displayData) return;

    setIsDownloading(true);
    try {
      const blob = new Blob(
        [JSON.stringify(displayData, null, 2)],
        {
          type: "application/json",
        }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `mock-data-${generationId.slice(0, 8)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("Download started!");
    } catch {
      toast.error("Failed to download file");
    } finally {
      setIsDownloading(false);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading && !mockGeneration) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
            <p className="text-muted-foreground">Loading generation...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!mockGeneration) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Alert>
          <AlertDescription>Generation not found.</AlertDescription>
        </Alert>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (isPending) return <Clock className="h-4 w-4" />;
    if (isProcessing) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (isCompleted) return <CheckCircle className="h-4 w-4" />;
    if (isFailed) return <XCircle className="h-4 w-4" />;
    return <Clock className="h-4 w-4" />;
  };

  const getStatusColor = () => {
    if (isPending) return "default";
    if (isProcessing) return "default";
    if (isCompleted) return "default";
    if (isFailed) return "destructive";
    return "default";
  };

  const getStatusText = () => {
    if (isPending) return "Pending";
    if (isProcessing) return "Processing";
    if (isCompleted) return "Completed";
    if (isFailed) return "Failed";
    return "Unknown";
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Mocks
            </Button>
          </div>
          <Badge variant={getStatusColor()} className="flex items-center gap-1">
            {getStatusIcon()}
            {getStatusText()}
          </Badge>
        </div>
      </div>

      <div className="space-y-6">
        {/* Generation Info */}
        <Card>
          <CardHeader>
            <CardTitle>Generation Details</CardTitle>
            <CardDescription>
              Created {new Date(mockGeneration.created_at).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Type
                </p>
                <p className="capitalize">{mockGeneration.generation_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Records
                </p>
                <p>{mockGeneration.record_count || 0}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Credits Used
                </p>
                <p>{mockGeneration.credits_consumed}</p>
              </div>
            </div>

            {mockGeneration.generation_prompt && (
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Prompt
                </p>
                <p className="text-sm bg-muted p-3 rounded-lg">
                  {mockGeneration.generation_prompt}
                </p>
              </div>
            )}

            {mockGeneration.processing_time_ms && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Processing Time
                </p>
                <p>{mockGeneration.processing_time_ms}ms</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress/Error States */}
        {isPending && (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-semibold">Generation Queued</h3>
                  <p className="text-muted-foreground">
                    Your mock data generation is waiting to start...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isProcessing && (
          <Card>
            <CardContent className="space-y-4 py-6">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Generating Mock Data
                  </h3>
                  <p className="text-muted-foreground">
                    {progress || "AI is crafting your data..."}
                  </p>
                  {processingTime && (
                    <p className="text-sm text-muted-foreground">
                      Processing time: {processingTime}ms
                    </p>
                  )}
                </div>
              </div>
              
              {/* Cancel button during streaming */}
              {isStreaming && (
                <div className="flex justify-center pt-4">
                  <Button variant="outline" size="sm" onClick={cancelStreaming}>
                    Cancel Generation
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
                  )}

        {/* Live streaming content preview */}
        {isStreaming && streamedContent && (
          <Card>
            <CardHeader>
              <CardTitle>Live Generation Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg bg-muted/50 p-4 max-h-48 overflow-auto">
                <pre className="text-sm whitespace-pre-wrap font-mono">
                  {streamedContent}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}

        {(isFailed || streamError) && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <span>
                  Generation failed: {streamError || mockGeneration?.error_message || "Unknown error"}
                </span>
                {mockGeneration && !isStreaming && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setNeedsStreaming(true);
                      // Reset the generation status to pending to trigger retry
                      setMockGeneration((prev: any) => prev ? {...prev, generation_status: 'pending'} : prev);
                    }}
                  >
                    Retry Generation
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Generated Data */}
        {isCompleted && displayData && Array.isArray(displayData) && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    Generated Mock Data
                  </CardTitle>
                  <CardDescription>
                    Successfully generated {displayData.length} records
                    {processingTime && ` in ${processingTime}ms`}
                  </CardDescription>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyJson}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy JSON
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadJson}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="mr-2 h-4 w-4" />
                    )}
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg bg-muted/50 p-4">
                <pre className="text-sm overflow-auto max-h-96 whitespace-pre-wrap">
                  {JSON.stringify(displayData, null, 2)}
                </pre>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
