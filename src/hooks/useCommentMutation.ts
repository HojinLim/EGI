import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, updateComment } from '../services/supabase/comments';

const useCommentMutation = () => {
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
    onError: (error) => {
      alert(`댓글 작성 중 오류가 발생했습니다.: ${error}`);
    }
  });

  const updateCommentMutation = useMutation(updateComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
    onError: (error) => {
      alert(`댓글 수정 중 오류가 발생했습니다.: ${error}`);
    }
  });

  const deleteCommentMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['comments']);
    },
    onError: (error) => {
      alert(`댓글 삭제 중 오류가 발생했습니다.: ${error}`);
    }
  });

  return {
    addCommentMutation,
    deleteCommentMutation,
    updateCommentMutation
  };
};

export default useCommentMutation;
