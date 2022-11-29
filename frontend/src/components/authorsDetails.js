import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import BookCard from "./bookCard";
import BASE_URL from "../api/baseUrl";

const AuthorDetails = () => {
    const {id} = useParams();

    const {data} = useFetch(BASE_URL + `/authors/${id}`);
    const {data:books,pending,error} = useFetch(BASE_URL + `/authors/${id}/books`);

    return ( 
        <div className="detailedAuthorView">
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
                <div className="detailView">
                    {console.log(data)}
                    <h4 className="authorTitle">{data.firstname} {data.lastname}</h4>
                    {books &&
                        <BookCard books={books}/>
                    }
                </div>
            }
        </div>
     );
}
 
export default AuthorDetails;