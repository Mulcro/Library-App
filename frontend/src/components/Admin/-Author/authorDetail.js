import BASE_URL from "../../../api/baseUrl";
import { useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxios from "../../../hooks/useAxios";

const NAME_REGEX = /^[A-Z][a-z]{2,30}$/;

const AuthorDetail = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    const [authorId, setAuthorId] = useState("");
    const [author,setAuthor] = useState();
    const [authorView, setAuthorView] = useState(false);

    const[fname,setFname] = useState("");
    const[fnameFocus, setFnameFocus] = useState(false);
    const [validFname,setValidFname] = useState(false);

    const[lname,setLname] = useState("");
    const[lnameFocus, setLnameFocus] = useState(false);
    const [validLname,setValidLname] = useState(false);

    const [success, setSuccess] = useState(false);
    const [err,setErr] = useState("");
    const {data: authors,pending,error} = useAxios(BASE_URL + "/authors"); //removed accessToken as cookie auth isn't working
    

    useEffect(() => {
        const result = NAME_REGEX.test(fname);
        setValidFname(result);
    }, [fname])

    useEffect(() => {
        const result = NAME_REGEX.test(lname);
        setValidLname(result);
    }, [lname])

    const handleSubmit = e => {
        e.preventDefault();
        console.log(user);
        try{
            axios(BASE_URL + `/authors/${authorId}`,{
                roles:user.roles
            })
            .then(res => {
                if(res.status === 200){
                    return res;
                }
                throw new Error(res.status)
            })
            .then(data => {
                setAuthorView(true);
                setAuthor(data.data);
            });
        }
        catch(err){
            setErr(err)
        }
    }

    const handleAuthorSubmit = e => {
        e.preventDefault();

        axios.patch(BASE_URL + `/authors/${authorId}`,{
            firstname: fname,
            lastname: lname,
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
                navigate("/authors");
            },1500)
        })
        .catch(err => {
            console.log(err);
            if(err.message === "422"){
                setErr("Please enter a valid first and last name");
            }
            else{
                setErr("Author update failed, please try again");
            }
        })
    }
    const handleDelete = e => {
        e.preventDefault();

        axios.delete(BASE_URL + `/authors/${authorId}`,{
            data:{roles:user.roles}
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(() => {
            alert("Author and its books have been succesfully deleted");
            navigate("/authors");
        })
        .catch(() => {
            setErr("Failed to delete author, please try again");
        })
    }

    return ( 
        <>
            {error && 
                <div className="error">
                    There was an error in fetching your data
                </div>
            }
            {pending && 
                <div>
                    loading..
                </div>
            }
            {authors && !authorView &&
                
                <section className="Section">
                    <p className={err ? "errMsg" : "hide"}>{err}</p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>
                            Choose the Author to Modify
                        </label>
                        <select onChange={e => setAuthorId(e.target.value)}>
                            <option value="">-Choose Author-</option>
                            {authors.map(author => (
                                <option value={author._id}>{author.firstname} {author.lastname}</option>
                            ))}
                        </select>
                        <input disabled={authorId ? false : true} type="submit" />
                    </form>
                </section>
            }
            {author && authorView &&
                <section className="Section">
                    <h3>Modify Author</h3>
                    <div>
                        <div>
                            <p className={success ? "successmsg" : "hide"}>The author was succesfully updated!</p>
                            <p className={err ? "errmsg" : "hide"}>{err}</p>
                            <form onSubmit={e => handleAuthorSubmit(e)}>
                                <label>First Name: </label>
                                <input 
                                    type="text"
                                    required
                                    value={fname}
                                    onChange={e => setFname(e.target.value)}
                                    onFocus={() => setFnameFocus(true)}
                                    onBlur={() => setFnameFocus(false)}
                                     />
                                    <p className={fname && fnameFocus ? "instructions" : "hide"}>Enter authors updated first name</p>

                                <label>Last Name: </label>
                                <input 
                                    type="text"
                                    required
                                    value={lname}
                                    onChange={e => setLname(e.target.value)}
                                    onFocus={() => setLnameFocus(true)}
                                    onBlur={() => setLnameFocus(false)}
                                     />
                                <p className={lname && lnameFocus ? "instructions" : "hide"}>Enter authors updated last name</p>
                                <input disabled={validFname && validLname ? false : true} type="submit" />
                            </form>
                        </div>
                        <div>
                            <button onClick={e => {
                                const result = window.confirm("All the books under this author will be deleted. Are you sure you want to delete this author?");
                                if(result){
                                    handleDelete(e);
                                }
                            }} 
                                className="delete"
                            >
                                Delete Author
                            </button>
                        </div>
                    </div>
                </section>
            }
        </>
    );
}
 
export default AuthorDetail;