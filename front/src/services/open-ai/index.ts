import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const askGptV3_5Turbo = async (textPrompt: string) => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: textPrompt }],
    model: "gpt-3.5-turbo",
  });

  const answer = completion.choices[0].message.content;

  return answer;
};

export const generateImageWithDallE3 = async (textPrompt: string) => {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: textPrompt,
    n: 1,
    size: "1024x1024",
  });
  return response.data[0].url;
};
