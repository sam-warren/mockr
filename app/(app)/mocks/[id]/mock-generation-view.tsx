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
import { useRealtimeMock } from "@/hooks/use-realtime-mock";
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
import { useState } from "react";
import { toast } from "sonner";

interface MockGenerationViewProps {
  generationId: string;
}

export default function MockGenerationView({
  generationId,
}: MockGenerationViewProps) {
  const {
    mockGeneration,
    isLoading,
    error,
    isCompleted,
    isFailed,
    isProcessing,
    isPending,
  } = useRealtimeMock(generationId);
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCopyJson = async () => {
    if (!mockGeneration?.generated_data) return;

    try {
      await navigator.clipboard.writeText(
        JSON.stringify(mockGeneration.generated_data, null, 2)
      );
      toast.success("JSON copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleDownloadJson = () => {
    if (!mockGeneration?.generated_data) return;

    setIsDownloading(true);
    try {
      const blob = new Blob(
        [JSON.stringify(mockGeneration.generated_data, null, 2)],
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
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Generating Mock Data
                  </h3>
                  <p className="text-muted-foreground">
                    AI is crafting your data... This usually takes 10-30
                    seconds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isFailed && mockGeneration.error_message && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertDescription>
              Generation failed: {mockGeneration.error_message}
            </AlertDescription>
          </Alert>
        )}

        {/* Generated Data */}
        {isCompleted &&
          mockGeneration.generated_data &&
          Array.isArray(mockGeneration.generated_data) && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Generated Mock Data
                    </CardTitle>
                    <CardDescription>
                      Successfully generated {mockGeneration.record_count}{" "}
                      records
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
                    {JSON.stringify(mockGeneration.generated_data, null, 2)}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
}
