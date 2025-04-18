# NopeNet Upgrade Guide

This guide helps existing NopeNet users upgrade their installation to include the latest features, including the enhanced markdown rendering in the chat interface.

## Upgrading from Previous Versions

If you already have NopeNet installed, follow these steps to upgrade to the latest version with enhanced markdown support:

### 1. Update Your Repository

Pull the latest changes from the repository:

```bash
git pull origin main
```

### 2. Install New Dependencies

Install the new packages required for markdown rendering:

```bash
npm install --save react-markdown remark-gfm @tailwindcss/typography
```

### 3. Update Tailwind Configuration

Add the typography plugin to your `tailwind.config.ts` file:

```typescript
// Add this to your plugins array
plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography")
],

// Add this to your theme.extend section
typography: {
  DEFAULT: {
    css: {
      color: 'white',
      a: {
        color: '#93c5fd',
        '&:hover': {
          color: '#60a5fa',
        },
      },
      h1: { color: 'white' },
      h2: { color: 'white' },
      h3: { color: 'white' },
      h4: { color: 'white' },
      strong: { color: 'white' },
      code: {
        color: 'white',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        padding: '0.25rem',
        borderRadius: '0.25rem',
        fontWeight: '400',
      },
      blockquote: {
        color: '#94a3b8',
        borderLeftColor: '#475569',
      },
      'code::before': { content: '""' },
      'code::after': { content: '""' },
    },
  },
},
```

### 4. Update Server Dependencies

Update the backend dependencies:

```bash
pip install -r server/requirements.txt
```

### 5. Add Font Imports

Add the following font imports to your `globals.css` file:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Fira+Code:wght@400;500&display=swap');

/* Modern font styling for chat interface */
.chat-page {
  font-weight: 300;
  letter-spacing: 0.015em;
}

.chat-page h1, 
.chat-page h2, 
.chat-page h3, 
.chat-page h4 {
  font-weight: 500;
  letter-spacing: -0.01em;
}

.chat-page code {
  font-family: 'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
```

### 6. Rebuild and Restart

Rebuild the application and restart the services:

```bash
npm run build
npm run dev
```

## What's New

The latest upgrade includes:

1. **Enhanced Markdown Rendering**: Beautiful, readable markdown in the chat interface
2. **Modern Typography**: Sleeker, more professional font styling with proper hierarchies
3. **Code Block Improvements**: Better formatting for code with syntax highlighting
4. **Table Formatting**: Clean, readable tables for comparative data
5. **API Improvements**: Enhanced markdown formatting from the backend

## Compatibility Notes

- This upgrade is compatible with all previous data and models
- No database migrations are required
- The UI changes are fully responsive on mobile and desktop

## Need Help?

If you encounter any issues during the upgrade:

1. Check the [Troubleshooting Guide](MARKDOWN_STYLING.md#troubleshooting)
2. Ensure all dependencies are correctly installed
3. Verify that your tailwind configuration includes the typography plugin
4. Check browser console for any errors

For further assistance, refer to the full [Installation Guide](README.md) or open an issue in the repository. 