import { createBrowserRouter} from "react-router-dom";
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
import { RegisterSpecies } from "../pages/RegisterSpecie/RegisterSpecie";
import { RegisterRazas } from "../pages/RegisterRaza/RegisterRaza";
import { RegisterVacuna } from "../pages/RegisterVacunas/RegisterVacunas";
import { HomeLayout } from "../Layout/Home/HomeLayout";
import { Home } from "../pages/Home/Home";
import { Pricing } from "../pages/Pricing/Pricing";
import { NewUser } from "../pages/NewUser/NewUser";

export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout><Home/></HomeLayout>, 
    },{
        path: "/pricing",
        element: <HomeLayout><Pricing/></HomeLayout>,
    },{
        path: "/solutions",
        element: <HomeLayout><Pricing/></HomeLayout>,
    },
    {
        path: "/new-user",
        element: <NewUser/>,
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
    },
    {
        path: "/register-specie",
        element: <AppLayout><RegisterSpecies/></AppLayout>
    },
    {
        path: "/register-raza",
        element: <AppLayout><RegisterRazas/></AppLayout>
    },
    {
        path: "/register-vacunas",
        element: <AppLayout><RegisterVacuna/></AppLayout> 
    }

]);