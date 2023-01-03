import {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../api/baseUrl";
import BookCard from "./bookCard";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#$%]).{8,24}$/;

const User = () => {
    const {user,setUser} = useAuth();
    const navigate = useNavigate();

    const[profile,setProfile] = useState({});
    const [auth,setAuth] = useState(false);
    
    const [mdfyPwd, setMdfyPwd] = useState(false);
    const [oldPwd, setOldPwd] = useState("");
    const [newPwd, setNewPwd] = useState("");
    const [cnfrmPwd, setCnfrmPwd] = useState("");

    const[oldPwdFocus,setOldPwdFocus] = useState(false);
    const[newPwdFocus,setNewPwdFocus] = useState(false);
    const[cnfrmPwdFocus, setCnfrmPwdFocus] = useState(false);

    const[validPwd,setValidPwd] = useState(false);
    const[pwdMatch,setPwdMatch] = useState(false);

    const [err,setError] = useState("");
    
    useEffect(()=>{
        if(user){
            setAuth(true);
            axios(BASE_URL + `/users/${user.user}`)
            .then(res => {
                if(res.status === 200){
                    return res;
                }
                throw new Error(res.status)
            })
            .then(data => {
                setProfile(data.data);
            })
            //Handle Error Properly
            .catch((err)=>{
                console.log(err);
            });
        }
    },[])

    useEffect(() => {
        const result = PWD_REGEX.test(newPwd);
        setValidPwd(result);
        console.log(newPwd);
        console.log(cnfrmPwd);
        console.log(result);
        if(cnfrmPwd === newPwd) {
            setPwdMatch(true);
        }
        else{
            setPwdMatch(false);
        }
    }, [newPwd,cnfrmPwd])

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

    const handleChangePwd = e => {
        e.preventDefault();
        
        axios.patch(BASE_URL + `/users/${profile.username}/changepwd`,{
            oldpassword:oldPwd,
            newpassword:newPwd
        })
        .then(res => {
            if(res.status === 200) return res;
            throw new Error(res.status);
        })
        .then(() => {
            alert("Password has been changed!");
            handleSignOut(e);
        })
        .catch(err => {
            console.log(err);
            setError(err);
        })
        // fetch(BASE_URL + `/users/${profile.username}/changepwd`,{
        //     method:"PATCH",
        //     headers:{
        //         "Content-Type":"application/json"
        //     },
        //     body: JSON.stringify({oldpassword:oldPwd,newpassword:newPwd})
        // })
        // .then(res => {
        //     if(res.ok){
        //         return res.json()
        //     }
        //     throw new Error(res.status);
        // })
        // .then(() => {
        //     alert("Password has been changed!");
        //     handleSignOut(e);
        // } )
        // .catch(err => setError(err))
    }
    //Create this page showing books borrowed and other relevant info

    const handleGoBack = () => {
        setOldPwd("");
        setNewPwd("");
        setCnfrmPwd("");
        setMdfyPwd(false);
    }

    return ( 
        <section className="userInterface">
            { auth && profile && !mdfyPwd &&
                <div className="mainSection">
                    <div className="userNav">
                        <div className="userInfo">
                            <img className="profilePic" src={profile.profile} alt="" />
                            <div className="userText">
                                <h3>User Info</h3>
                                <p>Name: {profile.firstname} {profile.lastname}</p>
                                <p>Username: {profile.username}</p>
                                <p>Email: {profile.email}</p>
                            </div>
                        </div>
                        <div className="userButtons">
                            {/* Make this work */}
                            {/* <button>Change Profile Picture</button> */}
                            <button onClick={() => setMdfyPwd(true)}>Change Password</button>
                        </div>
                    </div>

                    <div className="borrowedSection">
                        <h2>Books Borrowed</h2>
                        <p className="warning">Make sure to return borrowed books</p>
                        {profile.books &&
                            <BookCard books={profile.books}/>
                        }
                    </div>
                </div>
            }
            {mdfyPwd &&
                <section className="Section">
                    <button 
                        className="back"
                        onClick={() => handleGoBack()}>
                        Back
                    </button>
                    <form onSubmit={e => handleChangePwd(e)}>
                    <label>Old Password</label>
                        <input 
                            type="password"
                            required
                            value={oldPwd}
                            onChange={e => setOldPwd(e.target.value)}
                            onFocus={() => setOldPwdFocus(true)}
                            onBlur={() => setOldPwdFocus(false)} 
                        />
                        <p className={oldPwd && oldPwdFocus ? "instructions" : "hide"}> Enter the old password</p>
                        
                        <label>New Password</label>
                        <input 
                            type="password"
                            required
                            value={newPwd}
                            onChange={e => setNewPwd(e.target.value)}
                            onFocus={() => setNewPwdFocus(true)}
                            onBlur={() => setNewPwdFocus(false)} 
                        />
                        <p className={newPwd && newPwdFocus ? "instructions" : "hide"}>
                        8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: *-_+^£|!@#$%
                        </p>
                        
                        <label>Confirm Password</label>
                        <input 
                            type="password"
                            required
                            value={cnfrmPwd}
                            onChange={e => setCnfrmPwd(e.target.value)}
                            onFocus={() => setCnfrmPwdFocus(true)}
                            onBlur={() => setCnfrmPwdFocus(false)} 
                        />
                        <p className={cnfrmPwd && cnfrmPwdFocus ? "instructions" : "hide"}>Re enter the new password</p>
                        
                        
                        <input type="submit" disabled={validPwd && pwdMatch ? false : true} />
                    </form>
                </section>
            }
            
        </section>
     );
}
 
export default User;