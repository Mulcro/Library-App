import BASE_URL from "../../../api/baseUrl";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";


const NAME_REGEX = /^[A-Z][a-z]{2,30}$/;

const CategoryDetail = ({user}) => {
    const navigate = useNavigate();

    const [CategoryId, setCategoryId] = useState("");
    const [Category,setCategory] = useState();
    const [CategoryView, setCategoryView] = useState(false);

    const[cname,setCname] = useState("");
    const[cnameFocus, setCnameFocus] = useState(false);
    const [validCname,setValidCname] = useState(false);

    const [success, setSuccess] = useState(false);
    const [err,setErr] = useState("");
    const {data: Categories,pending,error} = useFetch(BASE_URL + "/Categories");

    useEffect(() => {
        const result = NAME_REGEX.test(cname);
        setValidCname(result);
    }, [cname])


    const handleSubmit = (e) => {
        e.preventDefault();
        try{
            fetch(BASE_URL + `/Categories/${CategoryId}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error(res.status)
            })
            .then(data => {
                setCategoryView(true);
                setCategory(data);
            });
        }
        catch(err){
            setErr(err)
        }
    }

    const handleCategorySubmit = e => {
        e.preventDefault();

        try{
            fetch(BASE_URL + `/categories/${CategoryId}`,{
                method: "PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({roles: user.roles,categoryName: cname})
            })
            .then(res => {
                if(res.ok){
                    return res.json()
                }
                throw new Error(res.status);
            })
            .then(() => {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/categories");
                },1500)
            })
        }
        catch(err){
            if(err.message === "422"){
                setErr("Please enter a valid first and last name");
            }
            else{
                setErr("Author update failed, please try again");
            }
        }
    }

    const handleDelete = e => {
        e.preventDefault();
        console.log(user.roles);
        try{
            fetch(BASE_URL + `/Categories/${CategoryId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({roles: user.roles})
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error(res.status);
            })
            .then(() => {
                alert("Category and its books has been succesfully deleted");
                navigate("/books");
            })
        }
        catch(err){
            setErr("Failed to delete Category, please try again");
        }
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
            {Categories && !CategoryView &&
                
                <section className="Section">
                    <p className={err ? "errMsg" : "hide"}>{err}</p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label>
                            Choose the Category to Modify
                        </label>
                        <select onChange={e => setCategoryId(e.target.value)}>
                            <option value="">-Choose Category-</option>
                            {Categories.map(Category => (
                                <option value={Category._id}>{Category.categoryName}</option>
                            ))}
                        </select>
                        <input disabled={CategoryId ? false : true} type="submit" />
                    </form>
                </section>
            }
            {Category && CategoryView &&
                <section className="Section">
                    <h3>Modify Category</h3>
                    <div>
                        <p className={success ? "successmsg" : "hide"}>The Category was succesfully updated!</p>
                        <p className={err ? "errmsg" : "hide"}>{err}</p>
                        <form onSubmit={e => handleCategorySubmit(e)}>
                            <label>Category Name: </label>
                            <input 
                                type="text"
                                required
                                value={cname}
                                onChange={e => setCname(e.target.value)}
                                onFocus={() => setCnameFocus(true)}
                                onBlur={() => setCnameFocus(false)}
                                 />
                                <p className={cname && cnameFocus ? "instructions" : "hide"}>Enter the categories updated name</p>
                            <input disabled={validCname ? false : true} type="submit" />
                        </form>                        
                    </div>
                    <div>
                        <button onClick={e => {
                            const result = window.confirm("All the books under this Category will be deleted. Are you sure you want to delete this Category?");
                            if(result){
                                handleDelete(e);
                            }
                        }} 
                            className="delete"
                        >
                            Delete Category
                        </button>
                    </div>
                </section>
            }
        </>
    );
}
 
export default CategoryDetail;