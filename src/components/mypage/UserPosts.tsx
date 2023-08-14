import React, { useState, useEffect } from 'react';
import { Post } from '../../types/supabase';
import { supabase } from '../../services/supabase/supabase';
import { useNavigate } from 'react-router-dom';
import noImg from '../../image/noimg.png';
import * as S from './Styled.UserPosts';
import { atom, useAtom } from 'jotai';

export const myPostLegthAtom = atom<number>(0);
export const myIscompletedhAtom = atom<Array<{ iscompleted: string; uid: string }>>([]);

const UserPosts = () => {
  const [postMode, setPostMode] = useState<string>('');
  const [myPostLegth, setMyPostLength] = useAtom(myPostLegthAtom);
  const [myIscompleted, setMyIscomplted] = useAtom(myIscompletedhAtom);

  console.log('myIscompleted', myIscompleted);
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
              .in('pid', jjimPosts)
              .order('pid', { ascending: false });

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
          const { data: myPostsData, error: myPostsError } = await supabase
            .from('posts')
            .select('*')
            .eq('uid', uid)
            .order('pid', { ascending: false });

          if (myPostsError) {
            console.error('Error fetching my posts:', myPostsError);
          } else {
            const postsWithCompleteURLs = myPostsData.map((post) => ({
              ...post,
              image_urls: post.image_urls ? post.image_urls.replace(/\[|\]|"/g, '').split(',') : []
            }));
            setCurrentPage(1);
            setSelectedPosts(postsWithCompleteURLs);
            setMyPostLength(postsWithCompleteURLs.length);
            setMyIscomplted(postsWithCompleteURLs);
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

  console.log('paginatedData', myPostLegth);
  console.log('selectedPosts', selectedPosts);

  const handleClick = (data: Post) => {
    navigate(`/post/${data.pid}`);
  };

  return (
    <div>
      <S.MyWrittenPost onClick={() => handlePost('내가 쓴 글')}>내가 쓴 글</S.MyWrittenPost>
      <S.MyZzimPost onClick={() => handlePost('찜 목록')}>찜 목록</S.MyZzimPost>
      <S.CardContainer>
        {paginatedData.map((data) => (
          <S.CardBox key={data.pid} onClick={() => handleClick(data)}>
            {/* <img src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.profileimg}`} alt="Profile" /> */}
            <S.Card>
              {data.image_urls[0] == '' ? (
                <S.NonImg src={noImg} alt="Profile" />
              ) : (
                <S.PostImg src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}${data.image_urls[0]}`} alt="Profile" />
              )}
              <S.CardInfo>
                <S.CardTop>
                  <S.CategoryBox>
                    <S.Category>{data.category}</S.Category>
                  </S.CategoryBox>
                  <S.CoditionBox>
                    <S.CoditionIscompleted>{data.iscompleted}</S.CoditionIscompleted>
                    <S.CoditionProduct condition={data.condition}>{data.condition}</S.CoditionProduct>
                  </S.CoditionBox>
                </S.CardTop>
                <S.CardMiddle>
                  <S.Title>{data.title}</S.Title>
                </S.CardMiddle>
                <S.CardBottom>
                  <S.Nickname>{data.nickname}</S.Nickname>
                  <S.Price>₩ {data.price?.toLocaleString('en-NZ')} 원</S.Price>
                </S.CardBottom>
              </S.CardInfo>
            </S.Card>
          </S.CardBox>
        ))}
      </S.CardContainer>
      <S.PageButtonBox>
        <S.PageButton onClick={handlePreviousPage} disabled={currentPage === 1} selected={false}>
          {'<'}
        </S.PageButton>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <S.PageButton
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            selected={pageNumber === currentPage}
            disabled={currentPage === pageNumber}
          >
            {pageNumber}
          </S.PageButton>
        ))}
        <S.PageButton onClick={handleNextPage} disabled={currentPage === totalPages} selected={false}>
          {'>'}
        </S.PageButton>
      </S.PageButtonBox>
    </div>
  );
};

export default UserPosts;
