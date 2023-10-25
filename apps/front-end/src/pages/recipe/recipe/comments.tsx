import React from "react";

interface comment {
    commentAuthor: string,
    commentContent: string,
}

interface CommentsProps {
    comments: Array<comment>,
}

const Comments: React.FC<CommentsProps> = (props) => {
    return (
        <div>
          {props.comments.map((comment, index) => (
            <div key={index}>
              <p>Author: {comment.commentAuthor}</p>
              <p>Content: {comment.commentContent}</p>
            </div>
          ))}
        </div>
      );
}

export default Comments
