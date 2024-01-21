'use client';

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import styles from '../../styles/MyComponent.module.css';
import { useRouter } from 'next/navigation';
import Postcard from '../components/Postcard';
import ReactDOM from 'react-dom';
import Hed from '../components/Hed';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import { getSession } from 'next-auth/react';


type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  user_id: number;
  post_id: number;
};

// モーダルのコンテキストを作成
const ModalContext = React.createContext({});
const fetcher = async (url: string) => {
  const session = await getSession();
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  return res.json();
};

export default function Home() {
  

  const [modalPost, setModalPost] = useState<Post | null>(null);
  const router = useRouter();

  const { data: posts, error } = useSWR("http://localhost:3000/api/v1/posts", fetcher);

  

  const handleDelete = async (postId: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/posts/${postId}`);
      router.reload();
    } catch (err) {
      alert("削除に失敗しました");
    }
  };

  return (
    <ModalContext.Provider value={{ setModalPost }}>
      <div className={styles.postsContainer}>
      {posts && posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard}>
            <Postcard post={post} handleDelete={() => handleDelete(post.id)} handleEdit={() => setModalPost(post)} />
            <button style={{position: 'absolute', right: 80}} onClick={() => setModalPost(post)}>編集</button>
          </div>
        ))}
      </div>
      {modalPost && (
        <Modal>
          <EditForm post={modalPost} onClose={() => setModalPost(null)} />
        </Modal>
      )}
    </ModalContext.Provider>
  );
}
const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '1rem',
  zIndex: 1000,
  width: '80%',
  maxWidth: '400px',
  borderRadius: '10px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
};
const Modal = ({ children }) => {
  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        {children}
      </div>
    </>
  );
};

const EditForm = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { setModalPost } = useContext(ModalContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://ai-coten.onrender.com/api/v1/posts/${post.id}`, {
        post: {
          title: title,
          content: content,
        }
      });

      onClose();
      setModalPost(null); // モーダルを閉じる
      location.reload(); 
    } catch (err) {
      console.error(err);
      alert("編集に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        タイトル
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        コンテンツ
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </label>
      <button type="submit">保存</button>
      <button type="button" onClick={onClose}>キャンセル</button>
    </form>
  );
};