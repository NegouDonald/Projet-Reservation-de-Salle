import {Route, Routes} from "react-router-dom";
import HomePage from "../components/HomePage.jsx";
import Dashboard from "../components/Dashboard.jsx";
import {appRoutes} from "./routes.js";
import EssaiRoutage from "../components/EssaiRoutage.jsx";

import AjouterEtudiant from "../page/AjouterEtudiant.jsx";
export default function AppRouter()
{
    return(
        <Routes>

            {/* pas une bonne facon on creer le fichier AppRoute
            <Route path={"/"} element={<HomePage/>}/> 
            <Route path={"/dasboard"} element={<Dashboard/>}/> */}
                <Route path={"/"} element={<AjouterEtudiant/>}/>
                    
            <Route path={appRoutes.HomePageRoute} element={<HomePage/>}/>
            <Route path={appRoutes.DashboardPageRoute} element={<Dashboard/>}/>

            {/* <Route path="essaiRoutage/:params" element={<EssaiRoutage/>}/>  */}

        </Routes>
    )
}