import React, { useState } from 'react';
import { createComment } from '../services/commentService';

const CommentForm = ({ userId, postId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = { content, author: userId, post: postId };
        await createComment(comment);
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <button type="submit">Add Comment</button>
        </form>
    );
};

export default CommentForm;
