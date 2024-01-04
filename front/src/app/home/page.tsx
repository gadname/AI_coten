'use client';

import React, { useEffect, useState } from 'react';
import styles from '../../styles/MyComponent.module.css';  // CSS モジュールをインポート
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Postcard from '../components/Postcard';

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  user_id: number;
  post_id: number;
  
};  // Post 型を定義

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("https://ai-coten.onrender.com/api/v1/posts");
      const data: Post[] = await res.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: number) => {
    try{
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts/${postId}`);

      router.reload();
    } catch (err) {
      
      alert("削除に失敗しました");
    }

  }
  

  return (
    <>
    

      <div className={styles.postsContainer}>
        {posts.map((post: Post) => (
          <div key={post.id} className={styles.postCard}>
            <Postcard  post={post} handleDelete={() => handleDelete(post.id)} />
          </div>
          
        ))}
        
      </div>
    </>
  );
}