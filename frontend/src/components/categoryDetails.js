import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import BookCard from "./bookCard";

const CategoryDetails = () => {
    const {id} = useParams();

    const {data:categoryDetails} = useFetch(`http://localhost:5000/categories/${id}`);
    const {data:books,pending,error} = useFetch(`http://localhost:5000/categories/${id}/books`);

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
                    <h3 className="categoryTitle">{categoryDetails.category}</h3>
                    {books &&
                        <BookCard books={books}/>
                    }
                </div>
            }
        </div>
     );
}
 
export default CategoryDetails;