import { useRef, useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BASE_URL from "../api/baseUrl";

const NAME_REGEX = /^[A-Z][a-z]{2,30}$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-_!@#$%]).{8,24}$/;

const Register = () => {
    const navigate = useNavigate();
    const fnameRef = useRef();
    const errRef = useRef();

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [validFname, setValidFname] = useState(false);
    const [validLname, setValidLname] = useState(false);
    const [validEmail, setValidEmail] = useState(false);

    const [fnameFocus, setFnameFocus] = useState(false);
    const [lnameFocus, setLnameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [user,setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd,setPwd] = useState('');
    const [validPwd,setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [pwdMatch, setPwdMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fnameRef.current.focus();
    }, []);
    
    useEffect(() => {
        const result = NAME_REGEX.test(fname);
        setValidFname(result);
    }, [fname])

    useEffect(() => {
        const result = NAME_REGEX.test(lname);
        setValidLname(result);
    }, [lname])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd]);

    useEffect(() => {
        if(pwd === pwdMatch){
            setValidMatch(true);
        }
        else{
            setValidMatch(false)
        }
    },[pwdMatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationUser = USER_REGEX.test(user);
        const verificationPwd = PWD_REGEX.test(pwd);

        if(!verificationPwd || !verificationUser){
            setErrMsg('Invalid Message');
            return;
        };

        try{
            await fetch(BASE_URL + "/register", {
                
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({fname,lname,email,user,pwd})
            })
            .then(res => {
                if(res.ok()){
                    return res.json()
                }
                throw new Error(res.status);
            })
            .then(() =>
            { 
                setSuccess(true);
                setTimeout(() => {
                    navigate("/");
                },1000)
            });
        }
        catch(err){
            if(!err?.message){
                setErrMsg("No response from the server");
            } 
            else if (err.message === "409"){
                setErrMsg("Username taken");
            }
            else{
                setErrMsg("Registration failed, try again");
            }
        }
    }
    
    return ( 
        <>  {success && 
                <section className="Section">
                    <h1>Reigistration successful</h1>
                </section>
            }      
            {!success && 
            <section className="Section">
                <h1>Registration</h1>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>

                <form onSubmit={handleSubmit}>
                    <label className="formLabel" htmlFor="">
                        First name:
                        <FontAwesomeIcon icon={faCheck} className={validFname && fname ? "valid": "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={!validFname && fname ? "invalid" : "hide" }/>
                        </label>
                    <input 
                        type="text"
                        ref={fnameRef}
                        required
                        onChange={(e) => setFname(e.target.value)} 
                        value={fname}
                        onFocus={() => setFnameFocus(true)}
                        onBlur={() => setFnameFocus(false)}
                        />
                        <p className={!validFname && fnameFocus &&fname ? "instructions" : "offscreen"}>Please enter your first name</p>
                    
                    <label className="formLabel" htmlFor="">
                        Last name:            
                        <FontAwesomeIcon icon={faCheck} className={validLname && lname ? "valid": "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={!validLname && lname ? "invalid" : "hide" }/>
                        </label>
                    <input 
                        type="text"
                        required
                        onChange={(e) => setLname(e.target.value)} 
                        value={lname}
                        onFocus={() => setLnameFocus(true)}
                        onBlur={() => setLnameFocus(false)}
                        />
                        <p className={!validLname && lnameFocus && lname ? "instructions" : "offscreen"}>Please enter your last name</p>

                    <label className="formLabel" htmlFor="">
                        Email
                        <FontAwesomeIcon icon={faCheck} className={email && validEmail ? "valid": "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={!email || validEmail ? "hide": "invalid"}/>
                        </label>
                    <input 
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        />
                        <p className={emailFocus && email ? "instructions" : "offscreen"}>Please enter your email</p>
                    
                    <label className="formLabel" htmlFor="username">
                        Username:
                        <FontAwesomeIcon icon={faCheck} className={user && validName ? "valid": "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={!user || validName ? "hide": "invalid"}/>
                    </label>
                    <input 
                        type="text" 
                        required
                        onChange={(e) => setUser(e.target.value)}
                        value = {user}
                        aria-invalid = {validName ? "false" : "true"}
                        aria-describedby = "userNote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                        />
                    <p id="uidnote" className={!validName && userFocus && user ? "instructions" : "offscreen"}>
                        4 to 24 characters.<br />
                        Must begin with a letter.<br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p> 


                    <label className="formLabel" htmlFor="password">
                        Password:
                        <FontAwesomeIcon icon={faCheck} className={pwd && validPwd ? "valid": "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={!pwd || validPwd ? "hide": "invalid"}/>
                    </label>
                    <input 
                        type="password" 
                        required
                        onChange={(e) => setPwd(e.target.value)}
                        value = {pwd}
                        aria-invalid = {validPwd ? "false" : "true"}
                        aria-describedby = "pwdNote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                        id="password" 
                    />
                    <p id="pwdNote" className={!validPwd && pwdFocus && pwd ? "instructions" : "offscreen"}>
                    8 to 24 characters.<br />
                        Must include uppercase and lowercase letters, a number and a special character.<br />
                        Allowed special characters: *-_+^£|!@#$%
                    </p> 


                    <label className="formLabel" htmlFor="Confirm">
                        Confirm Password:
                        <FontAwesomeIcon icon={faCheck} className={pwdMatch && validMatch ? "valid": "hide"}/>
                        <FontAwesomeIcon icon={faTimes} className={!pwdMatch || validMatch ? "hide": "invalid"}/>
                    </label>
                    <input 
                        type="password" 
                        required
                        onChange={(e) => setPwdMatch(e.target.value)}
                        value = {pwdMatch}
                        aria-invalid = {validMatch ? "false" : "true"}
                        aria-describedby = "pwdMatch"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                        id="passwordMatch" 
                    />
                    <p id="pwdMatch" className={!validMatch && matchFocus && pwdMatch ? "instructions" : "offscreen"}>
                        Must match the first password input field
                    </p>

                    <input className="submit" type="submit" disabled={validFname && validLname && validEmail && validName && validPwd && validMatch ? false: true} />

                    <p>Already have an account? Sign in <Link to="/login">here</Link></p>
                </form>
            </section>}
        </>
     );
}
 
export default Register;