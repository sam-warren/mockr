"use client";

import { useState } from "react";
import { formatDistanceToNow, format } from "date-fns";
import {
  Database,
  Copy,
  Download,
  Code2,
  Clock,
  User,
  Cpu,
  CheckCircle,
  AlertCircle,
  XCircle,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tables } from "@/database.types";
import { toast } from "sonner";

type MockGeneration = Tables<"mock_generations">;

interface MockDetailsSheetProps {
  mock: MockGeneration;
}

export function MockDetailsSheet({ mock }: MockDetailsSheetProps) {
  const [activeTab, setActiveTab] = useState("data");

  const handleCopyData = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify(mock.generated_data, null, 2)
      );
      toast.success("Mock data copied to clipboard!");
    } catch {
      toast.error("Failed to copy data");
    }
  };

  const handleDownloadData = () => {
    try {
      const dataStr = JSON.stringify(mock.generated_data, null, 2);
      const dataBlob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `mock-generation-${mock.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Mock data downloaded!");
    } catch {
      toast.error("Failed to download data");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <SheetContent className="w-full sm:max-w-4xl flex flex-col md:p-6">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(mock.generation_status)}
            <div>
              <SheetTitle className="text-xl">
                Mock Generation Details
              </SheetTitle>
              <SheetDescription>
                Created{" "}
                {formatDistanceToNow(new Date(mock.created_at), {
                  addSuffix: true,
                })}
              </SheetDescription>
            </div>
          </div>
          <Badge className={getStatusColor(mock.generation_status)}>
            {mock.generation_status}
          </Badge>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-hidden">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-full flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Code2 className="h-4 w-4" />
              Generated Data
            </TabsTrigger>
            <TabsTrigger value="details" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Details
            </TabsTrigger>
            <TabsTrigger value="metadata" className="flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              Metadata
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden mt-4">
            <TabsContent value="data" className="h-full">
              <Card className="h-full flex flex-col">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Generated Mock Data
                    </CardTitle>
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
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
                      <code>
                        {JSON.stringify(mock.generated_data, null, 2)}
                      </code>
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="h-full">
              <div className="grid gap-4 h-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Generation Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mock.generation_prompt && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Prompt
                        </label>
                        <div className="mt-1 p-3 bg-muted rounded-lg">
                          <p className="text-sm">{mock.generation_prompt}</p>
                        </div>
                      </div>
                    )}

                    {mock.generation_schema && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Schema
                        </label>
                        <div className="mt-1 p-3 bg-muted rounded-lg">
                          <pre className="text-sm overflow-x-auto">
                            <code>
                              {JSON.stringify(
                                mock.generation_schema,
                                null,
                                2
                              )}
                            </code>
                          </pre>
                        </div>
                      </div>
                    )}

                    {mock.error_message && (
                      <div>
                        <label className="text-sm font-medium text-destructive">
                          Error Message
                        </label>
                        <div className="mt-1 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                          <p className="text-sm text-destructive">
                            {mock.error_message}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metadata" className="h-full">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Generation Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        ID
                      </span>
                      <code className="text-xs bg-muted px-2 py-1 rounded">
                        {mock.id}
                      </code>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Type
                      </span>
                      <Badge variant="secondary">
                        {mock.generation_type}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Timestamps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Created
                      </span>
                      <span className="text-sm font-medium">
                        {format(
                          new Date(mock.created_at),
                          "MMM d, yyyy h:mm a"
                        )}
                      </span>
                    </div>
                    {mock.completed_at && (
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Completed
                        </span>
                        <span className="text-sm font-medium">
                          {format(
                            new Date(mock.completed_at),
                            "MMM d, yyyy h:mm a"
                          )}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </SheetContent>
  );
}

// Legacy component for backward compatibility
export function MockDetailsDialog({ mock, open, onOpenChange }: {
  mock: MockGeneration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!mock) return null;
  
  // Legacy wrapper - components should migrate to use the new pattern
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <MockDetailsSheet mock={mock} />
    </Sheet>
  );
}
