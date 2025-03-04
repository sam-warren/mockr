import React from "react";
import { cn } from "@/lib/utils";
import Prism from "prismjs";

// Import Prism CSS
import "prismjs/themes/prism-tomorrow.css";
// Import language support
import "prismjs/components/prism-json";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
// Add line numbers plugin
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs/plugins/line-numbers/prism-line-numbers";

// Load Prism in server context
if (typeof window === "undefined") {
  // This is a workaround for using Prism in a server component
  // @ts-ignore - global assignment for server-side rendering
  global.Prism = global.Prism || Prism;
}

// Custom styles for Prism
const prismStyles = `
  code[class*="language-"],
  pre[class*="language-"] {
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
  }
  
  .line-number {
    line-height: 1.5;
    opacity: 0.5;
    user-select: none;
  }
  
  .code-line {
    display: block;
    line-height: 1.5;
    white-space: pre;
  }

  /* Ensure code preserves whitespace */
  pre, code {
    white-space: pre !important;
    tab-size: 2;
  }
`;

interface CodeBlockProps {
  className?: string;
  language?: string;
  code: string;
  showLineNumbers?: boolean;
  title?: string;
}

export function CodeBlock({
  className,
  language = "typescript",
  code,
  showLineNumbers = true,
  title,
}: CodeBlockProps) {
  // Server-side syntax highlighting
  const highlightedCode = (() => {
    try {
      // Make sure the language is loaded
      if (!Prism.languages[language]) {
        // Default to plain text if language not supported
        return formatCodeWithLineBreaks(code);
      }
      
      // Highlight the code
      const highlighted = Prism.highlight(code, Prism.languages[language], language);
      
      // Format the highlighted code with proper line breaks
      return formatCodeWithLineBreaks(highlighted);
    } catch (error) {
      console.error("Error highlighting code:", error);
      return formatCodeWithLineBreaks(code);
    }
  })();

  // Helper function to format code with line breaks
  function formatCodeWithLineBreaks(code: string): string {
    const lines = code.split('\n');
    return lines.map((line, index) => 
      `<span class="code-line">${line}${index < lines.length - 1 ? '\n' : ''}</span>`
    ).join('');
  }

  // Generate line numbers manually for server component
  const lineCount = code.split('\n').length;
  const lineNumbers = showLineNumbers ? (
    <div className="table-cell text-right pr-4 select-none text-muted-foreground border-r border-muted" style={{ width: '1%', minWidth: '2.5rem' }}>
      {Array.from({ length: lineCount }).map((_, i) => (
        <div key={i} className="line-number px-2">
          {i + 1}
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div className={cn(
      "rounded-lg overflow-hidden border h-full flex flex-col bg-card text-card-foreground shadow", 
      className
    )}>
      {title && (
        <div className="bg-muted px-4 py-3 border-b flex items-center">
          <div className="flex space-x-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm font-medium">{title}</div>
        </div>
      )}
      <pre
        className={cn(
          "p-4 text-sm overflow-auto bg-card flex-1",
          showLineNumbers && "table w-full"
        )}
        style={{ tabSize: 2 }}
      >
        {lineNumbers}
        <div className={showLineNumbers ? "table-cell pl-4" : ""}>
          <code 
            className={`language-${language} block whitespace-pre`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
            style={{ tabSize: 2 }}
          />
        </div>
      </pre>
      <style dangerouslySetInnerHTML={{ __html: `
        ${prismStyles}
        .line-number {
          line-height: 1.5;
        }
      `}} />
    </div>
  );
} 