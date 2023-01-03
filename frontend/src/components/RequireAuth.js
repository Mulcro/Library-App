import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRoles}) => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if(!user?.user) navigate("/login", {state:{from:location}, replace: true});
        
        //There is a conflict here whereby the if statement is reading the returned 0 showing the admin number is present as a false statement4

        else if(!user.roles.find(role => allowedRoles.includes(role))) {
            navigate("/",{state:{from:location}, replace: true});
            //Alert renders twice for some reason
            alert("You are not authorized to view this page");
        }
    }, [])

    return(
        <Outlet/>
    //     user?.user 
    //         ? <Outlet/>
    //         : <Navigate to="/login" state={{from: location}} replace />
    )
}

export default RequireAuth;