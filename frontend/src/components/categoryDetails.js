import { useParams } from "react-router-dom";
import BookCard from "./bookCard";
import BASE_URL from "../api/baseUrl";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const CategoryDetails = () => {
    const {id} = useParams();
    const {user} = useAuth();
    const {data:categoryDetails} = useAxios(BASE_URL + `/categories/${id}`); //removed accessToken as cookie auth isn't working
    const {data:books,pending,error} = useAxios(BASE_URL + `/categories/${id}/books`); //removed accessToken as cookie auth isn't working

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