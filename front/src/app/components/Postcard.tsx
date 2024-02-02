import Link from 'next/link';
import styles from './Postcard.module.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState,useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  image: {
    url: string;
  };
}

export default function Postcard({ post, handleDelete }: { post: Post; handleDelete: () => void }) {
  const router = useRouter();
  const [isStarred, setIsStarred] = useState(false); 
  const [clickCount, setClickCount] = useState(0);
  const [comment, setComment] = useState(''); // Add this line
  const [comments, setComments] = useState<string[]>([]); 
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const storedCount = Number(localStorage.getItem(`clickCount-${post.id}`)) || 0;
    const storedStarred = localStorage.getItem(`isStarred-${post.id}`) || 'false';
    const storedComments = JSON.parse(localStorage.getItem(`comments-${post.id}`) || '[]');
    setClickCount(storedCount);
    setIsStarred(storedStarred === 'true');
    setComments(storedComments);
  }, []);

  const handleStarClick = () => {
    const newStarred = !isStarred;
    const newCount = clickCount + 1;
    setIsStarred(newStarred);
    setClickCount(newCount);
    localStorage.setItem(`clickCount-${post.id}`, newCount.toString());
    localStorage.setItem(`isStarred-${post.id}`, newStarred.toString());
  
    // Trigger the animation
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  const handleCommentSubmit = () => {
    const newComments = [...comments, comment]; // 既存のリストに新しいコメントを追加
    setComments(newComments);
    setComment('');
    localStorage.setItem(`comments-${post.id}`, JSON.stringify(newComments));
  };

  const handleCommentDelete = (index: number) => { // Add this function
    const newComments = [...comments];
    newComments.splice(index, 1);
    setComments(newComments);
    localStorage.setItem(`comments-${post.id}`, JSON.stringify(newComments));
  };

  return (
    
    <div className={styles.card}>
      <div className={styles.touch + " " + styles.touch__1}></div>
      <div className={styles.touch + " " + styles.touch__2}></div>
      <div className={styles.touch + " " + styles.touch__3}></div>
      <div className={styles.touch + " " + styles.touch__4}></div>
      <div className={styles.touch + " " + styles.touch__6}></div>
      <div className={styles.touch + " " + styles.touch__7}></div>
      <div className={styles.touch + " " + styles.touch__8}></div>
      <div className={styles.touch + " " + styles.touch__9}></div>
      
      <div className={styles.main}>
      <Link href={`/posts/${post.id}`}>
        <div className={styles.icon}>
          
          <img className={styles.img} src={post.image.url} alt="" />
        </div>
        
        
        </Link>
        <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
    <button onClick={handleCommentSubmit}>コメント</button>
    {comments.map((comment, index) => (
      <div key={index}>
        <p>{comment}</p>
        <button onClick={() => handleCommentDelete(index)}>削除</button> {/* Add this button */}
      </div>
    ))}
        
        <span className={styles.account}>OpenAI App / DALL-E3</span>
        <button className={styles.link + " " + styles.text} onClick={() => {
          router.push(`/users/${post.id}`);
        }}>
          {post.title}
        </button>
        <button className={`${styles.starButton} ${isClicked ? styles.starButtonClicked : ''}`} onClick={handleStarClick}>
    {isStarred ? '★' : '☆'} {clickCount} 
  </button>
        <span className={styles.comment + " " + styles.text}>{post.content}</span>
        
        <Link href={`/edit-post/${post.id}`}>
          
          <div className={styles.editButton}>編集</div>
        </Link>
        
  
        <button className={styles.deleteButton} onClick={handleDelete}
        >削除</button>
        
      </div>
      
    </div>
  
  );
}
