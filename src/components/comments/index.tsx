import { type Comment as CommentPrisma } from '@prisma/client';
import { CommentInput } from './input';
import { useSession } from 'next-auth/react';

type Comment = CommentPrisma & {
  writtenBy: {
    name: string | null;
    image: string;
  };
};

export const Comments = ({
  comments,
  jobId
}: {
  comments: Comment[];
  jobId: string;
}) => {
  const { data } = useSession();

  return (
    <div className="mt-10 space-y-6">
      {comments.map(comment => (
        <div key={comment.id} className="space-y-6 rounded-md bg-gray-100 p-8">
          <div className="flex items-center space-x-4">
            <img
              className="h-12 w-12 rounded-full"
              src={comment.writtenBy.image}
            />
            <span className="text-xl font-semibold">
              {comment.writtenBy.name}
            </span>
          </div>
          <div>{comment.comment}</div>
        </div>
      ))}
      {data && <CommentInput jobId={jobId} />}
    </div>
  );
};