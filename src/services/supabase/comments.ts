import { CommentType } from '../../types/supabase';
import { supabase } from './supabase';

export const fetchComments = async (pid: string) => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: true })
      .eq('pid', pid);
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

export const addComment = async (comment: Omit<CommentType, 'cid'>) => {
  try {
    const { error } = await supabase.from('comments').insert([comment]);
    if (error) {
      console.log('Error inserting comment:', error);
      alert('댓글 작성 중 에러가 발생했습니다.');
    } else {
      alert('댓글이 성공적으로 작성되었습니다.');
    }
  } catch (e) {
    console.log('Error inserting comment:', e);
    alert('알 수 없는 오류가 발생했습니다.');
  }
};

export const updateComment = async (comment: Pick<CommentType, 'cid' | 'body'>) => {
  try {
    const { error } = await supabase.from('comments').update({ body: comment.body }).eq('cid', comment.cid);
    if (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};

// isDeleted로 변경할까?
export const deleteComment = async (cid: number) => {
  try {
    const { error } = await supabase.from('comments').delete().eq('cid', cid);
    if (error) {
      console.log('Error deleting comment' + error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    } else {
      alert('삭제가 완료되었습니다.');
    }
  } catch (e) {
    console.log('Error deleting comment');
    alert('댓글 삭제 중 오류가 발생했습니다.');
  }
};
