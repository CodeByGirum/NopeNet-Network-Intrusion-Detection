# Markdown Chat Styling Guide

This document provides instructions for installing and customizing the markdown rendering in the NopeNet chat interface.

## Installation Requirements

To enable the modern, sleek markdown rendering in the chat interface, you need to install the following packages:

```bash
npm install --save react-markdown remark-gfm @tailwindcss/typography
```

## What These Packages Do

- **react-markdown**: Core library that converts markdown text to React components
- **remark-gfm**: Plugin for GitHub Flavored Markdown support (tables, strikethrough, etc.)
- **@tailwindcss/typography**: Tailwind plugin that provides beautiful typographic defaults

## Configuration

1. **Tailwind Configuration**

   Ensure your `tailwind.config.ts` includes the typography plugin:

   ```typescript
   // tailwind.config.ts
   import type { Config } from "tailwindcss"

   const config: Config = {
     // other config...
     plugins: [
       require("tailwindcss-animate"),
       require("@tailwindcss/typography")
     ],
     theme: {
       extend: {
         typography: {
           DEFAULT: {
             css: {
               color: 'white',
               // Add other typography customizations here
             }
           }
         }
       }
     }
   }
   ```

2. **Font Configuration**

   The styling uses two main font families:
   
   - **Inter**: For general text (300, 400, 500 weights)
   - **Fira Code**: For code blocks

   Import these fonts in your CSS:

   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');
   ```

3. **CSS Classes**

   The styling uses the following class structure:
   
   - `.chat-page`: Applied to the main container for general font settings
   - `.prose`: Applied to markdown content for typography
   - `.message-bubble`: Applied to message containers for visual styling

## Customization

If you want to customize the styling:

1. You can adjust the font weights in `globals.css` by modifying the font-weight properties
2. Adjust spacing and margins in the prose CSS classes
3. Modify the colors to match your brand by changing the color values

## Troubleshooting

- If the markdown isn't rendering correctly, check the browser console for errors related to react-markdown
- If fonts aren't loading, ensure your app has internet access to load the Google Fonts
- For mobile optimization, you may need to adjust the font sizes for smaller screens

## Example Output

When properly configured, your markdown will render with:

- Clean, thin typography for regular text
- Subtle emphasis for headings
- Nicely formatted code blocks with monospace font
- Elegant tables with proper spacing
- Beautiful styling for blockquotes and other elements 