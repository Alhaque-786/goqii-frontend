import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';

const App = () => {
    // Replace these with actual IDs from your backend
    const userId = 'user_id_example';
    const postId = 'post_id_example';

    return (
        <div className="App">
            <h1>GOQii Full Stack Test</h1>
            <UserForm />
            <UserList />
            <PostForm userId={userId} />
            <PostList />
            <CommentForm userId={userId} postId={postId} />
            <CommentList />
        </div>
    );
};

export default App;
