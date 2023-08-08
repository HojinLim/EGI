import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface UserType {
  uid: string;
  email: string;
  password: string;
  nickname: string;
  profileImg: string;
}

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

export const signUpService = async (userData: UserType) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password
    });
    if (error) {
      throw new Error(error.message);
    }

    const userInsertData = {
      uid: data.user?.id,
      nickname: userData.nickname,
      profileImg: userData.profileImg
    };

    const { error: insertError } = await supabase.from('user').insert(userInsertData);
    if (insertError) {
      throw new Error(insertError.message);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
