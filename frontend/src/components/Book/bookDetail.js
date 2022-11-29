import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../api/baseUrl";
import { UserContext } from "../../context/userContext";
import useFetch from "../../hooks/useFetch";
import ModifyBook from "./modifyBook";

const BookDetail = () => {
    const {bookID} = useParams();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    
    const [book,setBook] = useState({});
    const [auth, setAuth] = useState(false);
    const [modify,setModify] = useState(false);

    const [inStock, setInStock] = useState(false);
    const [canBorrow, setCanBorrow] = useState(false);

    const [err,setErr] = useState("");
    const {data:authors,pending: authorsPending,error: authorsError} = useFetch( BASE_URL+"/authors")
    const {data:categories,pending: categoriesPending,error: categoriesError} = useFetch( BASE_URL+"/categories")

    const data = [authors,categories,categoriesError,authorsError,authorsPending,categoriesPending]

    useEffect(() => {
        //Allows editor or admin to have access to deletion of a book
        if(user){
            console.log(user);
            if(user.roles.includes(0)){
                setAuth(true);
            }
            if(user.roles.includes(2)){
                setCanBorrow(true);
            }
        }
        try{
            fetch(BASE_URL + `/books/${bookID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                setBook(data);
            });
        }
        catch(err){
            console.log("Didn't work");
            console.log(err);
        }

    },[]);

    useEffect(() => {
        console.log(book.quantity);
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
    
    const handleBorrow = () => {
        try{
            fetch(BASE_URL + `/borrow/${bookID}`,{
                method: "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({username: user.user})
            })
            .then(res => {
                if(res.ok){
                    return res.json();
                }
                throw new Error(res.status)
            })
            .then(() => navigate('/user'))
        }
        catch(err){

            console.log(err);
            setErr(err);
        }
    }

    const handleDelete = () => {
        try{
            fetch(BASE_URL + `/books/${bookID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({"roles":user.roles})
            })
            .then(res => res.json())
            .then(() => navigate("/books"));
        }
        catch (err){
            console.log(err);
        }
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