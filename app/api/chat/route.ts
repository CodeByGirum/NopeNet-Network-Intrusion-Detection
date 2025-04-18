import { xai } from "@ai-sdk/xai"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

export const runtime = "nodejs"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface AttackTypes {
  DOS: number;
  Probe: number;
  R2L: number;
  U2R: number;
  normal: number;
  [key: string]: number;
}

export async function POST(req: Request) {
  try {
    const { messages, detectionData } = await req.json()

    // Create a detailed system message with detection results if available
    let systemContent = `You are the NopeNet Assistant, an AI specialized in network security and intrusion detection.
  
  NopeNet is a modern web application for network intrusion detection with an intuitive user interface. 
  It analyzes network data to detect potential threats and attacks, providing detailed visualizations and actionable recommendations.
  
  You can help users understand different types of network attacks:
  - DOS (Denial of Service): Attacks that attempt to make a machine or network resource unavailable
  - Probe: Surveillance and scanning attacks that gather information for future exploitation
  - R2L (Remote to Local): Unauthorized access from a remote machine to a local machine
  - U2R (User to Root): Attacks where a normal user gains root/administrator privileges
  
  Provide helpful, concise responses about network security, intrusion detection, and the KDD dataset.
  When appropriate, suggest specific security recommendations.
  
  IMPORTANT: Format your responses using Markdown for better readability. Use the following Markdown elements when appropriate:
  
  - Use **bold** for emphasis on important points
  - Use headings (# Heading 1, ## Heading 2) for organizing information
  - Use bullet points and numbered lists for steps and lists
  - Use code blocks with \`\`\` for configuration suggestions or commands
  - Use tables for comparative information
  - Use > for quotations or important notes
  
  Make your responses visually structured and easy to scan.`

    // Add detection data to the system message if available
    if (detectionData) {
      const { totalPackets, attacksDetected, processingTime, results } = detectionData

      // Count attack types
      const attackTypes: AttackTypes = {
        DOS: 0,
        Probe: 0,
        R2L: 0,
        U2R: 0,
        normal: 0,
      }

      if (results && Array.isArray(results)) {
        results.forEach((result: { attackType: string }) => {
          if (result.attackType in attackTypes) {
            attackTypes[result.attackType]++
          }
        })
      }

      // Add detection summary to system message
      systemContent += `

CURRENT DETECTION RESULTS:
    - Total packets analyzed: ${totalPackets || "N/A"}
    - Attacks detected: ${attacksDetected || "N/A"} 
    - Processing time: ${processingTime || "N/A"}
    - Attack breakdown: 
      - DOS attacks: ${attackTypes.DOS}
      - Probe attacks: ${attackTypes.Probe}
      - R2L attacks: ${attackTypes.R2L}
      - U2R attacks: ${attackTypes.U2R}
      - Normal traffic: ${attackTypes.normal}
    
    When the user asks about their scan results or detection data, refer to this information.
    You can mention specific attack types found and their quantities.
    Provide tailored security recommendations based on the specific threats detected.
    Format security recommendations in a clear, structured way using Markdown elements.`
    }

    // Create a new array with the system message first, followed by user messages
    const augmentedMessages = [
      { role: "system", content: systemContent },
      ...messages.map((message: any) => ({
        role: message.role,
        content: message.content,
      })),
    ]

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: augmentedMessages as any[],
      stream: true,
    })

    // Convert the response to a streaming response
    const stream = OpenAIStream(response as any)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error("Error in chat API route:", error)
    return new Response(JSON.stringify({ error: "Failed to process chat request" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
