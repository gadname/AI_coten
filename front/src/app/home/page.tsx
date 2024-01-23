'use client';
import 'next-auth';
import React, { useEffect, useState, useContext, ReactNode } from 'react';
import axios from 'axios';
import styles from '../../styles/MyComponent.module.css';
import { useRouter } from 'next/navigation';
import Postcard from '../components/Postcard';
import ReactDOM from 'react-dom';
import Hed from '../components/Hed';
import { useSession, signIn, signOut } from 'next-auth/react'
import useSWR from 'swr';
import { getSession } from 'next-auth/react';

interface EditFormProps {
  post: Post;
  onClose: () => void;
}

declare module 'next-auth' {
  /**
   * Extends the built-in session types to include the accessToken property
   */
  interface Session {
    accessToken?: string;
  }
}

type Post = {
  id: number;
  title: string;
  content: string;
  image: { url: string }; // Updated to match the expected type
  user_id: number;
  post_id: number;
};
// Define the context shape with an interface
interface ModalContextType {
  setModalPost: (post: Post | null) => void;
}

// Create the context with the correct type
const ModalContext = React.createContext<ModalContextType>({
  setModalPost: () => {}, // Provide a default no-op function
});

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
      window.location.reload();
    } catch (err) {
      alert("削除に失敗しました");
    }
  };

  return (
    <ModalContext.Provider value={{ setModalPost }}>
      <div className={styles.postsContainer}>
      {posts && posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard}>
          <Postcard post={post} handleDelete={() => handleDelete(post.id)} />
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
const modalStyle: React.CSSProperties = {
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

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 1000
};

interface ModalProps {
  children: ReactNode;
}


const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <>
      <div style={overlayStyle} />
      <div style={modalStyle}>
        {children}
      </div>
    </>
  );
};

const EditForm: React.FC<EditFormProps> = ({ post, onClose }) => {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const { setModalPost } = useContext(ModalContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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