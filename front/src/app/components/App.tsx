import Modal from "./Modal";
import { useState } from "react";

export default function App() {
  // trueになればmodal表示
  const [modalFlg, setFlg] = useState(false);
  // 選択確定のタグ
  const [selectTag, setTag] = useState([]);

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
        <Modal {...props} />
        <button onClick={() => setFlg((flg) => !flg)}>プロンプトリスト</button>
        <button onClick={() => setTag([])}>clear</button>
        {selectTag.length !== 0 ? (
          selectTag.map((tag) => <div>{tag}</div>)
        ) : (
          <></>
        )}
      </div>
    </>
  );
}