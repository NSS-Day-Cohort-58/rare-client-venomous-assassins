import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { UserList } from "../components/users/UserList"
import { Authorized } from "./Authorized"
import { Posts } from "../components/posts/Posts"
import { TagList } from "../tags/TagList"
import { CategoryList } from "../components/categories/CategoryList"
import { PostForm } from "../components/posts/postForm"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/tags" element={<TagList />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/register" element={<Register setToken={setToken} />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/users" element={<UserList setToken={setToken} />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/postForm" element={<PostForm />} />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}

      </Route>
    </Routes>
  </>
}
