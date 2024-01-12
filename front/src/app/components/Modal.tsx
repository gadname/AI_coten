/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";

const Modal = ({ modalFlg, setFlg, selectTag, setTag }) => {
  // 選択できるタグ一覧
  const array = Array.of(
    "lighting, 2700K",
    "fluorescent lighting, 4800K",
    "harsh flash, 4800K",
    "blue lightning",
    "red lightning",
    "backlight, adds a glow around subject edge"
  );

  // Modalコンポーネントで選択中のタグを保持
  const [selectingTag, setSeletingTag] = useState([]);

  //modalFlgが切り替わったタイミング（modal表示/非表示)で
  // 選択確定タグと選択中タグの選択タグを一致させる
  useEffect(() => {
    setSeletingTag(() => selectTag);
  }, [modalFlg]);

  // タグ選択処理
  const push = (e) => {
    e.preventDefault();

    // タグが既に選択中かチェックする
    const check = selectingTag.find((tag) => {
      return tag === e.target.value;
    });

    if (!check) {
      //未選択の場合は追加
      setSeletingTag((selected) => [...selectingTag, e.target.value]);
    } else {
      // 選択済の場合は削除
      // filterで選択したタグ以外のlistを作り直す
      setSeletingTag((selected) =>
        selectingTag.filter((tag) => tag !== e.target.value)
      );
    }
  };
  // Modalでのタグ選択を確定する
  const selectComfilm = () => {
    // Modalで選択したタグを確定（呼出し元へ反映）
    setTag(() => selectingTag);
    // Modalを閉じる
    setFlg((flg) => !flg);
  };

  // Modalで選択中タグをclear
  const clear = () => {
    // clear
    setSeletingTag([]);
  };

  return (
    <div css={[modal(modalFlg)]}>
      <div>
        <div css={[gridContainer]}>
          {array.map((tag) => (
            <button
              key={tag}
              value={tag}
              css={[grigItem(selectingTag, tag)]}
              onClick={(e) => push(e)}
            >
              {tag}
            </button>
          ))}
        </div>
        <div css={[styles.container]}>
          <button
            css={[gridItemBase, styles.item]}
            onClick={() => selectComfilm()}
          >
            select
          </button>
          <button css={[gridItemBase, styles.item]} onClick={() => clear()}>
            clear
          </button>
          <button
            css={[gridItemBase, styles.item]}
            onClick={() => setFlg((flg) => !flg)}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;

const modal = (modalFlg) => {
  let opacity = 0; //透明ではない
  let visibility = "hidden"; //不可視化
  if (modalFlg) {
    // modalオープン時
    opacity = 200; //透明度をあげる
    visibility = "visible"; //可視化
  }
  return [
    css`
      /* 一番上に表示 */
      z-index: 999;
      /* 定位置 */
      position: fixed;
      top: 0;
      left: 0;
      /* フルスクリーン */
      width: 100vw;
      height: 100vh;
      
      display: flex;
      justify-content: center;
      align-items: center;
      /* 初期状態は非表示 */
      opacity: ${opacity};
      visibility: ${visibility};
      /* ゆっくり表示させる */
      transition: opacity 0.3s, visibility 0.3s;
      /* 裏をぼかす */
      backdrop-filter: blur(1px);
    `
  ];
};
// タグ一覧をgridで表示
const gridContainer = () => [
  css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 20px 20px;
    width: 100vw;
    margin-bottom: 30px;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0.25rem 1.25rem white;
    
  `
];

// タグ選択時のスタイル変更
const grigItem = (selectTag, select) => {
  // 選択したタグが既に選択済かチェック
  const count = selectTag.filter((selected) => select === selected);
  // 選択してない場合はスタイル追加
  if (count.length !== 0) {
    return [
      gridItemBase,
      css`
      background-color : hsla(205,100%,13%,1) ;
      background-image:
      radial-gradient(at 49% 49%, hsla(191,77%,26%,1) 0px, transparent 50%),
      radial-gradient(at 99% 44%, hsla(208,62%,38%,1) 0px, transparent 50%),
      radial-gradient(at 100% 0%, hsla(208,39%,40%,1) 0px, transparent 50%),
      radial-gradient(at 62% 100%, hsla(192,71%,38%,1) 0px, transparent 50%),
      radial-gradient(at 1% 100%, hsla(196,77%,18%,1) 0px, transparent 50%),
      radial-gradient(at 7% 69%, hsla(200,45%,39%,1) 0px, transparent 50%),
      radial-gradient(at 0% 0%, hsla(191,52%,49%,1) 0px, transparent 50%);
        color: white;
      `
    ];
  } else {
    return [
      gridItemBase,
      css`
        background-color: white;

        &:hover {
          background-color: skyblue;
        }
      `
    ];
  }
};

// タグのスタイルベース
const gridItemBase = css`
  border: 1px solid black; /* 枠線の色を追加 */
  border-radius: 10px;
  padding: 5px;
  transition: all 0.1s 0s ease-in;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    background-color: darkblue;
    color: white;
    transform: scale(0.9);
  }
`;

// ボタンのスタイル
const styles = {
  container: () => [
    css`
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    `
  ],
  item: () => [
    css`
      border: 1px solid black;
      flex: 1;
      max-width: 100px;
      text-align: center;
    `
  ]
};
