import React from 'react';
import { useAtom } from 'jotai';
import { atom } from 'jotai';

import * as S from './Styled.Search';

export const searchKeywordAtom = atom<string>('');

const Search = () => {
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleSearchInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchKeyword(e.currentTarget.value);
    }
  };

  return (
    <div>
      <S.Input
        type="text"
        value={searchKeyword as string}
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchInputKeyDown}
        placeholder="검색"
      />
    </div>
  );
};

export default Search;
