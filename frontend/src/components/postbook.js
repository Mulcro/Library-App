import useFetch from "../hooks/useFetch";
import CreateBook from "./createBook";

const PostBook = () => {
    const {data:authors,pending: authorsPending,error: authorsError} = useFetch("http://localhost:5000/authors")
    const {data:categories,pending: categoriesPending,error: categoriesError} = useFetch("http://localhost:5000/categories")

    const data = [authors,categories,categoriesError,authorsError,authorsPending,categoriesPending]
    return ( 
        <div className="post">
            <h2>Create a new book</h2>
            <CreateBook authors={data[0]} categories={data[1]} categoriesError={data[2]} authorsError={data[3]} authorsPending={data[4]} categoriesPending={data[5]}/>
        </div>
     );
}
 
export default PostBook;