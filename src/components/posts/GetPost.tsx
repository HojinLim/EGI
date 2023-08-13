import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';

import * as S from './Styled.GetPosts';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { filterdcategories } from '../category/Category';
import { searchKeywordAtom } from '../common/Search';

export const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchKeyword] = useAtom(searchKeywordAtom);

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
        setFilteredPosts(postsWithCompleteURLs);
      }
    };
    console.log('과연 서버사이드?');
    fetchPosts();
  }, []);

  const handleCategoryClick = (category: string) => {
    if (category === '전체') {
      setFilteredPosts(posts);
    } else {
      const filteredPosts = posts.filter((post) => post.category === category);
      setFilteredPosts(filteredPosts);
    }
  };

  useEffect(() => {
    const handleSearch = () => {
      if (searchKeyword.trim() === '' || searchKeyword === '') {
        setFilteredPosts(posts);
      } else {
        const keywordLower = searchKeyword.toLowerCase();
        const filtered = posts.filter((post) => post.title.toLowerCase().includes(keywordLower));
        setFilteredPosts(filtered);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [searchKeyword, posts]);

  const categoryButtons = filterdcategories.map((category) => (
    <S.CategoryButton key={category.value} value={category.value} onClick={() => handleCategoryClick(category.value)}>
      {category.label}
    </S.CategoryButton>
  ));

  return (
    <>
      <S.CategoryButtonContainer>{categoryButtons}</S.CategoryButtonContainer>

      <S.PostContainer>
        {filteredPosts.map((post) => (
          <NavLink to={`/post/${post.pid}`} key={post.pid} style={{ textDecoration: 'none', color: 'inherit' }}>
            <S.PostItem>
              <h2>{post.title}</h2>
              <div>
                {post.image_urls.length > 0 && (
                  <S.Image
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.image_urls[0]} `}
                    alt={post.title}
                  />
                )}
              </div>
            </S.PostItem>
          </NavLink>
        ))}
      </S.PostContainer>
    </>
  );
};

export default GetPost;
