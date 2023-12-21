import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';  // axios をインポート
import styles from "../styles/MyComponent.module.css";
import { useRouter } from 'next/router';


const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('post[title]', title);
        formData.append('post[content]', content);
        if (image) {
            formData.append('post[image]', image);
        }

        try {
            await axios.post("https://ai-coten.onrender.com/api/v1/posts", formData);

            router.push("/home");
            setTitle("");
            setContent("");
            setImage(null);
        } catch (err) {
            console.error(err);
            alert("投稿に失敗しました");
        }
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files[0]);
        }
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>AI絵登録</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>タイトル</label>
                <input 
                    type="text" 
                    className={styles.input} 
                    value={title}  // value を設定
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} 
                />
                <label className={styles.label}>本文</label>
                <textarea 
                    className={styles.textarea} 
                    value={content}  // value を設定
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)} 
                />
                <label className={styles.label}>画像</label>
                <input 
                    type="file" 
                    className={styles.input} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files) {
                            setImage(e.target.files[0]);
                        }
                    }} 
                />
                <button type="submit" className={styles.button}>投稿</button>
            </form>
        </div>
    );
}

export default CreatePost;
