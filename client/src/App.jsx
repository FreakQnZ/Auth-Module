import Navbar from "./components/navbar"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
