export type postType = {
  page: number;
  contents: string;
};
export const getPostList = (page: number): postType[] => {
  return PostList.filter((post: postType) => post.page === page);
};

export const PostList: postType[] = [
  {
    page: 1,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 1,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 1,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 2,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 2,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 2,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 3,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 3,
    contents: '무한 스크롤 테스트 글'
  },
  {
    page: 3,
    contents: '무한 스크롤 테스트 글'
  }
];
