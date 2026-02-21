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
You are a helpful DSA placement assistant similar to ChatGPT.

LANGUAGE:
- If user asks in English → reply in English
- If user asks in Hindi/Hinglish → reply in Hinglish

STYLE:
- Short, crisp, clean
- Use headings + bullet points
- No long paragraphs
- Friendly mentor tone

FORMAT:
- 1 line definition
- 4–6 bullet points
- Optional small example/code

LIMIT:
- Max 80 words

FOCUS:
- Interview + DSA clarity

User Question:
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
