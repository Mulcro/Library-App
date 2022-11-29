import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import BookCard from "./bookCard";
import BASE_URL from "../api/baseUrl";

const CategoryDetails = () => {
    const {id} = useParams();

    const {data:categoryDetails} = useFetch(BASE_URL + `/categories/${id}`);
    const {data:books,pending,error} = useFetch(BASE_URL + `/categories/${id}/books`);

    return ( 
        <div className="detailedCategoryView">
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
            {categoryDetails &&
                <div className="detailView">
                    {console.log(categoryDetails)}
                    <h3 className="categoryTitle">{categoryDetails.categoryName}</h3>
                    {books &&
                        <BookCard books={books}/>
                    }
                </div>
            }
        </div>
     );
}
 
export default CategoryDetails;