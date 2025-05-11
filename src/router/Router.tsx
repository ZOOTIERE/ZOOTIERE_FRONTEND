import { createBrowserRouter} from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { AppLayout } from "../Layout/App/AppLayout";
import { Finca } from "../pages/Finca/Finca";
import { DetailFinca } from "../pages/DetailFinca/DetailFinca";
import { RegisterFinca } from "../pages/RegisterFinca/RegisterFinca";
import { HomeLayout } from "../Layout/Home/HomeLayout";
import { Home } from "../pages/Home/Home";
import { Pricing } from "../pages/Pricing/Pricing";
import { NewUser } from "../pages/NewUser/NewUser";
import CreateWorker from "../pages/RegisterWorker/RegisterWorker";
import { Workers } from "../pages/Workers/Workers";
import { RegisterVaccine } from "../pages/RegisterVaccine/RegisterVaccine";

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
        path: "/farms",
        element: <AppLayout><Finca/></AppLayout>
    },
    {
        path: "/farns/:id",
        element: <AppLayout><DetailFinca/></AppLayout>
    },
    {
        path: "/new-farm", 
        element: <RegisterFinca/>
    },
    {
        path: "/register-farm",
        element: <RegisterFinca/>
    },
    {
        path: "/register-workers",
        element: <AppLayout><CreateWorker/></AppLayout>
    },
    {
        path: "/workers",
        element: <AppLayout><Workers/></AppLayout>
    },
    {
        path: "/register-vaccine",
        element: <AppLayout><RegisterVaccine/></AppLayout>
    }

]);