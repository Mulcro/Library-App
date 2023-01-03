import { Link } from "react-router-dom";
import BASE_URL from "../api/baseUrl";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const Authors = () => {
    const {user} = useAuth();
    const {data,pending,error} = useAxios(BASE_URL + '/authors',user.accessToken)
    return ( 
        <div className="authorView">
            <h2>Browse by Author</h2>
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
                <div className="authors">
                    <ul className="authorList">
                        {data.map((item)=>(
                            <Link to={`/authors/${item._id}/books`}><li key={item._id}>{item.firstname} {item.lastname}</li></Link>
                        ))}
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default Authors;