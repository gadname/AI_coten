import React from 'react';
import { motion } from 'framer-motion';

function Flic() {
  const handleClick = () => {
    // 現在のスクロール位置 + ビューポートの高さ
    const nextScrollPosition = window.scrollY + window.innerHeight;
    
    
    window.scrollTo({
      top: nextScrollPosition,
      behavior: 'smooth' // スムーズスクロール
    });
  };

  return (
    <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
      <a onClick={handleClick}>
        <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
          {/* motion.divを使用してアニメーションを適用した白い小さなボール */}
          <motion.div
            animate={{ y: [0, 24, 0] }} // 上下に動くアニメーション
            transition={{
              duration: 1.5, // アニメーションの持続時間
              repeat: Infinity, // 無限に繰り返す
              repeatType: "loop", // ループタイプ
            }}
            className='w-3 h-3 rounded-full bg-secondary mb-1'
          />
        </div>
      </a>
    </div>
  );
}

export default Flic;