import { Comment } from '../../types/supabase';
import { supabase } from './supabase';

export const fetchComments = async (pid: string) => {
  try {
    const { data, error } = await supabase.from('comments').select('*').eq('pid', pid);
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

export const insertComment = async (comment: Comment) => {
  try {
    console.log(comment);
    const { error } = await supabase.from('comments').insert([comment]);
    if (error) {
      console.log('Error inserting comment:', error);
      alert('댓글 삽입 중 에러가 발생했습니다.');
    } else {
      alert('댓글이 성공적으로 작성되었습니다.');
    }
  } catch (e) {
    console.log('Error inserting comment:', e);
    alert('알 수 없는 오류가 발생했습니다.');
  }
};
