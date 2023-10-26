import React, { FormEvent, useState } from "react";
import TextareaAutosize from 'react-textarea-autosize';

interface comment {
    commentAuthor: string,
    commentContent: string,
}

interface CommentsProps {
    comments: Array<comment>,
}

const Comments: React.FC<CommentsProps> = (props) => {

  const [comment, setComment] = useState("")
  const [errors, setErrors] = useState({
    comment: '',
  });

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputValue = comment;
    if (!inputValue.trim()) {
      setComment("")
      handleFieldChange('comment', "O campo deve conter ao menos um caracter")
    }
    const hasErrors = Object.values(errors).some((error) => !!error);
  }

  const handleFieldChange = (fieldName: string, msg: string) => {
    if (msg) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: msg,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: '',
      }));
    }
  };


    return (
        <div>
          <form onSubmit={handleSubmit} className="mb-2">
            <TextareaAutosize
                minRows={1}
                maxRows={2}
                name="comment"
                id="comment"
                placeholder="Adiciona um comentario"
                className="block w-full break-words bg-gray-100 rounded-lg outline-none focus:ring-0 ring-orange-400 focus:ring-offset-0 border-2 border-transparent focus:border-orange-400"
                value={comment}
                onChange={(e) => {
                    setComment(e.target.value)
                    handleFieldChange('comment', "")
                }}
                required
              />
              {errors.comment && <p className='text-red-500'>{errors.comment}</p>}
              <button type="submit">enviar</button>
          </form>
          {props.comments.map((comment, index) => (
            <div key={index} className="mb-2 border-b border-solid border-[#e6e6e6]">
              <p className="text-[#2D3748] font-medium text-sm">{comment.commentAuthor}</p>
              <p className="flex-wrap break-words">{comment.commentContent}</p>
            </div>
          ))}
        </div>
      );
}

export default Comments
