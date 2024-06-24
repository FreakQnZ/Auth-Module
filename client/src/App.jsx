import Navbar from "./components/navbar"
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login"
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <><Navbar /><Home /></> },
    { path: "/login", element: <><Navbar /><Login /></> },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
