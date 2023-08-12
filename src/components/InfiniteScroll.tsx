import React, { useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import { Container } from './posts/Styled.Posts';
import { getPostList, postType } from './ScrollDummy';

const InfiniteScroll = (): JSX.Element => {
  const [page, setPage] = useState<number>(1);
  const [posts, setPosts] = useState<postType[]>(getPostList(1));

  //더미데이터의 정보값 가져오기
  const [postEnd, setPostEnd] = useState<boolean>(false);

  const handleScroll = useCallback((): void => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const { scrollTop } = document.documentElement;
    if (Math.round(scrollTop + innerHeight) >= scrollHeight) {
      const newPosts = getPostList(page + 1);
      if (newPosts.length === 0) {
        setPostEnd(true);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Container>
      {posts.map((post: postType, idx: number) => (
        <PostItem key={idx}>{post.contents}</PostItem>
      ))}
      {/* 더미데이터 값 뿌려주기 */}
      {postEnd && <EndMassage>더 이상의 게시물이 없습니다.</EndMassage>}
    </Container>
  );
};

const PostItem = styled.div`
  width: 100%;
  height: 350px;
  border: 2px solid black;
`;
const EndMassage = styled.div`
  text-align: center;
  padding: 10px;
  color: gray;
`;
export default InfiniteScroll;
