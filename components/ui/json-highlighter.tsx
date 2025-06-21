"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface JsonHighlighterProps {
  data: unknown;
  className?: string;
  indent?: number;
}

interface JsonTokenProps {
  children: React.ReactNode;
  type: 'string' | 'number' | 'boolean' | 'null' | 'key' | 'punctuation';
}

const JsonToken: React.FC<JsonTokenProps> = ({ children, type }) => {
  const getTokenClasses = (tokenType: string) => {
    switch (tokenType) {
      case 'string':
        return 'text-green-600 dark:text-green-400';
      case 'number':
        return 'text-blue-600 dark:text-blue-400';
      case 'boolean':
        return 'text-purple-600 dark:text-purple-400';
      case 'null':
        return 'text-gray-500 dark:text-gray-400';
      case 'key':
        return 'text-red-600 dark:text-red-400';
      case 'punctuation':
        return 'text-gray-600 dark:text-gray-300';
      default:
        return '';
    }
  };

  return (
    <span className={getTokenClasses(type)}>
      {children}
    </span>
  );
};

const formatJsonWithHighlighting = (obj: unknown, indent: number = 2): React.ReactNode[] => {
  let keyIndex = 0;

  const addIndent = (level: number) => {
    return ' '.repeat(level * indent);
  };

  const processValue = (value: unknown, depth: number = 0, isKey: boolean = false): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    
    if (value === null) {
      elements.push(
        <JsonToken key={keyIndex++} type="null">null</JsonToken>
      );
    } else if (typeof value === 'string') {
      elements.push(
        <JsonToken key={keyIndex++} type={isKey ? 'key' : 'string'}>
          &quot;{value}&quot;
        </JsonToken>
      );
    } else if (typeof value === 'number') {
      elements.push(
        <JsonToken key={keyIndex++} type="number">{value}</JsonToken>
      );
    } else if (typeof value === 'boolean') {
      elements.push(
        <JsonToken key={keyIndex++} type="boolean">{value.toString()}</JsonToken>
      );
    } else if (Array.isArray(value)) {
      elements.push(
        <JsonToken key={keyIndex++} type="punctuation">[</JsonToken>
      );
      
      if (value.length > 0) {
        elements.push(<br key={keyIndex++} />);
        
        value.forEach((item, index) => {
          elements.push(addIndent(depth + 1));
          elements.push(...processValue(item, depth + 1));
          
          if (index < value.length - 1) {
            elements.push(
              <JsonToken key={keyIndex++} type="punctuation">,</JsonToken>
            );
          }
          elements.push(<br key={keyIndex++} />);
        });
        
        elements.push(addIndent(depth));
      }
      
      elements.push(
        <JsonToken key={keyIndex++} type="punctuation">]</JsonToken>
      );
    } else if (typeof value === 'object' && value !== null) {
      elements.push(
        <JsonToken key={keyIndex++} type="punctuation">{'{'}</JsonToken>
      );
      
      const entries = Object.entries(value);
      if (entries.length > 0) {
        elements.push(<br key={keyIndex++} />);
        
        entries.forEach(([key, val], index) => {
          elements.push(addIndent(depth + 1));
          elements.push(...processValue(key, depth + 1, true));
          elements.push(
            <JsonToken key={keyIndex++} type="punctuation">: </JsonToken>
          );
          elements.push(...processValue(val, depth + 1));
          
          if (index < entries.length - 1) {
            elements.push(
              <JsonToken key={keyIndex++} type="punctuation">,</JsonToken>
            );
          }
          elements.push(<br key={keyIndex++} />);
        });
        
        elements.push(addIndent(depth));
      }
      
      elements.push(
        <JsonToken key={keyIndex++} type="punctuation">{'}'}</JsonToken>
      );
    }
    
    return elements;
  };

  return processValue(obj);
};

export function JsonHighlighter({ data, className, indent = 2 }: JsonHighlighterProps) {
  const highlightedContent = React.useMemo(() => {
    try {
      // If data is a string, try to parse it first
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      return formatJsonWithHighlighting(parsedData, indent);
    } catch {
      // If parsing fails, treat as string
      return formatJsonWithHighlighting(data, indent);
    }
  }, [data, indent]);

  return (
    <pre className={cn(
      "text-sm bg-muted p-4 rounded-lg overflow-x-auto font-mono leading-relaxed",
      className
    )}>
      <code>
        {highlightedContent}
      </code>
    </pre>
  );
} 