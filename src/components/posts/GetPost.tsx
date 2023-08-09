import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';

const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const postsWithCompleteURLs = data.map((post) => ({
          ...post,
          image_url: `https://bbakvkybkyfoiijevbec.supabase.co/storage/v1/object/public/1st/${post.image_url}`
        }));

        setPosts(postsWithCompleteURLs);
      }
    }
  
    fetchPosts();
  }, []);

  return (
    <PostContainer>
      {posts.map((post) => (
        
        <NavLink to={`/post/${post.pid}`} key={post.pid} style={{ textDecoration: 'none', color: 'inherit' }}>
          <PostItem>
            <h2>{post.title}</h2>
            <div>
              <img src={post.image_url} alt={post.title} />
            </div>
          </PostItem>
        </NavLink>
      ))}
    </PostContainer>
  );
};

export default GetPost;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  width: 150px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;
