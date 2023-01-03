import { useParams } from "react-router-dom";
import BookCard from "./bookCard";
import BASE_URL from "../api/baseUrl";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const AuthorDetails = () => {
    const {id} = useParams();
    const {user} = useAuth();

    const {data:author} = useAxios(BASE_URL + `/authors/${id}`,user.accessToken);
    const {data:books,pending,error} = useAxios(BASE_URL + `/authors/${id}/books`,user.accessToken);

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
            {author &&
                <div className="detailView">
                    <h4 className="authorTitle">{author.firstname} {author.lastname}</h4>
                    {books &&
                        <BookCard books={books}/>
                    }
                </div>
            }
        </div>
     );
}
 
export default AuthorDetails;