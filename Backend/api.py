from flask import Flask, abort, jsonify
from flask_cors import CORS
import sys
from models.models import Book, Author, Category, setupDb

def createApp():
    app = Flask(__name__)
    setupDb(app)
    CORS(app)

    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type, Authorization, true"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS"
        )

        return response

    

    #ENDPOINTS

    @app.route('/books',methods=['GET'])
    def getBooks():

        try:
            books = Book.query.join(Author).filter(Book.author == Author.id).all()
            categories = Category.query.all()

            formattedBooks = [book.format() for book in books]
            formattedCategories = [category.format() for category in categories]
            
            return jsonify({
                "books": formattedBooks,
                "categories": formattedCategories
            })
            
        except:
            print(sys.exc_info())
            abort(404)

    if __name__ == '__main__':
        app.run(debug=True);
        
createApp()