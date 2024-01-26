import { generateImageWithDallE3 } from "@/services/open-ai";

export async function POST(req: Request) {
  const { textPrompt } = await req.json();

  if (typeof textPrompt !== "string") {
    return new Response(
      JSON.stringify({ error: "textPrompt must be a string" }),
      { status: 400 }
    );
  }

  try {
    const srcUrl = await generateImageWithDallE3(textPrompt);
    return new Response(JSON.stringify({ srcUrl }), { status: 200 });
  } catch (error) {
    if (error.status !== 200) {
      throw new Error(`Request failed with status ${error.status}`);
    }
    // ... その他のエラーハンドリング ...
  }
}
