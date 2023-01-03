import { useEffect, useRef, useState } from "react";
import BookCard from "./bookCard";
import BASE_URL from "../api/baseUrl";
import useAxios from "../hooks/useAxios";
import axios from "axios";

//Need to work on page css

const Search = () => {
    const paramRef = useRef();

    const {data:authors, pending: authorsPending, error: authorsError} = useAxios( BASE_URL+"/authors") //removed accessToken as cookie auth isn't working
    const {data:categories, pending: categoriesPending, error: categoriesError} = useAxios( BASE_URL+"/categories") //removed accessToken as cookie auth isn't working

    const [searchQuery,setQuery] = useState("");

    const [searchParam, setParam] = useState("");
    const [validParam, setValidParam] = useState(false);
    
    const [title,setTitle] = useState("");
    const [titleFocus, setTitleFocus] = useState(false);

    const [author,setAuthor] = useState("");
    const [authorFocus, setAuthorFocus] = useState(false);

    const [category, setCategory] = useState("");
    const [categoryFocus, setCategoryFocus] = useState(false);
    
    
    
    const [book,setBook] = useState([]);


    useEffect(() => {

        switch (searchParam) {
            case  "":
                setValidParam(false);
                setAuthorFocus(false);
                setCategoryFocus(false);
                setTitleFocus(false);
                break;

            case "1":
                setValidParam(true);
                setTitleFocus(true);
                setAuthorFocus(false);
                setCategoryFocus(false);
                break;
            
            case "2":
                setValidParam(true);
                setCategoryFocus(true)
                setTitleFocus(false);
                setAuthorFocus(false);
                break;
            case "3": 
                setValidParam(true);
                setAuthorFocus(true);
                setCategoryFocus(false);
                setTitleFocus(false);
                break;
        }

   
    },[searchParam]);


    useEffect(() => {
        //Query Logic

        switch (searchParam) {
            case "1":
                setQuery(title);
                break;
            case "2":
                setQuery(category);
                break;
            case "3": 
                setQuery(author);
                break;                        
        }
             
    },[title,author,category])

    const handleSearch = (e) => {
        e.preventDefault();

        axios.post(BASE_URL + "/search", {
            query:searchQuery,
            param:searchParam
        })
        .then(res=>{
            if(res.status === 200) return res;
            throw new Error(res.status);
        })
        .then(data => setBook(data.data))
        .catch(err => console.log(err))
    }

    return ( 
        <>
            <section className="Section">
                <h1>Search</h1>
                {authorsError && categoriesError &&
                    <div className="error">There was an error</div>
                }
                {authorsPending && categoriesPending &&
                    <p>loading..</p>
                }
                { authors && categories &&
                <form onSubmit={(e) => handleSearch(e)}>
                    <div className="searchBox">
                        <select required onChange={(e) => setParam(e.target.value)}>
                            <option value="">-Seach by-</option>
                            <option value="1">Title</option>
                            <option value="2">Category</option>
                            <option value="3">Author</option>
                        </select>

                        <label className={titleFocus ? "seachText" : "hide" }>
                            Search for a book 
                        </label>
                        <input 
                            type="text" 
                            className={titleFocus ? "searchBox" : "hide" } onChange={(e) => setTitle(e.target.value)}
                            required={titleFocus ? true : false}
                        />

                        <select 
                            className={categoryFocus ? "select" : "hide"} 
                            required={categoryFocus ? true : false}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <option value="">-Select Category-</option>
                            {categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>

                        <select 
                            className={authorFocus ? "select" : "hide"} 
                            required={authorFocus ? true : false }
                            onChange={e => setAuthor(e.target.value)}
                        >
                            <option value="">-Select Author-</option>
                            {authors.map(author => (
                                <option value={author._id} key={author._id}>
                                    {author.firstname} {author.lastname}
                                </option>
                            ))}
                        </select>

                        <input disabled={validParam && (title || category || author) ? false : true} type="submit"/>
                    </div>
                </form>
                }
            </section>
                {book &&
                    <div className="searchResults">
                        <BookCard books={book}/>
                    </div>
                }
        </>
     );
}
 
export default Search;