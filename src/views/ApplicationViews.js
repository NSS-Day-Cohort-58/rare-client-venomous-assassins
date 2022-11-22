import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { UserList } from "../components/users/UserList"
import { Authorized } from "./Authorized"
import { Posts } from "../components/posts/Posts"
import { CategoryList } from "../components/categories/CategoryList"
import { TagList } from "../tags/TagList"
import { MyPosts } from "../components/posts/MyPosts"
import { TagManager } from "../tags/TagManager"
import { HomePosts } from "../components/posts/HomePosts"
import { EditPost } from "../components/posts/EditPost"
import { PostForm } from "../components/posts/postForm"
import { PostDetails } from "../components/posts/postDetails"
import { UserDetail } from "../components/users/UserDetail"
import { Comments } from "../components/posts/postComments"
import { AddComment } from "../components/posts/postAddComment"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route element={<Authorized token={token} />}> 
        <Route path="/" element={<HomePosts />} />
        <Route path="/tags" element={<TagManager />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<UserList setToken={setToken} />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/my_posts" element={<MyPosts />} />
        <Route path="/edit_post/:postId" element={<EditPost />} />
        <Route path="/postForm" element={<PostForm />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/comments/:postId" element={<Comments />} />
        <Route path="/addComment/:postId" element={<AddComment />} />

        <Route path="/users/:userId" element={<UserDetail />} />

        {/* Add Routes here */}

      </Route>
    </Routes>
  </>
}
