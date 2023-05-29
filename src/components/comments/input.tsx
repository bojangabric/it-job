import { useState } from 'react';
import { api } from 'utils/api';

export const CommentInput = ({ jobId }: { jobId: string }) => {
  const [comment, setComment] = useState('');
  const utils = api.useContext();

  const { mutate: commentJob } = api.candidate.comment.useMutation({
    onSuccess: () => utils.jobPosts.getById.invalidate(jobId)
  });

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    commentJob({ comment, jobId });
  };

  return (
    <div>
      <form onSubmit={submitForm} className="mt-10">
        <textarea
          className="block w-full rounded-md border border-gray-300 p-3"
          rows={4}
          placeholder="Ostavite komentar..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          required
        />
        <button className="mt-4 rounded-md border border-transparent bg-blue-600 py-3 px-6 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none">
          Komentarisi
        </button>
      </form>
    </div>
  );
};
