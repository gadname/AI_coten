import React from 'react';
import styles from '../styles/MyComponent.module.css';  // CSS モジュールをインポート
import axios from 'axios';
import { useRouter } from 'next/router';
import Postcard from '../components/Postcard';

type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  user_id: number;
  post_id: number;
  
};  // Post 型を定義

type Props = {
  posts: Post[];
};

export async function getStaticProps() { //Props = ページごとに異なるPropsを設定できる
  const res = await fetch('https://ai-coten.onrender.com/api/v1/posts');
  const posts: Post[] = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 120 * 60 * 24, // 1 day
  };
}

// const inter = Inter({ subsets: ['latin'] });  // もし不要であればコメントアウト

export default function Home({ posts }: { posts: Post[] }) {
  const router = useRouter();

  const handleDelete = async (postId: number) => {
    try{
      await axios.delete(`https://ai-coten.onrender.com/api/v1/posts/${postId}`);

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