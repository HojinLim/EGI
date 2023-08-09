import { UserType } from '../../types/supabase';
import { supabase } from './supabase';

// 회원가입
export const signUpService = async (userData: UserType) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    });

    if (error) {
      throw new Error(error.message);
    }

    let profileImgUrl = '';

    if (userData.profileImg) {
      const profileImgFile = new File([userData.profileImg], profileImgUrl);

      profileImgUrl = await uploadProfileImage(profileImgFile);
    }

    const userInsertData = {
      uid: data.user?.id,
      nickname: userData.nickname,
      profileImg: profileImgUrl,
      email: userData.email
    };

    const { error: insertError } = await supabase.from('users').insert(userInsertData);
    if (insertError) {
      throw new Error(insertError.message);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 로그아웃
export const sigOutService = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// 로그인
export const loginService = async (userData: Omit<UserType, 'nickname' | 'profileImg'>) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// 유저 정보 조회
export const getUserInfo = async (email: string): Promise<Omit<UserType[], 'email' | 'password'>> => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// 비밀번호 찾기
export const resetPassword = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    console.log(data);
    if (!error) {
      alert('Please check your email');
    }
  } catch (error) {
    console.error(error);
  }
};

export const uploadProfileImage = async (profileImgFile: File) => {
  try {
    const { data, error } = await supabase.storage.from('1st').upload(`images/${profileImgFile.name}`, profileImgFile);

    if (error) {
      throw new Error(error.message);
    }

    const imageUrl = data.path;
    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
