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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).Prism = (global as any).Prism || Prism;
}

// Custom styles for Prism
const prismStyles = `
  /* Override Prism theme background */
  pre[class*="language-"],
  code[class*="language-"] {
    background: transparent !important;
    color: inherit;
  }

  /* Ensure token colors work with both light and dark themes */
  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: hsl(210, 25%, 50%);
    font-style: italic;
  }

  .token.punctuation {
    color: var(--muted-foreground);
    opacity: 0.8;
  }

  .token.namespace {
    opacity: 0.8;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: hsl(350, 80%, 60%);
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: hsl(130, 60%, 45%);
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: hsl(40, 90%, 45%);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: hsl(210, 80%, 60%);
  }

  .token.function,
  .token.class-name {
    color: hsl(280, 70%, 60%);
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: hsl(30, 80%, 50%);
  }

  /* Dark theme adjustments */
  .dark .token.property,
  .dark .token.tag,
  .dark .token.boolean,
  .dark .token.number,
  .dark .token.constant,
  .dark .token.symbol,
  .dark .token.deleted {
    color: hsl(350, 90%, 70%);
  }

  .dark .token.selector,
  .dark .token.attr-name,
  .dark .token.string,
  .dark .token.char,
  .dark .token.builtin,
  .dark .token.inserted {
    color: hsl(130, 70%, 60%);
  }

  .dark .token.operator,
  .dark .token.entity,
  .dark .token.url,
  .dark .language-css .token.string,
  .dark .style .token.string {
    color: hsl(40, 90%, 60%);
  }

  .dark .token.atrule,
  .dark .token.attr-value,
  .dark .token.keyword {
    color: hsl(210, 90%, 70%);
  }

  .dark .token.function,
  .dark .token.class-name {
    color: hsl(280, 80%, 70%);
  }

  .dark .token.regex,
  .dark .token.important,
  .dark .token.variable {
    color: hsl(30, 90%, 60%);
  }

  /* JSON specific styling */
  .language-json .token.property {
    color: hsl(210, 80%, 60%);
  }
  
  .dark .language-json .token.property {
    color: hsl(210, 90%, 70%);
  }
  
  .language-json .token.string {
    color: hsl(130, 60%, 45%);
  }
  
  .dark .language-json .token.string {
    color: hsl(130, 70%, 60%);
  }
  
  .language-json .token.number,
  .language-json .token.boolean,
  .language-json .token.null {
    color: hsl(350, 80%, 60%);
  }
  
  .dark .language-json .token.number,
  .dark .language-json .token.boolean,
  .dark .language-json .token.null {
    color: hsl(350, 90%, 70%);
  }

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
    background: transparent !important;
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
    background: transparent !important;
  }

  .dark .token.comment,
  .dark .token.prolog,
  .dark .token.doctype,
  .dark .token.cdata {
    color: hsl(210, 30%, 60%);
    font-style: italic;
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
      "rounded-lg overflow-hidden border h-full flex flex-col text-card-foreground shadow", 
      className
    )}>
      {title && (
        <div className="bg-muted px-4 py-3 border-b flex items-center sticky top-0 min-w-max w-full z-10">
          <div className="flex space-x-2 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-sm font-medium">{title}</div>
        </div>
      )}
      <div className="overflow-auto flex-grow">
        <pre
          className={cn(
            "p-4 text-sm flex-1 h-full",
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
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        ${prismStyles}
        .line-number {
          line-height: 1.5;
          opacity: 0.7;
        }
      `}} />
    </div>
  );
} 