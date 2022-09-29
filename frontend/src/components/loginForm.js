import { useState } from "react";

const LoginForm = () => {

    const [details, setDetails] = useState({user: "",password: ""});
    const [access,setAccess] = useState(false);
    const [adminAccess,setAdminAccess] = useState(false);
    const [error,setError] = useState('');


    const login = (data) => {

        const admin = {
            user: "admin",
            password: "AdminPassword"
        }
        const user1 = {
            user: "user1",
            password: "user1"
        }

        if(data.user === admin.user && data.password === admin.password){
            setError('')
            alert("Log in Succesful");
            setAccess(true);
            setAdminAccess(true);
        }
        else if(data.user === user1.user && data.password === user1.password){
            setError('')
            alert("Log in Succesful");
            setAccess(true)
        }
        else{
            setError('Invalid username or password');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(details)
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error != "" ? (<div className="error">{error}</div>) : ""}
            <div className="loginForm">
                <label htmlFor="name">Username: </label>
                <input type="text" onChange={e => setDetails({...details, user: e.target.value})} value={details.user}/>
                <label htmlFor="">Password</label>
                <input type="password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password} />
                <input type="submit" value="Submit"/>
            </div>
        </form>
     );
}
 
export default LoginForm;