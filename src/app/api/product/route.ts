import type { NextRequest } from 'next/server'
import { OpenAI } from 'openai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  const { product } = await request.json()

  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt: `Can the product "${product}" cause cancer?`,
    max_tokens: 50,
  })

  const result = response.choices[0].text.trim()

  return new Response(JSON.stringify({ result }))
}
