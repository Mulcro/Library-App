import { useContext } from "react";
import BASE_URL from "../../../api/baseUrl";
import useFetch from "../../../hooks/useFetch";
import CreateBook from "./createBook";
import { UserContext } from "../../../context/userContext";


const PostBook = () => {
    const {user} = useContext(UserContext);

    const {data:authors,pending: authorsPending,error: authorsError} = useFetch( BASE_URL+"/authors")
    const {data:categories,pending: categoriesPending,error: categoriesError} = useFetch( BASE_URL+"/categories")

    const data = [authors,categories,categoriesError,authorsError,authorsPending,categoriesPending]
    return ( 
        <section className="Section">
            <h2>Create a new book</h2>
            <CreateBook user={user} authors={data[0]} categories={data[1]} categoriesError={data[2]} authorsError={data[3]} authorsPending={data[4]} categoriesPending={data[5]}/>
        </section>
     );
}
 
export default PostBook;