'use client';

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import styles from "../../../styles/MyComponent.module.css";
import { useRouter } from 'next/navigation'; // 'next/navigation' を 'next/router' に変更
import { Post } from "../../types";

const EditPost = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (router.query && router.query.id) {
        const id = router.query.id;
      fetch(`https://ai-coten.onrender.com/api/v1/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setTitle(data.title);
          setContent(data.content);
        })
        .catch((error) => console.error(error));
    }
  }, [router.query]);

  const handleSubmit = async (e: FormEvent) => {
    console.log("handleSubmit is running");
    e.preventDefault();

    if (post) {
      try {
        await axios.put(`https://ai-coten.onrender.com/api/v1/posts/${post.id}`, {
          post: {
            title: title,
            content: content,
          }
        });

        router.push("/home");
        setTitle("");  // タイトルをクリア
        setContent("");  // コンテンツをクリア
      } catch (err) {
        console.error(err); // ここでエラーをログ出力
        alert("編集に失敗しました");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>タイトル</label>
        <input 
          type="text" 
          className={styles.input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          value={title}
        />
        <label className={styles.label}>本文</label>
        <textarea 
          className={styles.textarea}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
          value={content}
        />
        <button type="submit" className={styles.button}>編集</button>
      </form>
    </div>
  );
}

export default EditPost;