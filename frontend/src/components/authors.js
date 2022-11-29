import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import BASE_URL from "../api/baseUrl";


const Authors = () => {

    const {data,pending,error} = useFetch(BASE_URL + '/authors')
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