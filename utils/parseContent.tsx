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

// Function to parse and highlight code blocks, headers, links, and lists
export const parseContent = (content: string): React.ReactNode[] => {
    if (typeof content !== 'string') {
        return [];
    }

    // Split content by lines and trim each line
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Array to hold parsed content
    const parsedContent: React.ReactNode[] = [];

    // Variable to track if we are inside a list
    let inList = false;
    let currentListType = ''; // 'ul' or 'ol'
    let listItems: React.ReactNode[] = [];
    let listKey = 0;

    // Loop through the lines
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Detect headers
        if (line.startsWith('#### ')) {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
            parsedContent.push(
                <h4 key={i} className="important-h4">
                    {line.slice(5)}
                </h4>
            );
        } else if (line.startsWith('### ')) {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
            parsedContent.push(
                <h3 key={i} className="important-h3">
                    {line.slice(4)}
                </h3>
            );
        } else if (line.startsWith('## ')) {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
            parsedContent.push(
                <h2 key={i} className="important-h2">
                    {line.slice(3)}
                </h2>
            );
        } else if (line.startsWith('# ')) {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
            parsedContent.push(
                <h1 key={i} className="important-h1">
                    {line.slice(2)}
                </h1>
            );
        }

        // Detect code blocks starting with ```
        else if (line.startsWith('```')) {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
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
        } 

        // Detect links (basic detection for Markdown-style links)
        else if (line.match(/\[(.+)\]\((https?:\/\/[^\s]+)\)/)) {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
            const linkMatch = line.match(/\[(.+)\]\((https?:\/\/[^\s]+)\)/);
            const linkText = linkMatch ? linkMatch[1] : '';
            const linkUrl = linkMatch ? linkMatch[2] : '';

            parsedContent.push(
                <a key={i} href={linkUrl} style={{ color: '#1e90ff', textDecoration: 'underline' }} target="_blank" rel="noopener noreferrer">
                    {linkText}
                </a>
            );
        } 
        
        // Detect unordered lists
        else if (line.startsWith('- ') || line.startsWith('* ')) {
            if (!inList) {
                inList = true;
                currentListType = 'ul';
                listItems = [];
                listKey++;
            }
            listItems.push(
                <li key={i} style={{ color: '#ffffff' }}>{line.slice(2)}</li>
            );
        } 
        
        // Detect ordered lists
        else if (line.match(/^\d+\.\s+/)) {
            if (!inList) {
                inList = true;
                currentListType = 'ol';
                listItems = [];
                listKey++;
            }
            listItems.push(
                <li key={i} style={{ color: '#ffffff' }}>{line.replace(/^\d+\.\s+/, '')}</li>
            );
        } 
        
        // Regular text
        else {
            if (inList) {
                parsedContent.push(
                    currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
                );
                inList = false;
                listItems = [];
                listKey++;
            }
            parsedContent.push(
                <p key={i} style={{ marginBottom: '1rem', color: '#ffffff' }}>{line}</p>
            );
        }
    }

    // Ensure any remaining list is added
    if (inList) {
        parsedContent.push(
            currentListType === 'ul' ? <ul key={listKey}>{listItems}</ul> : <ol key={listKey}>{listItems}</ol>
        );
    }

    return parsedContent;
};
