'use client';

import { Post } from "../../types";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../../styles/Post.module.css"

type Props = {
    post: Post;
    handleDelete: () => Promise<void>;
    handleEdit: () => void;
};

const Post = ({ post: initialPost, handleDelete, handleEdit }: Props) => {
    const router = useRouter()
    const [post, setPost] = useState(initialPost);

    useEffect(() => {
        const fetchPost = async () => {
            if (router.query.id) {
                const res = await fetch(`https://ai-coten.onrender.com/api/v1/posts/${router.query.id}`);
                const post: Post = await res.json();
                setPost(post);
            }
        };
    
        if (router.isReady) { // router.isReadyがtrueになると、クエリパラメータが利用可能になります
            fetchPost();
        }
    }, [router.isReady, router.query]); // initialPostは削除しています

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className={styles.title}>{post.title}</div>
            <img src={post.image} alt={post.title} />
            <p className={styles.content}>{post.content}</p>
        </div>
    );
};

export default Post;