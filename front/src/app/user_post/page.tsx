'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function UserPosts() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (session) {
      async function fetchUserPosts() {
        try {
          const response = await axios.get('https://ai-coten.onrender.com/api/v1/posts', {
            headers: {
              'Authorization': `Bearer ${session.accessToken}`
            }
          });
          setPosts(response.data);
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      }

      fetchUserPosts();
    }
  }, [session]);

  if (!session) {
    return <div>Loading or not authenticated...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;