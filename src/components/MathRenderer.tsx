"use client";

import React, { useMemo } from "react";
import katex from "katex";

interface MathRendererProps {
  content: string;
  className?: string;
}

export default function MathRenderer({ content, className = "" }: MathRendererProps) {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    // Tách chuỗi theo block math $$...$$ và inline math $...$
    // Cẩn thận với escape character và newlines
    const parts: React.ReactNode[] = [];
    let remaining = content;
    let key = 0;

    // Pattern tìm $$...$$ hoặc $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      // Đoạn text trước match
      if (match.index > lastIndex) {
        const textSegment = content.substring(lastIndex, match.index);
        parts.push(<span key={key++}>{textSegment}</span>);
      }

      const rawFormula = match[0];
      const isBlock = rawFormula.startsWith("$$");
      const mathString = isBlock
        ? rawFormula.slice(2, -2).trim()
        : rawFormula.slice(1, -1).trim();

      try {
        const html = katex.renderToString(mathString, {
          displayMode: isBlock,
          throwOnError: false,
        });

        parts.push(
          isBlock ? (
            <div
              key={key++}
              className="my-3 overflow-x-auto py-1 text-center"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <span
              key={key++}
              className="inline-block px-0.5"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )
        );
      } catch (e) {
        parts.push(
          <span key={key++} className="text-red-500 font-mono text-xs">
            {rawFormula}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(<span key={key++}>{content.substring(lastIndex)}</span>);
    }

    return parts;
  }, [content]);

  return <div className={`whitespace-pre-line leading-relaxed ${className}`}>{renderedElements}</div>;
}
