"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FileText, Calendar, Copy, Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tables } from "@/database.types";
import { toast } from "sonner";

type MockGeneration = Tables<"mock_generations">;

interface MockCardProps {
  mock: MockGeneration;
  onViewDetails: (mock: MockGeneration) => void;
}

export function MockCard({ mock, onViewDetails }: MockCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const truncatePrompt = (prompt: string | null, maxLength: number = 60) => {
    if (!prompt) return "No prompt provided";
    return prompt.length > maxLength
      ? `${prompt.substring(0, maxLength)}...`
      : prompt;
  };

  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        isHovered ? "ring-2 ring-primary/20" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onViewDetails(mock)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-medium truncate">
                Mock Generation
              </CardTitle>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {truncatePrompt(mock.generation_prompt)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start mt-">
          <Badge className={getStatusColor(mock.generation_status)}>
            {mock.generation_status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 pt-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>
            {formatDistanceToNow(new Date(mock.created_at), {
              addSuffix: true,
            })}
          </span>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(mock);
                  }}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View mock details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyData();
                  }}
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Copy
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy mock data</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
