import { User } from '@supabase/supabase-js';
import { atom, useAtom } from 'jotai';
import React from 'react';
import { supabase } from '../../../services/supabase/supabase';
import GitHub from '../../../image/GitHub.png';
import Google from '../../../image/Google.png';
import * as S from './Styled.SosialLogin';

export const sosialUserAtom = atom<User | null>(null);
const SosialLogin = () => {
  const [user, setUser] = useAtom(sosialUserAtom);

  // 구글 소셜 회원가입 핸들러
  const loginWithGoogle = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google'
      });

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  // 깃허브 소셜 회원가입 핸들러
  const loginWithGithub = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github'
      });

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.LogoContainer>
      <p>소셜로 로그인하기</p>
      <div>
        <S.GitHubBtn onClick={loginWithGithub}>
          <S.GitHubLogo src={GitHub} />
        </S.GitHubBtn>
        <S.GoogleBtn onClick={loginWithGoogle}>
          <S.GoogleLogo src={Google} />
        </S.GoogleBtn>
      </div>
    </S.LogoContainer>
  );
};

export default SosialLogin;
