import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as S from './Styled.Posts';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';

const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  


  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        const postsWithCompleteURLs = data.map((post) => ({
          ...post,
          image_urls: post.image_urls ? post.image_urls.replace(/\[|\]|"/g, '').split(',') : []
        }));

        setPosts(postsWithCompleteURLs);
      }
    };

    fetchPosts();
  }, []);

  return (
    <S.PostContainer>
      {posts.map((post) => (
        <NavLink to={`/post/${post.pid}`} key={post.pid} style={{ textDecoration: 'none', color: 'inherit' }}>
          <S.PostItem>
            <h2>{post.title}</h2>
            <div>
              {post.image_urls.length > 0 && (
                <S.Image src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.image_urls[0]} ` } alt={post.title}/>
              )}
            </div>
          </S.PostItem>
        </NavLink>
      ))}
    </S.PostContainer>
  );
};

export default GetPost;
