import { Link } from "react-router-dom";

const BookCard = ({books}) => {
    return ( 
        <div className="book-display">
        {books.map((book) => (
            <div className="book-card" key={book._id}>
                <div className="card-cover">
                    <div className="card-text">
                        <Link to={`/books/${book._id}`} className="card-title">{book.title}</Link>
                    </div>
                </div>
                
            </div>
        ))}
        </div>
     );
}
 
export default BookCard;