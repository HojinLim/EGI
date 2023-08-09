import { supabase } from './supabase';

export const fetchComments = async () => {
  try {
    const { data, error } = await supabase.from('comments').select('*');
    if (error) {
      console.log('Error fetching comments:', error);
      alert('에러가 발생했습니다.' + error);
      return [];
    }
    return data;
  } catch (e) {
    console.log(e);
    alert('알 수 없는 오류가 발생했습니다.');
    return [];
  }
};
