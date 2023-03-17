import React from "react";
import PropTypes from "prop-types";

import contextualTime from "../../helpers/contextualTime";
import ProfilePicture from "../profilePicture/ProfilePicture";

const Comment = ({ comment }) => {
  const formatDate = () => {
    const date = new Date(comment.createdAt);
    const formattedDate = contextualTime(date);
    return <p className="text-sm text-gray-500">{formattedDate}</p>;
  };

  return (
    <div
      data-cy="comment"
      className="flex flex-col rounded-md border border-gray-200 p-4 transition-all hover:bg-gray-100"
    >
      <div className="flex items-center gap-4">
        <ProfilePicture
          className="h-10 w-10"
          publicId={comment.authorImageId}
        />
        <div>
          <p className="text-lg font-semibold capitalize">
            {comment.authorName}
          </p>
          {formatDate()}
        </div>
      </div>
      <div className="mx-2 p-2 text-base">{comment.message}</div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    createdAt: PropTypes.string,
    authorName: PropTypes.string.isRequired,
    authorImageId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
