import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    // 🔹 validate input
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { reply: "Please provide a valid message." },
        { status: 400 }
      )
    }

    // 🔹 API key from env
    const API_KEY = process.env.API_KEY

    if (!API_KEY) {
      return NextResponse.json(
        { reply: "API key not configured in .env.local" },
        { status: 500 }
      )
    }

    // 🔥 Gemini API call
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
You are a DSA and interview preparation assistant.

Rules:
- Start with a short greeting.
- After greeting, always use clean structured format.
- Use bullet points or numbered lists.
- Do not write long paragraphs.
- Keep answers concise and easy to scan.
- Each idea should be on a separate line.
- Use line breaks between every section.

Format for answers:
Greeting line

Topic:
1. Point
2. Point
3. Point
${message}
                  `,
                },
              ],
            },
          ],
        }),
      }
    )

    const data = await res.json()
    
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response."

    return NextResponse.json({ reply })

  } catch (err) {
    console.error("AI ERROR:", err)
    return NextResponse.json(
      { reply: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
