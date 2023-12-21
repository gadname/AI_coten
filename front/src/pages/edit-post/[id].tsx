import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';  // axios をインポート
import styles from "../../styles/MyComponent.module.css";
import { useRouter } from 'next/router';
import { Post } from "@/types";

type Props = {
    post: Post;
};

export async function getServerSideProps(context: any) {
    const id = context.params.id;

    const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`);
    const post = await res.json(); //json = JavaScriptのオブジェクト記法を用いたデータ交換フォーマット 

    return {
        props: {
            post,
        },
    };
}

const EditPost = ({ post }: Props) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`, { //axiosでリクエストを送信できるidが必要
                post: {
                    title: title,
                    content: content,
                }
        })
        
        router.push("/home");
        // ユーザーに成功を通知
            setTitle("");  // タイトルをクリア
            setContent("");  // コンテンツをクリア
        } catch (err) {
            alert("編集に失敗しました");
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
                      // value を設定
                    onChange={(e: ChangeEvent<HTMLInputElement>) => 
                        setTitle(e.target.value)
                    } 
                    value={title}
                />
                <label className={styles.label}>本文</label>
                <textarea 
                    className={styles.textarea} 
                      // value を設定
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => 
                        setContent(e.target.value)}
                        value={content}
                />
                <button type="submit" className={styles.button}>編集</button>
            </form>
        </div>
    );
}

export default EditPost;