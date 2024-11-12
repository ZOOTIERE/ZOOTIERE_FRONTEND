import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AppLayout } from "../Layout/App/AppLayout";
import { Finca } from "../pages/Finca/Finca";
import { Vacas } from "../pages/Vacas/Vacas";
import { Crias } from "../pages/Crias/Crias";
import { DetailFinca } from "../pages/DetailFinca/DetailFinca";
import { RegisterFinca } from "../pages/RegisterFinca/RegisterFinca";
import { RegisterAnimal } from "../pages/RegisterAnimal/RegisterAnimal";
import { DetailAnimal } from "../pages/DetailAnimal/DetailAnimal";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/login"} /> 
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
        path: "/fincas/:id",
        element: <AppLayout><DetailFinca/></AppLayout>
    },
    {
        path: "/register-finca", 
        element: <AppLayout><RegisterFinca/></AppLayout>
    },
    {
        path: "/register-animal",
        element: <AppLayout><RegisterAnimal/></AppLayout>
    },
    {
        path: "/vacas",
        element: <AppLayout><Vacas/></AppLayout>
    },
    {
        path: "/vacas/:id",
        element: <AppLayout><DetailAnimal/></AppLayout>
    },
    {
        path: "/crias",
        element: <AppLayout><Crias/></AppLayout>
    },
    {
        path: "/crias/:id",
        element: <AppLayout><DetailAnimal/></AppLayout>
    }

]);