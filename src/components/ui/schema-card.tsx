"use client";

import * as React from "react";
import { FileJson, Code, MoreHorizontal, Eye, Copy, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SchemaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  lastUpdated?: string;
  recordCount?: number;
  color?: "blue" | "indigo" | "purple" | "emerald" | "amber" | "pink";
  badges?: string[];
  onView?: () => void;
  onEdit?: () => void;
}

export function SchemaCard({
  title,
  description,
  lastUpdated,
  recordCount,
  color = "blue",
  badges = [],
  className,
  onView,
  onEdit,
  ...props
}: SchemaCardProps) {
  // Color variants
  const colorStyles = {
    blue: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
    indigo: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
    purple: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
    emerald: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
    amber: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
    pink: {
      bg: "bg-muted",
      text: "text-muted-foreground",
    },
  };

  const colorClasses = colorStyles[color];

  return (
    <Card 
      className={cn("border-border/50 hover:border-primary/30 transition-all duration-150", className)} 
      {...props}
    >
      <CardHeader className="p-5 pb-0">
        <div className="flex items-start justify-between w-full mb-2">
          <div className={cn("p-2.5 rounded-md", colorClasses.bg)}>
            <FileJson className={cn("h-5 w-5", colorClasses.text)} />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={onView}>
                <Eye className="mr-2 h-4 w-4" /> View Schema
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onEdit}>
                <Code className="mr-2 h-4 w-4" /> Edit Schema
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        
        <div className="flex flex-wrap gap-1.5 mt-2">
          {badges.map((badge, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs py-0 h-5 bg-background/80 text-muted-foreground"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="p-5 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground text-xs">{lastUpdated || 'Recently updated'}</span>
          {recordCount !== undefined && (
            <span className="font-medium text-xs">{recordCount.toLocaleString()} records</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-0 px-5 pb-4 gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onView}
          className="h-8 text-xs gap-1.5 text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
        >
          <Eye className="h-3.5 w-3.5" /> View
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onEdit}
          className="h-8 text-xs gap-1.5 text-muted-foreground hover:bg-muted"
        >
          <Code className="h-3.5 w-3.5" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
} 