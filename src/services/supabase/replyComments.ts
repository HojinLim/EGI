import { ReplyCommentType } from '../../types/supabase';
import { supabase } from './supabase';

export const fetchReplyComments = async (pid: string) => {
  try {
    const { data, error } = await supabase
      .from('replycomments')
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

export const addReplyComment = async (comment: Omit<ReplyCommentType, 'rid'>) => {
  try {
    const { error } = await supabase.from('replycomments').insert([comment]);
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

export const updateReplyComment = async (comment: Pick<ReplyCommentType, 'rid' | 'body'>) => {
  try {
    const { error } = await supabase.from('replycomments').update({ body: comment.body }).eq('rid', comment.rid);
    if (error) {
      console.log('Error update reply' + error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.log('Error update reply' + error);
    alert('댓글 수정 중 오류가 발생했습니다.');
  }
};

// isDeleted로 변경할까?
export const deleteReplyComment = async (rid: number) => {
  console.log(rid);
  try {
    const { error } = await supabase.from('replycomments').delete().eq('rid', rid);
    if (error) {
      console.log('Error deleting reply' + error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    } else {
      alert('삭제가 완료되었습니다.');
    }
  } catch (e) {
    console.log('Error deleting reply');
    alert('댓글 삭제 중 오류가 발생했습니다.');
  }
};
