import React, { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../services/commentService';

const CommentList = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        const { data } = await getComments();
        setComments(data);
    };

    const handleDelete = async (id) => {
        await deleteComment(id);
        fetchComments();
    };

    return (
        <div>
            <h2>Comment List</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment._id}>
                        {comment.content}
                        <button onClick={() => handleDelete(comment._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
