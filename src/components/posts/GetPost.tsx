import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import * as S from './Styled.GetPosts';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { categories } from '../category/Category';


import Button from '@mui/material/Button';
import WatchIcon from '@mui/icons-material/Watch';
import LaptopIcon from '@mui/icons-material/Laptop';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import MonitorIcon from '@mui/icons-material/Monitor';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import CableIcon from '@mui/icons-material/Cable';

export const GetPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);

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
  // category 값에 따른 MUI 아이콘을 가져옵니다.
  const getIconComponet = (value: string) => {
    switch (value) {
      case '컴퓨터':
        return DesktopMacIcon;
      case '노트북':
        return LaptopIcon;
      case '모니터':
        return MonitorIcon;
      case '핸드폰':
        return PhoneAndroidIcon;
      case '웨어러블': //
        return WatchIcon;
      case '콘솔':
        return VideogameAssetIcon;
      case '주변기기':
        return CableIcon;
      default:
        return QuestionMarkIcon;
    }
  };

  const categoryButtons = categories.map((category) => {
    const IconComponent = getIconComponet(category.value); // 이 부분에 오타 수정
    return (
      <Button
        key={category.value}
        value={category.value}
        onClick={() => handleCategoryClick(category.value)}
        variant="outlined"
        startIcon={<IconComponent />}
      >
        {category.label}
      </Button>
    );
  });

  return (
    <>
      <S.ButtonGrid>{categoryButtons}</S.ButtonGrid>
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




