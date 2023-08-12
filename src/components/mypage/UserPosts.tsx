import React, { useState, useEffect } from 'react';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { useNavigate } from 'react-router-dom';
import * as S from './Styled.UserPosts';

const UserPosts = () => {
  const [postMode, setPostMode] = useState<string>('');

  const handlePost = (mode: string) => {
    setPostMode(mode);
  };

  const [uid, setUid] = useState<string | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);

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
    const fetchData = async () => {
      if (uid) {
        if (postMode == '찜 목록') {
          const { data: jjimData, error: jjimError } = await supabase.from('jjim').select('pid').eq('uid', uid);

          if (jjimError) {
            console.error('Error fetching jjim:', jjimError);
          } else {
            const jjimPosts = jjimData.map((jjim) => jjim.pid);

            const { data: jjimPostsData, error: jjimPostsError } = await supabase
              .from('posts')
              .select('*')
              .in('pid', jjimPosts);

            if (jjimPostsError) {
              console.error('Error fetching jjim posts:', jjimPostsError);
            } else {
              const postsWithCompleteURLs = jjimPostsData.map((post) => ({
                ...post,
                image_urls: post.image_urls ? post.image_urls.replace(/\[|\]|"/g, '').split(',') : []
              }));
              setCurrentPage(1);
              setSelectedPosts(postsWithCompleteURLs);
            }
          }
        } else if (postMode == '내가 쓴 글' || !postMode) {
          const { data: myPostsData, error: myPostsError } = await supabase.from('posts').select('*').eq('uid', uid);

          if (myPostsError) {
            console.error('Error fetching my posts:', myPostsError);
          } else {
            const postsWithCompleteURLs = myPostsData.map((post) => ({
              ...post,
              image_urls: post.image_urls ? post.image_urls.replace(/\[|\]|"/g, '').split(',') : []
            }));
            setCurrentPage(1);
            setSelectedPosts(postsWithCompleteURLs);
          }
        }
      }
    };

    fetchData();
  }, [uid, postMode]);

  const pagePerObjects = 4; // 페이지 당 데이터 수

  const totalCount = selectedPosts.length;
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
  const paginatedData = selectedPosts.slice(startIdx, endIdx);

  const handleClick = (data: Post) => {
    navigate(`/post/${data.pid}`);
  };

  return (
    <div>
      <S.MyWrittenPost onClick={() => handlePost('내가 쓴 글')}>내가 쓴 글</S.MyWrittenPost>
      <S.MyZzimPost onClick={() => handlePost('찜 목록')}>찜 목록</S.MyZzimPost>
      <div style={{ width: '1100px', height: '600px', border: '2px solid black' }}>
        <div>
          <S.Card>
            {paginatedData.map((data) => (
              <S.StyledCard key={data.pid} onClick={() => handleClick(data)}>
                <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.profileimg}`} alt="Profile" />
                <p>{data.nickname}</p>
                <p>제목: {data.title}</p>
                <p>카테고리: {data.category}</p>
                <p>가격: {data.price}</p>
              </S.StyledCard>
            ))}
          </S.Card>
        </div>
      </div>
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
  );
};

export default UserPosts;
