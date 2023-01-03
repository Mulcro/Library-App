import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../api/baseUrl";
import { UserContext } from "../../context/userContext";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import ModifyBook from "./modifyBook";
import axios from "axios";

const BookDetail = () => {
    const {bookID} = useParams();
    const {user} = useAuth();
    const navigate = useNavigate();
    
    const [book,setBook] = useState({});
    const [auth, setAuth] = useState(false);
    const [modify,setModify] = useState(false);

    const [inStock, setInStock] = useState(false);
    const [canBorrow, setCanBorrow] = useState(false);
    //Use err state 
    const [err,setErr] = useState("");
    const {data:authors,pending: authorsPending,error: authorsError} = useAxios( BASE_URL+"/authors") //removed accessToken as cookie auth isn't working
    const {data:categories,pending: categoriesPending,error: categoriesError} = useAxios( BASE_URL+"/categories") //removed accessToken as cookie auth isn't working

    const data = [authors,categories,categoriesError,authorsError,authorsPending,categoriesPending]

    useEffect(() => {
        if(user){
            if(user.roles.includes(1)){
                setAuth(true);
            }
            if(user.roles.includes(20)){
                setCanBorrow(true);
            }
        }
        try{
            axios(BASE_URL + `/books/${bookID}`)
            .then(res => {
                if(res.status === 200) return res;
                throw new Error(res)
            })
            .then(data => {
                setBook(data.data);
            });
        }
        //hanlde Error
        catch(err){
            console.log("Didn't work");
            console.log(err);
        }

    },[]);

    useEffect(() => {
        if(book.quantity > 0){
            setInStock(true);
        }
    }, [book])

    

    const renderModifyBook = () => {
        setModify(true);
    }

    const handleGoBack = () => {
        setModify(false);
        navigate(-1);
    }
    
    //Remove borrow functionality from here and place it in the user view admin section.
    const handleBorrow = () => {
        
        axios.post(BASE_URL + `/borrow/${bookID}`,{
            username: user.user
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res)
        })
        .then(() => navigate('/user'))
        .catch(err => {
            if(err.response.status === 409){
                alert("You have already borrowed this book")
            }
            else{
                alert("Something went wrong, please try again later")
            }
            setErr(err);
        })
    }

    const handleDelete = () => {
        axios.delete(BASE_URL + `/books/${bookID}`,{
            data:{roles: user.roles}
        })
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res)
        })
        .then(() => {
            alert(`${book.title} has successfully been deleted!`);
            navigate("/books")
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (     

        <section className="bookDetails">
            <button className="back" onClick={() => handleGoBack()}>Back</button>
            {(authorsError || categoriesError) &&
                <div>
                    error
                </div>
            }
            {(authorsPending || categoriesPending) &&
                <div className="loading">
                    ...loading
                </div>
            }
            {book?.category && !modify &&
                <div className="book">
                    <h1 className="title">{book.title}</h1>

                    {/* Handle CSS for this page */}

                    <div className="bookContent">
                        <div className="nameSection">
                            <p className="authorName">{book.author.firstname} {book.author.lastname}</p>
                            <p className="categoryName">{book.category.categoryName}</p>
                            <p className="quantity">{book.quantity}</p>
                            <button 
                                className="borrow" 
                                onClick={() => handleBorrow()}
                                disabled={(canBorrow && inStock) ? false : true }>
                                    {inStock ? "Borrow" : "Out of stock"}
                            </button>
                        </div>

                        <div>
                            <h3 className="title">Summary</h3>
                            <p className="summary">{book.summary}</p>
                            <button
                                disabled={auth ? false : true} 
                                onClick={() => renderModifyBook()}
                                className="button"
                                >Modify Book</button>
                            <button 
                                disabled={auth ? false : true} 
                                className="delete"
                                onClick={() => {
                                    const result = window.confirm("Are you sure you want to delete this book?");
                                    if(result){
                                        handleDelete();
                                    }
                                }}>Delete Book</button>
                        </div>
                    </div>
                </div>
            }
            {modify &&
                <section className="section">
                    <h1>Modify Book</h1>
                    <ModifyBook user={user} bookId={bookID} authors={data[0]} categories={data[1]} categoriesError={data[2]} authorsError={data[3]} authorsPending={data[4]} categoriesPending={data[5]}/>          
                </section>
            }
        </section>
     );
}
 
export default BookDetail;