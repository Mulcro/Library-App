import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";


const Authors = () => {

    const {data,pending,error} = useFetch('http://localhost:5000/authors')
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
                            <Link to={`/authors/${item.id}/books`}><li key={item.id}>{item.first_name} {item.last_name}</li></Link>
                        ))}
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default Authors;