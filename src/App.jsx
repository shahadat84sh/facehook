import { Route, Routes } from "react-router-dom"
import HomePage from "../src/Pages/HomePage"
import LoginPage from "../src/Pages/LoginPage"
import NotFoundPage from "../src/Pages/NotFoundPage"
import ProfilePage from "../src/Pages/ProfilePage"
import RegisterPage from "../src/Pages/RegisterPage"
import PrivateRoute from "./routes/PrivateRoute"





export default function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/me" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
