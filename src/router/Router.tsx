import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
    {
        path: "/",
        element:
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    }
]);