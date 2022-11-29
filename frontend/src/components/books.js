import BASE_URL from "../api/baseUrl";
import useFetch from "../hooks/useFetch";
import BookCard from "./bookCard";

const Books = () => {
    const {data, pending, error} = useFetch(BASE_URL + '/books');

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