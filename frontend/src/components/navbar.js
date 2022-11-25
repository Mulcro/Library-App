import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import BASE_URL from "../api/baseUrl";

const Navbar = () => {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const handleSignOut = (e) => {
        e.preventDefault();

        try{
            console.log("Sign out");
            fetch(BASE_URL + '/logout',{
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type":"application/json"
                }
            })
            .then(res => {
                console.log("Working");
                res.json()
            })
            .then(() => {
                setUser(null);
                navigate("/");
            });
        }
        catch(err){
            console.log(err);
        }
    }
    return ( 
        <div className="navbar">
            <h1>Library App</h1>

            {!user &&
               <Link to="login"><button className="login-logout">Login</button></Link>
            }
            {user &&
                <Link><button className="login-logout" onClick={(e) => handleSignOut(e)}>Sign Out</button></Link>
            }
        </div>
     );
}
 
export default Navbar;