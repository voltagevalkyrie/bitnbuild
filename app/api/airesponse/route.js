import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

// Set your API key here (use environment variables in production)
const API_KEY = process.env.GOOGLE_API_KEY || 'AIzaSyAcmL9JUzosLrJuBEUDxmLCBXTKQFPtx-E';

export async function POST(req) {
  try {
    // Parse the JSON body of the request
    const { image, questions } = await req.json();

    // Prepare the image and prompt content
    const contents = [
      {
        role: "user",
        parts: [
          { inline_data: { mime_type: "image/jpeg", data: image } },
          { text: ` ${questions}` },
        ],
      },
    ];

    // Initialize the Generative AI API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or gemini-1.5-pro
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    // Generate the AI response
    const result = await model.generateContentStream({ contents });
    let buffer = [];

    // Collect the response from the stream
    for await (let response of result.stream) {
      buffer.push(response.text());
    }

    // Return the AI-generated response
    return new Response(JSON.stringify({ response: buffer.join('') }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error with AI generation:", error);
    return new Response(JSON.stringify({ error: "AI generation failed" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
