import { useContext, useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../api/baseUrl";
import { UserContext } from "../../context/userContext";

const BookDetail = () => {
    const {bookID} = useParams();
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    const [book,setBook] = useState({});
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        //Allows editor or admin to have access to deletion of a book
        if(user){
            if(user.roles.includes(0)){
                setAuth(true);
            }
        }
        try{
            fetch(BASE_URL + `/books/${bookID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
            }})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setBook(data);
            });
        }
        catch(err){
            console.log("Didn't work");
            console.log(err);
        }

    },[]);


    const handleDelete = (e) => {
        e.preventDefault();

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
            {book?.category &&
                <div className="book">
                    <h1>{book.title}</h1>

                    {/* Handle CSS for this page */}

                    <div className="bookContent">
                        <div>
                            <p>{book.author.firstname} {book.author.lastname}</p>
                            <p>{book.category.categoryName}</p>
                            <p>{book.quantity}</p>
                        </div>

                        <div>
                            <p className="summary">{book.summary}</p>
                            <button 
                                disabled={auth ? false : true} 
                                className="delete"
                                onClick={(e) => {
                                    const result = window.confirm("Are you sure you want to delete this book?");
                                    if(result){
                                        handleDelete(e);
                                    }
                                }}>Delete Book</button>
                        </div>
                    </div>
                </div>
            }
        </section>
     );
}
 
export default BookDetail;