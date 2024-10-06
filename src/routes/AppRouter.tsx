import { Navigate, Route, Routes } from "react-router-dom"
import LauncherView from "../views/LauncherVIew"
import CreatePlanetView from "../views/CreatePlanetView"

export const AppRouter = () => {

    return (
        <Routes>
            <Route path="/beyond" element={<LauncherView></LauncherView>}></Route>
            <Route path="/sandbox" element={<CreatePlanetView></CreatePlanetView>}></Route>
            <Route path="/survival"></Route>
            <Route path="*" element={<Navigate to={"/beyond"}></Navigate>}></Route>
        </Routes>
    )

}