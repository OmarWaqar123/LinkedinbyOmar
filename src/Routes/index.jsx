import {createBrowserRouter} from "react-router-dom"
import LoginPage from "../Pages/Login"
import Register from "../Pages/Register"
import HomeLayout from "../layouts/HomeLayout"
import ProfileLayout from "../layouts/ProfileLayout"
import ConnectionsLayout from "../layouts/ConnectionLayout"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element:<Register/>
    },{
      path: "/home",
      element:<HomeLayout/>
    },
    {
      path: "/profile",
      element: <ProfileLayout/>
    },
    {
      path: "/connections",
      element: <ConnectionsLayout/>
    }
  ]);