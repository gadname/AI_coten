import Modal from "./Modal";
import { useState, Dispatch, SetStateAction } from "react";

// Assuming you have a type or interface defined for ModalProps


export default function TagSelector() {
  // trueになればmodal表示
  const [modalFlg, setFlg] = useState(false);
  // 選択確定のタグ
  const [selectTag, setTag] = useState<string[]>([]);
  // テキストボックスの状態
  const [textBoxValue, setTextBoxValue] = useState('');

  // 全てのタグをテキストボックスに挿入する関数
  const insertAllTagsToTextBox = () => {
    setTextBoxValue(selectTag.join(' ')); // タグをスペースで結合してテキストボックスの状態を更新
  };
  const insertTagToTextBox = (tag: string) => {
    setTextBoxValue(textBoxValue + ' ' + tag); // 既存のテキストにタグを追加
  };

  // Modalに渡すpropsをまとめる
  const props = {
    modalFlg,
    setFlg,
    selectTag,
    setTag
  };
  
  return (
    
    <>
       <div style={{ textAlign: "center" }}>
      <input
        type="text"
        value={textBoxValue}
        onChange={(e) => setTextBoxValue(e.target.value)}
      />
      <Modal insertTagToTextBox={insertTagToTextBox} {...props} />
        <button onClick={() => setFlg((flg) => !flg)}>modal Open!</button>
        <button onClick={() => setTag([])}>clear</button>
        {/* 全てのタグを挿入するボタン */}
        <button onClick={insertAllTagsToTextBox}>
          挿入
        </button>
        {/* 新しいテキストボックス */}
        <input
          type="text"
          value={textBoxValue}
          onChange={(e) => setTextBoxValue(e.target.value)}
        />
        {selectTag.length !== 0 ? (
          selectTag.map((tag, index) => (
            <button key={index} onClick={() => insertTagToTextBox(tag)}>
              {tag}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}