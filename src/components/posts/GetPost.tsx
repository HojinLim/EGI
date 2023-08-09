import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

interface Post {
  pid: number;
  title: string;
  body: string;
}

const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setPosts(data);

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
          </PostItem>
        </NavLink>
      ))}
    </PostContainer>
  );
};

export default GetPost;

const PostContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 한 줄에 5개씩 */
  gap: 10px;
`;

const PostItem = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  width: 150px; /* 고정된 너비 */
  height: 300px; /* 고정된 높이 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden; /* 넘치는 부분을 숨김 */

  h2 {
    margin: 0;
    font-size: 16px;
  }

  div {
    flex-grow: 1;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 콘텐츠 박스에 가득 채움 */
  }
`;
