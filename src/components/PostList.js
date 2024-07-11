import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from '../services/postService';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const { data } = await getPosts();
        setPosts(data);
    };

    const handleDelete = async (id) => {
        await deletePost(id);
        fetchPosts();
    };

    return (
        <div>
            <h2>Post List</h2>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        {post.title} - {post.content}
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
