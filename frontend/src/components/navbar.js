import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../api/baseUrl";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Navbar = () => {

    const {user,setUser} = useAuth();
    const navigate = useNavigate();
    
    const handleSignOut = (e) => {
        e.preventDefault();
        
        axios.post(BASE_URL + '/logout')
        .then(res => {
            if(res.status === 204) return res;
            throw new Error(res.status);
        })
        .then(() => {
            setUser("");
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        })
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