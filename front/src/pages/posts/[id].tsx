import { Post } from "../../types";
import React from 'react';
import { useRouter } from 'next/router';
import styles from "../../styles/Post.module.css"


type Props = {
    post: Post;
};

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts`);
    const posts: Post[] = await res.json();

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },  // ID を文字列に変換
    }));

    return { paths, fallback: false };  // 未知の ID には 404 ページを表示
}


export async function getStaticProps({params}: {params: { id: string }}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/posts${params.id}`);
    const post: Post[] = await res.json();

    return {
    props: {
        post,
      },
      revalidate: 60 * 60 * 24, // 1 day
    };
  }

const Post = ({ post }: Props) => {
    const router = useRouter()

    if(router.isFallback){
        return<div>Loading...</div>;
    }
  return (
    <div>
        <div className={styles.title}>{post.title}</div>
        <img src={post.image} alt={post.title} />
        <p className={styles.content}>{post.content}</p>
    </div>
  )
}

export default Post;