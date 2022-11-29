import { Link } from "react-router-dom";
import BASE_URL from "../api/baseUrl";
import useFetch from "../hooks/useFetch";

const Categories = () => {
    const url = BASE_URL + '/categories';

    const {data,pending,error} = useFetch(url);


    return ( 
        <div className="categoryView">
            <h2>Browse by Category</h2>
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
                <div className="categories">
                    <ul className="categoryList">
                        {data.map((item)=>(
                            <Link to={`/categories/${item._id}/books`}><li key={item._id}>{item.categoryName}</li></Link>
                        ))}
                    </ul>
                </div>
            }
        </div>
     );
}
 
export default Categories;