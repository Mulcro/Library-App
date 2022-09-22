import useFetch from "../hooks/getBooks";
import BookCard from "./bookCard";

const Books = () => {
    const {data, pending, error} = useFetch('http://localhost:5000/books')

    return ( 
        <div className="bookView">
            <h2>All Books</h2>
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
                <div className="book-display">
                    {data.map((book) => (
                        <div className="book-card" key={book.id}>
                            <div className="card-cover">
                                <div className="card-text">
                                    <div className="card-title">{book.title}</div>
                                    <div className="card-author">By {book.author.first_name} {book.author.last_name}</div>
                                </div>
                            </div>
                            
                        </div>
                    ))}
                </div>
            }
        </div>
        );
}
 
export default Books;