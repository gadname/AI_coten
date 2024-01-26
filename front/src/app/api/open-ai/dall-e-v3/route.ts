import { askGptV3_5Turbo, generateImageWithDallE3 } from "@/services/open-ai";

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req) {
  // Edge Functionsはリクエストを受け取るときにRequestオブジェクトを使用します
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const { textPrompt } = await req.json();

  if (typeof textPrompt !== 'string') {
    return new Response(
      JSON.stringify({ error: 'textPrompt must be a string' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const srcUrl = await generateImageWithDallE3(textPrompt);
  return new Response(JSON.stringify({ srcUrl }), { status: 200 });
}
