import React from 'react';
import { Highlight, themes } from 'prism-react-renderer';

// Define a custom theme instead of importing from prism-react-renderer/themes
const theme = {
  plain: {
    color: '#d6deeb',
    backgroundColor: '#011627',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#637777',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'operator', 'number'],
      style: {
        color: '#e06c75',
      },
    },
    {
      types: ['property', 'function'],
      style: {
        color: '#80cbc4',
      },
    },
    {
      types: ['tag-id', 'selector', 'atrule-id'],
      style: {
        color: '#eeebff',
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#c792ea',
      },
    },
    {
      types: ['boolean', 'string', 'entity', 'url', 'attr-value', 'keyword', 'control', 'directive', 'unit', 'statement', 'regex', 'at-rule', 'placeholder', 'variable'],
      style: {
        color: '#7fdbca',
      },
    },
    {
      types: ['deleted'],
      style: {
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic',
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold',
      },
    },
    {
      types: ['important'],
      style: {
        color: '#c792ea',
      },
    },
  ],
};

interface CodeBlockProps {
  code: string;
  language: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({ code, language, showLineNumbers = false, className = '' }: CodeBlockProps) {
  return (
    <Highlight 
      theme={themes.nightOwl} 
      code={code.trim()} 
      language={language as any}
    >
      {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${preClassName} ${className} overflow-x-auto p-4 text-sm rounded-md`} style={style}>
          {tokens.map((line, i) => {
            const lineProps = getLineProps({ line });
            return (
              <div key={i} className={`table-row ${lineProps.className || ''}`} style={lineProps.style}>
                {showLineNumbers && (
                  <span className="table-cell text-right pr-4 select-none opacity-50 text-xs">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell">
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token });
                    return (
                      <span key={key} className={tokenProps.className} style={tokenProps.style}>
                        {tokenProps.children}
                      </span>
                    );
                  })}
                </span>
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
} 