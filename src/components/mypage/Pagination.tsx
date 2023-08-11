import React, { useState, useEffect } from 'react';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { useNavigate } from 'react-router-dom';
import * as S from './Styled.Pagination';

const Pagination = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [uid, setUid] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = localStorage.getItem('jotaiUserData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUid(parsedUserData.uid);
      }
    };

    fetchUserData();
  }, []);

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

  const filteredPosts = posts.filter((post) => post.uid === uid);

  const pagePerObjects = 5; // 페이지 당 데이터 수

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

  const handleClick = (data: Post) => {
    navigate(`/post/${data.pid}`);
  };

  return (
    <>
      <div>
        <S.Card>
          {paginatedData.map((data) => (
            <S.StyledCard key={data.pid} onClick={() => handleClick(data)}>
              <p>제목: {data.title}</p>
              <p>카테고리: {data.category}</p>
              <p>가격: {data.price}</p>
            </S.StyledCard>
          ))}
        </S.Card>
        <div>
          <S.StyledButton onClick={handlePreviousPage} disabled={currentPage === 1} selected={false}>
            ⬅
          </S.StyledButton>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <S.StyledButton
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              selected={pageNumber === currentPage}
              disabled={currentPage === pageNumber}
            >
              {pageNumber}
            </S.StyledButton>
          ))}
          <S.StyledButton onClick={handleNextPage} disabled={currentPage === totalPages} selected={false}>
            ➡
          </S.StyledButton>
        </div>
      </div>
    </>
  );
};

export default Pagination;
