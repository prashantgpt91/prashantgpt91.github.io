import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom code block rendering
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <div className="relative">
                  <div className="absolute top-2 right-2 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    {language}
                  </div>
                  <SyntaxHighlighter
                    style={oneDark}
                    language={language}
                    PreTag="div"
                    className="rounded-lg !mt-0 !mb-4"
                    showLineNumbers={true}
                    wrapLines={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
            
            return (
              <code 
                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" 
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Custom heading rendering with anchor links
          h1: ({ children, ...props }) => (
            <h1 
              className="text-3xl sm:text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2" 
              {...props}
            >
              {children}
            </h1>
          ),
          
          h2: ({ children, ...props }) => (
            <h2 
              className="text-2xl sm:text-3xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white" 
              {...props}
            >
              {children}
            </h2>
          ),
          
          h3: ({ children, ...props }) => (
            <h3 
              className="text-xl sm:text-2xl font-semibold mt-5 mb-2 text-gray-900 dark:text-white" 
              {...props}
            >
              {children}
            </h3>
          ),
          
          h4: ({ children, ...props }) => (
            <h4 
              className="text-lg sm:text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white" 
              {...props}
            >
              {children}
            </h4>
          ),
          
          // Custom paragraph rendering
          p: ({ children, ...props }) => (
            <p 
              className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base" 
              {...props}
            >
              {children}
            </p>
          ),
          
          // Custom list rendering
          ul: ({ children, ...props }) => (
            <ul 
              className="list-disc list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base" 
              {...props}
            >
              {children}
            </ul>
          ),
          
          ol: ({ children, ...props }) => (
            <ol 
              className="list-decimal list-inside mb-4 space-y-1 text-gray-700 dark:text-gray-300 text-sm sm:text-base" 
              {...props}
            >
              {children}
            </ol>
          ),
          
          li: ({ children, ...props }) => (
            <li className="mb-1" {...props}>
              {children}
            </li>
          ),
          
          // Custom blockquote rendering
          blockquote: ({ children, ...props }) => (
            <blockquote 
              className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300 text-sm sm:text-base" 
              {...props}
            >
              {children}
            </blockquote>
          ),
          
          // Custom table rendering
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table 
                className="min-w-full border border-gray-300 dark:border-gray-600 text-sm" 
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          
          thead: ({ children, ...props }) => (
            <thead 
              className="bg-gray-100 dark:bg-gray-800" 
              {...props}
            >
              {children}
            </thead>
          ),
          
          th: ({ children, ...props }) => (
            <th 
              className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-left font-semibold text-gray-900 dark:text-white text-xs sm:text-sm" 
              {...props}
            >
              {children}
            </th>
          ),
          
          td: ({ children, ...props }) => (
            <td 
              className="border border-gray-300 dark:border-gray-600 px-3 py-2 text-gray-700 dark:text-gray-300 text-xs sm:text-sm" 
              {...props}
            >
              {children}
            </td>
          ),
          
          // Custom link rendering
          a: ({ children, href, ...props }) => (
            <a 
              href={href}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
            </a>
          ),
          
          // Custom image rendering
          img: ({ src, alt, ...props }) => (
            <div className="mb-4">
              <img 
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                loading="lazy"
                {...props}
              />
              {alt && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          // Custom horizontal rule
          hr: ({ ...props }) => (
            <hr 
              className="my-8 border-gray-300 dark:border-gray-600" 
              {...props}
            />
          ),
          
          // Custom strong/bold text
          strong: ({ children, ...props }) => (
            <strong 
              className="font-semibold text-gray-900 dark:text-white" 
              {...props}
            >
              {children}
            </strong>
          ),
          
          // Custom emphasis/italic text
          em: ({ children, ...props }) => (
            <em 
              className="italic text-gray-800 dark:text-gray-200" 
              {...props}
            >
              {children}
            </em>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
