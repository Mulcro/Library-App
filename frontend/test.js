import fetch from "node-fetch";



const getBooks = async (url) => {
    let books;
    try{
        const response = await fetch(url);
        console.log(response);

        books = response
    }
    catch (error){
        console.log(error);
        books = []
    }

    return books;
}

getBooks('127.0.0.1/books')