import BASE_URL from "../api/baseUrl";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import BookCard from "./bookCard";


const Books = () => {
    // const {data, pending, error} = useFetch(BASE_URL + '/books');
    const {user} = useAuth();
    const {data, pending, error} = useAxios(BASE_URL + "/books"); //removed accessToken as cookie auth isn't working

    return ( 
        <div className="bookView">
            <h2>All Books</h2>
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
            {data &&
                <BookCard books={data}/>
            }
        </div>
        );
}
 
export default Books;