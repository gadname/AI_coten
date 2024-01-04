import { NextRequest, NextResponse } from 'next/server'
import { Configuration, OpenAIApi } from 'openai'

// OpenAI API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
// OpenAI API client
const openai = new OpenAIApi(configuration)


// API response limit
export const config = {
  api: {
    responseLimit: false,
  },
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const prompt = body.prompt

  try {
    // OpenAI APIコール
    const response = await openai.createImage({
      
      prompt,
      n: 1,
      size: '512x512',
      response_format: 'b64_json',
    })

    // 画像取得
    const image = response.data.data[0].b64_json

    return NextResponse.json({ photo: image })
  } catch (error) {
    console.error(error)
    return NextResponse.error()
  }
}
