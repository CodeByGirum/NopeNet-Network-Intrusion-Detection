# NopeNet System Architecture Document

## 1. System Overview

NopeNet is a modern web application for network intrusion detection with an intuitive user interface. It analyzes network data to detect potential threats and attacks, providing detailed visualizations and actionable recommendations through an AI-powered assistant.

### 1.1 Purpose

The primary purpose of NopeNet is to:
- Process network data in KDD format to identify potential security threats
- Visualize attack distributions and patterns
- Provide actionable security recommendations
- Offer an AI assistant for deeper insights and explanations

### 1.2 Target Users

- Network security professionals
- IT administrators
- Security researchers
- Students learning about network security

## 2. System Architecture

NopeNet follows a client-server architecture built on Next.js, utilizing the App Router pattern for routing and server components for data processing.

### 2.1 High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                        Next.js Server                        │
│                                                             │
│  ┌─────────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   React UI      │    │  Server      │    │   API      │  │
│  │   Components    │◄───┤  Components  │◄───┤   Routes   │  │
│  └─────────────────┘    └──────────────┘    └────────────┘  │
│                                                             │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                      External Services                       │
│                                                             │
│  ┌─────────────────┐                                        │
│  │ Open ai    │                                        │
│  │   API           │                                        │
│  └─────────────────┘                                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 2.2 Component Architecture

NopeNet is structured using a component-based architecture with the following key components:

1. **UI Layer**: React components for user interaction
2. **State Management**: React Context API for application state
3. **Data Processing**: Utility functions for processing network data
4. **API Layer**: Server-side API routes for AI integration
5. **External Services**: Integration with xAI/Grok for AI assistant capabilities

## 3. Component Structure

### 3.1 Frontend Components

\`\`\`
components/
├── floating-assistant.tsx    # Floating AI chat interface
├── footer.tsx                # Application footer
├── hero-section.tsx          # Main input section for data
├── playful-robot-icon.tsx    # Animated robot icon component
├── results-section.tsx       # Results visualization
└── ui/                       # UI components from shadcn/ui
\`\`\`

### 3.2 Pages

\`\`\`
app/
├── layout.tsx                # Root layout component
├── page.tsx                  # Home page with data input
├── results/                  # Results display page
│   └── page.tsx
├── chat/                     # Dedicated chat page
│   └── page.tsx
├── resources/                # Educational resources
│   └── page.tsx
└── assignment-files/         # Project documentation
    └── page.tsx
\`\`\`

### 3.3 Context and State Management

\`\`\`
context/
└── detection-context.tsx     # Context for detection results
\`\`\`

### 3.4 Utilities

\`\`\`
utils/
└── process-data.ts           # Data processing utilities
\`\`\`

### 3.5 API Routes

\`\`\`
app/api/
└── chat/
    └── route.ts              # AI chat endpoint
\`\`\`

## 4. Data Flow

### 4.1 Detection Process Flow

1. User inputs KDD-formatted network data via text input or file upload
2. Data is processed by the `processKddData` function in `utils/process-data.ts`
3. Detection results are stored in the `DetectionContext`
4. User is redirected to the results page
5. Results are visualized in various charts and tables

\`\`\`
┌──────────┐     ┌───────────┐     ┌─────────────┐     ┌─────────────┐
│  Input   │     │ Process   │     │  Store in   │     │  Display    │
│  Data    │────►│ Data      │────►│  Context    │────►│  Results    │
└──────────┘     └───────────┘     └─────────────┘     └─────────────┘
\`\`\`

### 4.2 AI Assistant Flow

1. User interacts with the AI assistant via the floating button or chat page
2. User message is sent to the `/api/chat/route.ts` endpoint
3. The endpoint forwards the message to the xAI/Grok API along with detection data context
4. The AI response is streamed back to the client
5. The response is displayed in the chat interface

\`\`\`
┌──────────┐     ┌───────────┐     ┌─────────────┐     ┌─────────────┐
│  User    │     │ Next.js   │     │  xAI/Grok   │     │  Display    │
│  Message │────►│ API Route │────►│  API        │────►│  Response   │
└──────────┘     └───────────┘     └─────────────┘     └─────────────┘
\`\`\`

## 5. Data Models

### 5.1 Detection Result

\`\`\`typescript
export type AttackType = "DOS" | "Probe" | "R2L" | "U2R" | "normal"

export interface DetectionResult {
  timestamp: string
  protocol: string
  flag: string
  attackType: AttackType
  confidence: number
}

export interface DetectionData {
  inputText: string
  totalPackets: number
  attacksDetected: number
  processingTime: string
  results: DetectionResult[]
}
\`\`\`

### 5.2 Chat Message

\`\`\`typescript
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}
\`\`\`

## 6. API Documentation

### 6.1 Chat API

**Endpoint**: `/api/chat`

**Method**: POST

**Request Body**:
\`\`\`json
{
  "messages": [
    {
      "id": "string",
      "role": "user" | "assistant",
      "content": "string"
    }
  ],
  "detectionData": {
    "inputText": "string",
    "totalPackets": "number",
    "attacksDetected": "number",
    "processingTime": "string",
    "results": [
      {
        "timestamp": "string",
        "protocol": "string",
        "flag": "string",
        "attackType": "DOS" | "Probe" | "R2L" | "U2R" | "normal",
        "confidence": "number"
      }
    ]
  }
}
\`\`\`

**Response**: Streaming response with AI-generated text

## 7. Technologies Used

### 7.1 Frontend

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **shadcn/ui**: High-quality UI components
- **Lucide React**: Icon library

### 7.2 Backend

- **Next.js API Routes**: Server-side API endpoints
- **AI SDK**: Vercel's AI SDK for integrating with AI models
- **xAI/Grok**: AI model for natural language processing

## 8. Security Considerations

### 8.1 Data Handling

- All data processing occurs client-side or in server components
- No persistent storage of sensitive network data
- No external data transmission except to the AI API

### 8.2 API Security

- Rate limiting should be implemented for production
- Authentication should be added for production use
- Environment variables used for API keys

## 9. Deployment

### 9.1 Deployment Architecture

NopeNet is designed to be deployed on Vercel's platform, leveraging their serverless functions for API routes and edge network for static assets.

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      Vercel Platform                         │
│                                                             │
│  ┌─────────────────┐    ┌──────────────┐    ┌────────────┐  │
│  │   Static        │    │  Serverless  │    │   Edge     │  │
│  │   Assets        │    │  Functions   │    │   Network  │  │
│  └─────────────────┘    └──────────────┘    └────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### 9.2 Environment Variables

- `XAI_API_KEY`: API key for xAI/Grok integration

## 10. Future Enhancements

### 10.1 Planned Features

- **Real-time Monitoring**: Add support for real-time network data monitoring
- **User Authentication**: Implement user accounts and authentication
- **Data Persistence**: Add database integration for storing historical scan results
- **Advanced Visualizations**: Enhance data visualization capabilities
- **Export Functionality**: Allow exporting of results in various formats
- **Integration with Security Tools**: Connect with other security tools and platforms

### 10.2 Technical Improvements

- **Performance Optimization**: Optimize data processing for larger datasets
- **Offline Support**: Add PWA capabilities for offline use
- **Multi-language Support**: Internationalization for global users
- **Accessibility Enhancements**: Further improve accessibility features

## 11. Conclusion

NopeNet is designed as a modern, user-friendly network intrusion detection system with powerful AI capabilities. Its architecture prioritizes performance, usability, and extensibility, making it suitable for both educational and professional use cases.

The component-based design allows for easy maintenance and future enhancements, while the integration with xAI/Grok provides advanced AI assistant capabilities for helping users understand and respond to security threats.
