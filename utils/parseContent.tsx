import React from 'react';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";

// Create a customized style based on solarizedlight
const customSolarizedLight = {
    ...solarizedlight,
    'pre[class*="language-"]': {
        ...solarizedlight['pre[class*="language-"]'],
        background: '#ffffff14', // Semi-transparent white background
        borderRadius: '5px',    // Optional: Rounded corners
        padding: '1rem',        // Optional: Padding around the code
        fontSize: '0.875rem',   // Optional: Font size
    },
    'code[class*="language-"]': {
        ...solarizedlight['code[class*="language-"]'],
    },
};

// Function to parse and highlight code blocks and headers
export const parseContent = (content: string): React.ReactNode[] => {
    // Split content by lines
    if (typeof content !== 'string') {
        return [];
      }
    const lines =  content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Array to hold parsed content
    const parsedContent: React.ReactNode[] = [];

    // Loop through the lines
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Detect headers
        if (line.startsWith('#### ')) {
            parsedContent.push(
                <h4 key={i} className="important-h4">
                    {line.slice(5)}
                </h4>
            );
        } else if (line.startsWith('### ')) {
            parsedContent.push(
                <h3 key={i} className="important-h3">
                    {line.slice(4)}
                </h3>
            );
        } else if (line.startsWith('## ')) {
            parsedContent.push(
                <h2 key={i} className="important-h2">
                    {line.slice(3)}
                </h2>
            );
        } else if (line.startsWith('# ')) {
            parsedContent.push(
                <h1 key={i} className="important-h1">
                    {line.slice(2)}
                </h1>
            );
        }

        // Detect code blocks starting with ```
        
        else if (line.startsWith('```')) {
            // Gather code block content
            const language = line.slice(3).trim() || "javascript"; // Get the language, default to "javascript"
            let codeBlock = '';

            i++; // Move to the next line
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeBlock += `${lines[i]}\n`;
                i++;
            }

            // Render the code block
            parsedContent.push(
                <SyntaxHighlighter language={language} style={customSolarizedLight} key={i}>
                    {codeBlock.trim()}
                </SyntaxHighlighter>
            );
        } else {
            // Regular text
            parsedContent.push(
                <p key={i} style={{ marginBottom: '1rem', color: '#ffffff' }}>{line}</p>
            );
        }
    }

    return parsedContent;
};
