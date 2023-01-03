import {useNavigate} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import BASE_URL from "../../../api/baseUrl";
import axios from "axios";


const CreateBook = ({user, authors,categories,categoriesError,authorsError,authorsPending,categoriesPending}) => {
    
    const navigate = useNavigate();

    const titleRef = useRef();
    const errRef = useRef();

    const [bookTitle, setTitle] = useState("");
    const [titleFocus, setTitleFocus] = useState(false);
    
    const [categoryId, setCategory] = useState(0);
    const [validCategory, setValidCategory] = useState(false);
    const [categoryFocus, setCategoryFocus] = useState(false);
    
    const [authorId, setAuthor] = useState(0);
    const [validAuthor, setValidAuthor] = useState(false);
    const [authorFocus,setAuthorFocus] = useState(false);

    const [bookSummary, setSummary] = useState("");
    const [summaryFocus, setSummaryFocus] = useState(false);
    
    const [bookQuantity, setQuantity] = useState(0);
    const [quantityFocus, setQuantityFocus] = useState(false);

    useEffect(() => {
        titleRef.current.focus();
    }, [CreateBook])

    useEffect(() => {
        if(categoryId === 0){
            setValidCategory(false);
        }
        else{
            setValidCategory(true);
        }
    }, [categoryId])

    useEffect(() => {
        if(authorId === 0){
            setValidAuthor(false);
        }
        else{
            setValidAuthor(true);
        }
    }, [authorId])

    const handleBookCreation = (e) => {
        e.preventDefault();

        axios.post(BASE_URL + '/books', {
            summary:bookSummary,
            title:bookTitle,
            author:authorId,
            category:categoryId,
            quantity:bookQuantity,
            roles:user.roles
        }
        )
        .then(res => {
            if(res.status === 200){
                return res;
            }
            throw new Error(res.status);
        })
        .then(data => {
            alert(`${bookTitle} has succesfully been posted!`);
            navigate("/books");
        })
        .catch(err => {
            //Handle Error
            console.log(err);
        })
    }

    return ( 
        <div className="create">
            
            {authorsError && categoriesError  &&
                <div className="error">
                    There was an error in fetching your data
                </div>
            }
            {authorsPending && categoriesPending &&
                <p>Loading</p>
            }
            {authors && categories &&
                <form onSubmit={(e) => handleBookCreation(e)}>
                    <div className="createBook">
                        <label htmlFor="">Title</label>
                        <input 
                            type="text"  
                            onChange={e => setTitle(e.target.value)}
                            value={bookTitle}
                            required
                            ref={titleRef}
                            onFocus={() => setTitleFocus(true)}
                            onBlur={() => setTitleFocus(false)}
                            />
                        <p className={bookTitle && titleFocus ? "instructions" : "hide"}>
                            Enter the book's title
                        </p>
                        <label htmlFor="">Category</label>
                        <p className={categoryId && categoryFocus ? "instructions" : "hide"}>
                            Choose the book's category
                        </p>
                        <select 
                            name="category" 
                            onChange={e => setCategory(e.target.value)}
                            required
                            value={categoryId}
                            onFocus={() => setCategoryFocus(true)}
                            onBlur={() => setCategoryFocus(false)}
                        >
                            <option value={0}>-Select category-</option>
                        {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.categoryName}</option>
                        ))}
                        </select>
                        <p className={authorId && authorFocus ? "instructions" : "hide"}>
                            Choose the book's author
                        </p>
                        <label htmlFor="">Author</label>
                        <select 
                            name="author" 
                            onChange={e => setAuthor(e.target.value)}
                            required
                            value={authorId}
                            onFocus={() => setAuthorFocus(true)}
                            onBlur={() => setAuthorFocus(false)}
                        >
                            <option value={0}>-Select author-</option>
                            {authors.map((author) => (
                                <option key={author._id} value={author._id}>{author.firstname} {author.lastname}</option>
                            ))}
                        </select>
                        {/* Make this portion of summary an expandible input section rather than single line input box */}
                        <label htmlFor="">Book Summary</label>
                        <input 
                            type="text"
                            onChange={e => setSummary(e.target.value)}
                            required
                            value={bookSummary}
                            onFocus = {() => setSummaryFocus(true)}
                            onBlur = {() => setSummaryFocus(false)}
                         />
                         <p className={bookSummary && summaryFocus ? "instructions" : "hide"}>
                            Enter the book's summary
                         </p>
                        <label htmlFor="">Quantity</label>
                        <input 
                            type="number" 
                            onChange={e => setQuantity(e.target.value)}
                            required
                            value={bookQuantity}
                            onFocus={() => setQuantityFocus(true)}
                            onBlur={() => setQuantityFocus(false)}
                        />                        
                        <p className={bookQuantity && quantityFocus ? "instructions" : "hide"}>
                            Enter the book's quantity
                        </p>
                         <input className="submit" disabled={bookTitle && validCategory && validAuthor && bookSummary && bookQuantity ? false : true} type="submit" />
                    </div>
                </form>
                
                
            }

        </div>
     );
}
 
export default CreateBook;