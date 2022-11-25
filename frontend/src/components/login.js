import { Link, useNavigate } from "react-router-dom";
import {useState, useEffect, useRef, useContext} from "react";
import BASE_URL from "../api/baseUrl";
import { UserContext } from "../context/userContext";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z]).{4,24}$/;


const Login = () => {

    const navigate = useNavigate();

    const {setUser} = useContext(UserContext);

    const userRef = useRef();
    const errRef = useRef();
    
    const [username, setUserName] = useState('');
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const [err, setErrMsg] = useState('');
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        if(PWD_REGEX.test(pwd)){
            setValidPwd(true);
        }
        else{
            setValidPwd(false);
        }
    },[pwd])
    const handleSubmit = (e) => {
        e.preventDefault();

        //Did not put this in a try catch block because for some reason the catch block wasnt executing
        fetch(BASE_URL + "/login", {
                
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({user: username,pwd})
        })
        .then(res => {
            if(res.ok){
                return res.json();
            }
            throw new Error(res.status)
        })
        .then(data => {
            setUser(data);
            console.log(data);
        })
        .then(() => {
            setSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        })
        .catch((err)=>{
            if(err.message === "401"){
                setErrMsg("Wrong username or password.")
            }
            else{
                setErrMsg("Login failed, try again.")
            }
            errRef.current.focus();
        })      

        setUserName('');
        setPwd('');
    }
    return (
        <> 
            {success &&
               <section className="Section"> 
                    <h1>Login success</h1>
               </section> 
            }
            {!success &&
                <section className="Section">
                <p ref={errRef} className={!err ? "hide":"errmsg"}>{err}</p>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Sign in!</h1>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text"
                        required
                        ref={userRef}
                        onChange={(e) => setUserName(e.target.value)}
                        value={username}
                        onFocus={() => setUserFocus(true)}   
                        onBlur={() => setUserFocus(false)}
                    />
                    <p className={username && userFocus ? "instructions": "hide"}>
                        Enter your username
                    </p>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        required
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        onFocus={() => setPwdFocus(true)}   
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p className={pwd && pwdFocus ? "instructions": "hide"}>
                        Enter your password
                    </p>
                    
                    <input className="submit" type="submit" disabled={username && pwd && validPwd ? false : true}/>

                    <p>Need an account? <Link to="/register">Sign up!</Link></p>
                </form>
            </section>
            }
        </>
     );
}
 
export default Login;