import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import BookCard from "./bookCard";

const AuthorDetails = () => {
    const {id} = useParams();

    const {data} = useFetch(`http://localhost:5000/authors/${id}`);
    const {data:books,pending,error} = useFetch(`http://localhost:5000/authors/${id}/books`);

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
                    <h4 className="authorTitle">{data.first_name} {data.last_name}</h4>
                    {books &&
                        <BookCard books={books}/>
                    }
                </div>
            }
        </div>
     );
}
 
export default AuthorDetails;