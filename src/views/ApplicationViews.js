import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { CategoryList } from "../components/categories/CategoryList"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path="/categories" element={<CategoryList />} />
        {/* Add Routes here */}
        
      </Route>
    </Routes>
  </>
}
