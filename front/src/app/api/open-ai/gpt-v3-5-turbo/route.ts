import { askGptV3_5Turbo } from "@/services/open-ai";

export async function POST(req: Request) {
  const { textPrompt } = await req.json();

  if (typeof textPrompt !== "string") {
    return new Response(
      JSON.stringify({ error: "textPrompt must be a string" }),
      { status: 400 }
    );
  }

  const answer = await askGptV3_5Turbo(textPrompt);
  return new Response(JSON.stringify({ answer }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
