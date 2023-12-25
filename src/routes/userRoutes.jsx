import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup";
import { Login } from "../pages/Login";
import {Home} from '../pages/Home';
import ProductDetails from "../pages/ProductDetails";
import PrivateRoutes from "../protectedRoutes/PrivateRoutes";

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route element={<PrivateRoutes role={'user'} route={'/user/login'}/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/productDetails/:id" element={<ProductDetails/>}/>
            </Route>
        </Routes>
    )
}