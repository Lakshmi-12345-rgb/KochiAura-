import { GoogleGenAI } from "@google/genai";
import { Property } from '../types';

let aiInstance: GoogleGenAI | null = null;

// Lazy initialization of GoogleGenAI to prevent crashing at startup if the key is temporarily absent
export function getGeminiClient(): GoogleGenAI {
  if (aiInstance) return aiInstance;

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error("GEMINI_API_KEY is not available. Please verify your AI Studio Secrets panel.");
  }

  aiInstance = new GoogleGenAI({ apiKey: key });
  return aiInstance;
}

/**
 * Returns a detailed system instruction for the model.
 * It includes database context of Kochi luxury real estate properties.
 */
function getSystemPrompt(properties: Property[], specificProperty?: Property): string {
  const propertiesSummary = properties.map(p => `- [${p.title}] in ${p.location}, priced at ${p.price}. Style: ${p.type}. Highlights: ${p.features.slice(0, 3).join(', ')}`).join('\n');

  let basePrompt = `You are "Aura", the elite artificial intelligence real-estate concierge representing Kochi Royal Real Estates, Kochi's finest luxury property portal. 
Your personality is highly sophisticated, exclusive, warm, and professional. You cater to high-net-worth individuals, NRIs (Non-Resident Indians from UAE, USA, Europe), and premium business executives. 
Your tone is refined, articulate, and deeply respectful of the client's aspirations. Always write elegantly, capturing the prestige of black-and-gold luxury aesthetic living.

You have detailed, authoritative knowledge of the luxury property market in Kochi (Cochin, Kerala), including high-end regions like:
1. Marine Drive: Prestigious metropolitan waterfront high-rises and penthouses with stunning backwater views, walkways, and marine infrastructure.
2. Fort Kochi: Historic colonial enclave with Portuguese, Dutch, and British heritage, large mahogany/teak estates, cultural galleries, and boutique resorts.
3. Kakkanad: Kochi's modern silicon/IT corridor with high-tech villas, smart automation architecture, infoparks, and young affluent tech executives.
4. Panampilly Nagar: The ultra-premium residential high street of Ernakulam, famous for chic designer boutiques, cafes, wide avenues, and high-net-worth homes.
5. Kumbalangi: Magnificent tropical waterfront peninsula lands representing serene eco-luxury, private docks, and tranquil Keralite estates.
6. Edappally: Well-connected high-rise hub nearby premium shopping malls (Lulu Mall) and major transport, featuring elite sky duplex villas.

Here is the master list of available properties currently in your catalog:
${propertiesSummary}

Guidelines for responding:
1. Speak as a trusted real-estate advisor, not a pushy sales person. Discuss architectural details, Vastu Shastra elements (e.g. East facing, peaceful energy flow), local Kerala luxury context, and investment appreciation potential.
2. If the user asks for a recommendation, analyze their preferences (e.g. tranquil vs. high-tech workspace, modern vs. heritage) and pitch 1 or 2 properties from the catalog with specific reasons why it suits them perfectly.
3. Keep formatting clean with beautiful bullet points, bold accents, and premium spacing. Never use raw markdown symbols or unspaced paragraphs.
4. Use standard Indian luxury real estate terms like "Crores" (Cr) and "Sq.Ft.".
5. Mention rejik1509@gmail.com if they want to schedule an exclusive, private VIP viewing (with a yacht or private helicopter transfer if requested!).
`;

  if (specificProperty) {
    basePrompt += `\n\n[CONTEXT] The client is currently viewing the detail window of: "${specificProperty.title}" in ${specificProperty.location} (Type: ${specificProperty.type}, Price: ${specificProperty.price}).
Provide highly custom tips on how the user can personalize, furnish, or decorate this specific property. 
If they request a Virtual AI Staging concept preview, describe in stunning photographic sensory details a design scheme (e.g., "Mughal Ivory & Gold", "Minimal Obsidian Zen", "Monarch Rosewood Legacy") illustrating exactly what furniture, lighting, and finishes should be introduced to achieve that vibe in ${specificProperty.title}.`;
  }

  return basePrompt;
}

/**
 * Streams the conversational chat with Aura.
 */
export async function streamAuraResponse(
  message: string,
  allProperties: Property[],
  specificProperty: Property | undefined,
  chatHistory: { role: 'user' | 'model'; parts: { text: string }[] }[],
  onChunk: (text: string) => void,
  onComplete?: (text: string) => void
): Promise<void> {
  try {
    const ai = getGeminiClient();
    const systemInstruction = getSystemPrompt(allProperties, specificProperty);

    // Format chat history for the Gemini SDK
    // The chats.create endpoint accepts a model and a config with systemInstruction
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: chatHistory,
    });

    const resultStream = await chat.sendMessageStream({
      message,
    });

    let fullText = "";
    for await (const chunk of resultStream) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(text);
      }
    }

    if (onComplete) {
      onComplete(fullText);
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    let errorString = "I apologize, but I am having trouble connecting to my central registry right now. ";
    if (error instanceof Error) {
      if (error.message.includes("GEMINI_API_KEY")) {
        errorString += "Please configure your GEMINI_API_KEY inside the AI Studio Secrets menu to activate my real-time premium concierge features.";
      } else {
        errorString += `Error: ${error.message}`;
      }
    } else {
      errorString += "Unknown security error occurred.";
    }
    onChunk(errorString);
    if (onComplete) {
      onComplete(errorString);
    }
  }
}

/**
 * Direct generation for short custom recommendations (AI matching helper)
 */
export async function getAIEstimateReport(
  property: Property,
  stagingStyle: string,
  customRequest: string
): Promise<string> {
  try {
    const ai = getGeminiClient();
    const prompt = `Generate a magnificent luxury interior architecture report for: "${property.title}" located in ${property.location}.
Staging Theme Selected: "${stagingStyle}".
Custom Client Request: "${customRequest || "Highlight the spatial grandeur and custom lighting structures."}".

Create a narrative structured with luxury headers:
1. DESIGN PHILOSOPHY & AMBIANCE: (Describe the choice of colors, mood, textures, and bespoke lighting fit for a high-net-worth owner)
2. FOYER & LIVING LOUNGE CONFIGURATION: (Visualize exact furniture selection, drapery, ceiling trim, gold inlay details, and wall finishes)
3. EXECUTIVE MASTER SUITE UPGRADE: (Detail structural furnishing, walk-in vanity style, bath accents)
4. EXCLUSIVE ESTIMATE & VIP VIEWING STEPS: (State architectural staging complexity tier and direct them to contact the chief broker at rejik1509@gmail.com to execute this interior design vision)

Format with gorgeous italic/bold elements and highly rich language. Provide maximum sensory polish!`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are the head of architectural designs at Kochi Royal Estates. Your vocabulary is sophisticated, exclusive, and precise.",
        temperature: 0.8,
      }
    });

    return response.text || "Report generation failed. Please try again.";
  } catch (error) {
    console.error("AI Estimate Report Error:", error);
    let errStr = "To activate custom premium AI reports, please set up your GEMINI_API_KEY in the Secrets panel.";
    if (error instanceof Error) {
      errStr += ` (${error.message})`;
    }
    return errStr;
  }
}
