
import type { NextApiRequest, NextApiResponse } from 'next';
import { generateImageWithDallE3 } from '@/services/open-ai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { textPrompt } = req.body;
  if (typeof textPrompt !== 'string') {
    return res.status(400).json({ error: 'textPrompt must be a string' });
  }

  const srcUrl = await generateImageWithDallE3(textPrompt);
  return res.status(200).json({ srcUrl });
}