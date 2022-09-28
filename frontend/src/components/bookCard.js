
const BookCard = ({books}) => {
    return ( 
        <div className="book-display">
        {books.map((book) => (
            <div className="book-card" key={book.id}>
                <div className="card-cover">
                    <div className="card-text">
                        <div className="card-title">{book.title}</div>
                        <div className="card-author">By {book.authorName.first_name} {book.author.last_name}</div>
                    </div>
                </div>
                
            </div>
        ))}
        </div>
     );
}
 
export default BookCard;