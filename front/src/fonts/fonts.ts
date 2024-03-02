import localFont from "next/font/local";

// カスタムローカルフォント
const neoneon = localFont({
  src: "../../public/fonts/DESIGNER.otf",
  display: "swap",
  variable: "--font-neoneon",
  preload: false,
});

const dot = localFont({
  src: "../../public/fonts/BoutiqueBitmap9x9_1.5.ttf", // フォントファイルのパスを指定
  display: "swap",
  variable: "--font-dot", // CSS変数名を指定
  preload: false,
});




export { neoneon, dot };