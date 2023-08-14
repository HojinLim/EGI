import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAtom } from 'jotai';
import { atom } from 'jotai';

import * as S from './Styled.Main';
import * as CONDITION from '../mypage/Styled.UserPosts';
import * as PAGINATION from '../mypage/Styled.UserPosts';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { filterdcategories } from '../category/Category';
import { searchKeywordAtom } from '../common/search/Search';
import { getIconComponet } from './MuiBtn';
import { useQuery } from '@tanstack/react-query';
import { fetchAllJjim } from '../../services/supabase/jjim';

// MUI- Material Icons

import Button from '@mui/material/Button';
import { LikeFilled } from '@ant-design/icons';

export const usersAtom = atom<Array<{ nickname: string; email: string }>>([]);

export const Main = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchKeyword] = useAtom(searchKeywordAtom);

  const { data: jjimData } = useQuery(['jjim'], fetchAllJjim);

  const jjimCount = (pid: number) => {
    return jjimData?.filter((jjim) => jjim.pid == pid).length;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('pid', { ascending: false });

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
      setCurrentPage(1);
    }
  };

  useEffect(() => {
    const handleSearch = () => {
      if (searchKeyword.trim() === '' || searchKeyword === '') {
        setFilteredPosts(posts);
      } else {
        const keywordLower = searchKeyword.toLowerCase();
        const filtered = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(keywordLower) || post.location.toLowerCase().includes(keywordLower)
        );
        setFilteredPosts(filtered);
        setCurrentPage(1);
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
  }, [searchKeyword]);

  const categoryButtons = filterdcategories.map((category) => {
    const IconComponent = getIconComponet(category.value); // 이 부분에 오타 수정
    return (
      <Button
        style={{ padding: '20px', fontSize: '18px', border: '2px solid #0a3a8d;' }}
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

  const pagePerObjects = 8;

  const totalCount = filteredPosts.length;
  const totalPages = Math.ceil(totalCount / pagePerObjects);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIdx = (currentPage - 1) * pagePerObjects;
  const endIdx = Math.min(startIdx + pagePerObjects, totalCount);
  const paginatedData = filteredPosts.slice(startIdx, endIdx);

  return (
    <>
      <S.ButtonGrid>{categoryButtons}</S.ButtonGrid>

      <S.PostContainer>
        {paginatedData.map((post) => (
          <NavLink to={`/post/${post.pid}`} key={post.pid} style={{ textDecoration: 'none', color: 'inherit' }}>
            <S.PostItem>
              <S.ImageContainer>
                {post.image_urls.length > 0 && (
                  <S.Image
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${post.image_urls[0]} `}
                    alt={post.title}
                  />
                )}
              </S.ImageContainer>

              <S.CardCategory>
                <div>{post.category}</div>
                <div>{post.created_at.substr(0, 10)}</div>
              </S.CardCategory>

              <S.CardTitle>
                <h2>{post.title}</h2>
              </S.CardTitle>

              <S.CardLocation>{post.location}</S.CardLocation>
              <S.CardPrice>₩ {post.price?.toLocaleString('en-NZ')}원</S.CardPrice>

              <S.CardCondition>
                <div>
                  <LikeFilled style={{ color: '#0A3A8D', marginRight: '5px' }} />
                  {jjimCount(post.pid)}
                </div>
                <CONDITION.CoditionBox>
                  <CONDITION.CoditionIscompleted>{post.iscompleted}</CONDITION.CoditionIscompleted>
                  <CONDITION.CoditionProduct condition={post.condition}>{post.condition}</CONDITION.CoditionProduct>
                </CONDITION.CoditionBox>
              </S.CardCondition>
            </S.PostItem>
          </NavLink>
        ))}
      </S.PostContainer>

      <PAGINATION.PageButtonBox>
        <PAGINATION.PageButton onClick={handlePreviousPage} disabled={currentPage === 1} selected={false}>
          {'<'}
        </PAGINATION.PageButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <PAGINATION.PageButton
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            selected={pageNumber === currentPage}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </PAGINATION.PageButton>
        ))}
        <PAGINATION.PageButton onClick={handleNextPage} disabled={currentPage === totalPages} selected={false}>
          {'>'}
        </PAGINATION.PageButton>
      </PAGINATION.PageButtonBox>
    </>
  );
};

export default Main;
