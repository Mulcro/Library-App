
const BookCard = ({books}) => {
    console.log(books);
    return ( 
        <div className="book-display">
            {books.map((book,index) => (
                <div key={index}>
                    <h4>{book.title}</h4>
                </div>
            ))}
        </div>
     );
}
 
export default BookCard;