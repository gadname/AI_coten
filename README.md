# Gallery.ai / AI画像生成 & デジタル個展サービス


# サービス概要

▼サービスURL

▼紹介記事(Qiita)

▼開発者Twitter

# メイン機能の使い方

# 使用技術一覧

# 主要対応一覧
## ユーザー向け
### 機能
### 画面
## 非ユーザー向け

# ■ 機能候補
MVPリリース
- NextAuthによるGoogleログイン/ログアウト機能
- 画像アップロード機能
- OpenAI APIを用いた画像生成
- ユーザー登録機能
- 投稿機能
- 投稿詳細機能
- 投稿一覧機能
- OpenAI APIによるDALL_E3を使った画像生成機能
  
本リリース
- コメント機能
- タグ検索機能
- お気に入り機能
- おすすめ機能
- Xシェア機能
  
■ 機能の実装方針予定
- CarrierWave/MiniMagick
- AWS S3
- renderでのデプロイ
- Vercelでのデプロイ

- ログイン機能（NextAuth認証を利用し、Googleログインを実装）
- OpenAI APIの使用(モダンな技術であるOpenAI APIの画像生成を使用することでキャッチアップ力を示す)
- レスポンシブデザイン(TailwindCSS使用:スマートフォンなど幅広いデバイスに対応することによりユーザー体験の向上) 
- Dockerによる環境構築
- フロントエンド：Next.js(Next.jsのSSR機能とRails APIモードを組み合わせることでイラスト表示を高速で実現します)
- バックエンド：Rails

■ 画面遷移図
https://www.figma.com/file/XIGmq8AnWjoV1kPRTPrA4x/%E7%84%A1%E9%A1%8C?type=design&node-id=0%3A1&mode=design&t=StaTdsjnwkuWDrqq-1
=======
- ログイン機能（NextAuth認証）
- OpenAI APIの使用(画像生成)
- レスポンシブデザイン(TailwindCSS使用) 
- Dockerによる環境構築
- フロントエンド：Next.js
- バックエンド：Rails

画面遷移図
Figma https://www.figma.com/file/XIGmq8AnWjoV1kPRTPrA4x/%E7%84%A1%E9%A1%8C?type=design&node-id=0%3A1&mode=design&t=NWIaAugWdLuP4MwU-1

ER図
https://app.diagrams.net/#G1BNecqmVT4mcvx4kreQ_sa9qpeW4pQ1FU
