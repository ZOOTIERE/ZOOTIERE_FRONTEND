import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AppLayout } from "../Layout/App/AppLayout";
import { Finca } from "../pages/Finca/Finca";
import { Vacas } from "../pages/Vacas/Vacas";
import { Crias } from "../pages/Crias/Crias";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/fincas"} /> 
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/fincas",
        element: <AppLayout><Finca/></AppLayout>
    },
    {
        path: "/fincas/:id"
    },
    {
        path: "/vacas",
        element: <AppLayout><Vacas/></AppLayout>
    },
    {
        path: "/vacas/:id"
    },
    {
        path: "/crias",
        element: <AppLayout><Crias/></AppLayout>
    },
    {
        path: "/crias/:id"
    }

]);