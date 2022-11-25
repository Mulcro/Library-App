import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../api/baseUrl";
import { UserContext } from "../../../context/userContext";

//Have to find way to integrate this into the admin section without making it seperate url as it can be accessed just by typing the url

const CATNAME_REGEX = /^[A-z]{2,23}$/;

const PostCategory = () => {
    const {user} = useContext(UserContext);

    const navigate = useNavigate();
    const catRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        catRef.current.focus();
    }, []);

    const [catName, setCatName] = useState("");
    const [validCatName, setValidCatName] = useState(false);
    const [catNameFocus, setCatNameFocus] = useState(false);


    const [err,setErr] = useState("");
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        if(CATNAME_REGEX.test(catName)){
            setValidCatName(true);
        }
        else{
            setValidCatName(false);
        }
    },[catName]);

    const handleSubmit = e => {
        e.preventDefault();

        fetch(BASE_URL + "/Categories", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({roles: user.roles,categoryName: catName})
        })
        .then(res => {
            if(res.ok){
                return res.json();
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
                setErr("A valid Category name is required")
            }
            else{
                setErr("Category creation failed, please try again");
            }
        });
    }

    const handleGoBack = () => {
        navigate(-1);
    }
    
    ///Need to find a way to integrate creation of category to admin section rrather than an independent url
    return ( 
        <>
        {success &&
            <section className="Section"> 
                 <h1>Category Added</h1>
            </section> 
         }
        {!success &&
            <section className="Section">
                <button className="back" onClick={() => handleGoBack()}>Back</button>
                <h1>Add a new Category</h1>
                <p className={err ? "errmsg" : "hide"}>{err}</p>
                <form onSubmit={e => handleSubmit(e)}>
                    <label>
                        Category Name
                    </label>
                    <input 
                        type="text"
                        required
                        ref={catRef}
                        onChange={e => setCatName(e.target.value)}
                        value={catName}
                        onFocus={() => setCatNameFocus(true)}
                        onBlur={() => setCatNameFocus(false)}
                     />
                    <p className={catName && catNameFocus ? "instructions" : "hide"}>Enter the Category's name</p>


                    <input disbaled={validCatName ? false : true} type="submit" />
                </form>
            </section>
        }
        </>
     );
}
 
export default PostCategory;