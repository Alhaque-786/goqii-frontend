import React from "react";
import { Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import Layout from "./components/Layout";
import UserList from "./components/users/UserList";
import UserForm from "./components/users/UserForm";
import UserEditForm from "./components/users/UserEditForm";
import PostList from "./components/posts/PostList";
import PostForm from "./components/posts/PostForm";
import PostEditForm from "./components/posts/PostEditForm";
import CommentList from "./components/comments/CommentList";
import CommentForm from "./components/comments/CommentForm";
import CommentEditForm from "./components/comments/CommentEditForm";

function App() {
  return (
    <>
      <Layout />
      <Container style={{ marginTop: "20px" }}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/edit/:id" element={<UserEditForm />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/edit/:id" element={<PostEditForm />} />
          <Route path="/comments" element={<CommentList />} />
          <Route path="/comments/new" element={<CommentForm />} />
          <Route path="/comments/edit/:id" element={<CommentEditForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
