import { useState } from "react";


const CreateBook = ({authors,categories,categoriesError,authorsError,authorsPending,categoriesPending}) => {
    const [book,setBook] = useState({title: '', category: 0, author: 0, quantity: 0});

    const handleBookCreation = (book,e) => {
        e.preventDefault();
        console.log(book);
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
        <div className="create">
            {authorsError && 
                <div className="error">
                    There was an error in fetching your data
                </div>
            }
            {authorsPending && 
                <div>
                    loading..
                </div>
            }
            {categoriesError && 
                <div className="error">
                    There was an error in fetching your data
                </div>
            }
            {categoriesPending && 
                <div>
                    loading..
                </div>
            }
            {authors &&
                <>
                {categories &&
                    <form onSubmit={(e) => handleBookCreation(book,e)}>
                        <div className="createBook">
                            <label htmlFor="">Title</label>
                            <input type="text"  onChange={e => setBook({...book, title: e.target.value})}/>
                                <label htmlFor="">Category</label>
                            <select name="category" id="" onChange={e => setBook({...book, category: e.target.value})}>
                            {categories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.category}</option>
                            ))}
                            </select>
                            <label htmlFor="">Author</label>
                            <select name="" id="" onChange={e => setBook({...book, author: e.target.value})}>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>{author.first_name} {author.last_name}</option>
                                ))}
                             </select>
                             <label htmlFor="">Quantity</label>
                            <input type="number" onChange={e => setBook({...book, quantity: e.target.value})}/>
                             <input type="submit" />
                        </div>
                     </form>
                }
                </>
            }

        </div>
     );
}
 
export default CreateBook;