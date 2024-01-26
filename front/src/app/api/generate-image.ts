// front/src/pages/api/generate-image.ts
import { NextResponse } from 'next/server';
import { generateImageWithDallE3 } from "@/services/open-ai";
import { NextApiRequest, NextApiResponse } from 'next';
export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // ストリームを開始
    const stream = new ReadableStream({
      start(controller) {
        // 非同期処理を開始
        const fetchData = async () => {
          try {
            // ここで外部APIを呼び出し、データを取得
            const data = await generateImageWithDallE3(req.body); // fetchSomeDataは外部APIからデータを取得する関数
  
            // データをチャンクとして送信
            controller.enqueue(data);
  
            // すべてのデータの送信が完了したらストリームを閉じる
            controller.close();
          } catch (error) {
            // エラーが発生した場合はストリームを閉じる
            controller.error(error);
          }
        };
  
        // 非同期処理を実行
        fetchData();
      }
    });

  // ストリームをレスポンスとして返す
  return new Response(stream);
}