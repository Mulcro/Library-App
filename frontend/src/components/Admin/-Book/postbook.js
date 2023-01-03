import BASE_URL from "../../../api/baseUrl";
import useFetch from "../../../hooks/useFetch";
import CreateBook from "./createBook";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios"

const PostBook = () => {
    const {user} = useAuth();

    const {data:authors,pending: authorsPending,error: authorsError} = useAxios( BASE_URL+"/authors") //removed accessToken as cookie auth isn't working
    const {data:categories,pending: categoriesPending,error: categoriesError} = useAxios( BASE_URL+"/categories") //removed accessToken as cookie auth isn't working

    const data = [authors,categories,categoriesError,authorsError,authorsPending,categoriesPending]
    return ( 
        <section className="Section">
            <h2>Create a new book</h2>
            <CreateBook user={user} authors={data[0]} categories={data[1]} categoriesError={data[2]} authorsError={data[3]} authorsPending={data[4]} categoriesPending={data[5]}/>
        </section>
     );
}
 
export default PostBook;