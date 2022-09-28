import { useState } from "react";

const CreateBook = () => {
    const [book,setBook] = useState({title: '', category: '', author: '', quantity: 0});


    const handleBookCreation = (book,e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        }
        fetch('http://localhost:5000/books', options)
        .then(res => {
            alert(`${book.title} has succesfully been posted!`)
            return res.json();
        })
        .catch(err => {
            console.error(err);
        })
    }
    return ( 
        <form onSubmit={(e) => handleBookCreation(book,e)}>
            <div className="createBook">
                <label htmlFor="">Title</label>
                <input type="text"  onChange={e => setBook({...book, title: e.target.value})}/>
                <label htmlFor="">Category</label>
                <input type="text" onChange={e => setBook({...book, category: e.target.value})}/>
                <label htmlFor="">Author</label>
                <input type="text" onChange={e => setBook({...book, author: e.target.value})}/>
                <label htmlFor="">Quantity</label>
                <input type="number" onChange={e => setBook({...book, quantity: e.target.value})}/>
                <input type="submit" />
            </div>
        </form>
     );
}
 
export default CreateBook;