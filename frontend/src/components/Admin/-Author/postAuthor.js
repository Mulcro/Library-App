import axios from "axios";
import {useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../api/baseUrl";
import useAuth from "../../../hooks/useAuth";

//Have to find way to integrate this into the admin section without making it seperate url as it can be accessed just by typing the url


const FNAME_REGEX = /^[A-z]{2,23}$/;
const LNAME_REGEX = /^[A-z].{2,24}$/;

const PostAuthor = () => {
    const {user} = useAuth();

    const navigate = useNavigate();
    const firstNRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        firstNRef.current.focus();
    }, []);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [validFName, setValidFName] = useState(false);
    const [validLName, setValidLName] = useState(false);
    const [fNameFocus, setFNameFocus] = useState(false);
    const [lNameFocus, setLNameFocus] = useState(false);

    const [err,setErr] = useState("");
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        if(FNAME_REGEX.test(firstName)){
            setValidFName(true);
        }
        else{
            setValidFName(false);
        }
    },[firstName]);

    useEffect(() => {
        if(LNAME_REGEX.test(lastName)){
            setValidLName(true);
        }
        else{
            setValidLName(false);
        }
    },[lastName]);

    const handleSubmit = e => {
        e.preventDefault();

        axios.post(BASE_URL + "/authors", {
            firstname: firstName,
            lastname: lastName,
            roles:user.roles
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(() => {
            setSuccess(true);
            setTimeout(() => {
                navigate(-1);
            }, 1000)
        })
        .catch( err => {
            errRef.current.focus();
            if(err.message === "422"){
                setErr("A valid author name is required")
            }
            else{
                setErr("Author creation failed, please try again");
            }
        });
    }

    const handleGoBack = () => {
        navigate(-1);
    }
    
    return ( 
        <>
        {success &&
            <section className="Section"> 
                 <h1>Author Added</h1>
            </section> 
         }
        {!success &&
            <section className="Section">
                <button className="back" onClick={() => handleGoBack()}>Back</button>
                <h1>Add a new author</h1>
                <p className={err ? "errmsg" : "hide"}>{err}</p>
                <form onSubmit={e => handleSubmit(e)}>
                    <label>
                        First Name
                    </label>
                    <input 
                        type="text"
                        required
                        ref={firstNRef}
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
                        onFocus={() => setFNameFocus(true)}
                        onBlur={() => setFNameFocus(false)}
                     />
                    <p className={firstName && fNameFocus ? "instructions" : "hide"}>Enter the author's first name</p>

                     <label>
                        Last Name
                     </label>
                     <input 
                        type="text"
                        required
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}
                         onFocus={() => setLNameFocus(true)}
                         onBlur={() => setLNameFocus(false)}
                    />
                    <p className={lastName && lNameFocus ? "instructions" : "hide"}>Enter the author's last name</p>

                    <input disbaled={validFName && validLName ? false : true} type="submit" />
                </form>
            </section>
        }
        </>
     );
}
 
export default PostAuthor;