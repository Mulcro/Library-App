from unicodedata import category
from flask import Flask, abort, jsonify, request
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
            books = Book.query.all()

            formattedBooks = [book.format() for book in books]
            
            return jsonify({
                "results": formattedBooks
            })
            
        except:
            print(sys.exc_info())
            abort(404)

        
    @app.route('/books/<int:bookId>', methods=['GET'])
    def getBook(bookId):

        try:
            book = Book.query.get(bookId)

            formattedBook = [book.format()]

            return jsonify({
                "results": formattedBook
            })

        except:
            print(sys.exc_info())
            abort(404)

    @app.route('/categories', methods=['GET'])
    def getCategories():
        try:
            categories = Category.query.all()

            formattedCategories = [category.format() for category in categories]

            return jsonify({
                "results": formattedCategories
            })
        except:
            print(sys.exc_info())
            abort(404)

    @app.route('/categories/<int:categoryId>', methods=['GET'])
    def getCategoryDetails(categoryId):
        try:
            category = Category.query.get(categoryId)

            formattedCategory = category.format()

            return jsonify({
                "results": formattedCategory
            })
        except:
            print(sys.exc_info())
            abort(404)


    @app.route('/authors', methods=['GET'])
    def getAuthors():
        try:
            authors = Author.query.all()

            formattedAuthors = [author.format() for author in authors]

            return jsonify({
                "results": formattedAuthors
            })
        except:
            print(sys.exc_info())
            abort(404)

    @app.route('/authors/<int:authorId>', methods=['GET'])
    def getAuthorDetails(authorId):
        try:
            author = Author.query.get(authorId)

            formattedAuthor = author.format()

            return jsonify({
                "results": formattedAuthor
            })
        except:
            print(sys.exc_info())
            abort(404)

    @app.route('/categories/<int:categoryId>/books', methods=['GET'])
    def getBooksByCategory(categoryId):
        try:
            books = Book.query.filter(Book.category == categoryId).all()

            formattedBooks = [book.format() for book in books]

            return jsonify({
                "results": formattedBooks
            })

        except:
            print(sys.exc_info())
            abort(404)

    @app.route('/authors/<int:authorId>/books', methods=['GET'])
    def getBooksByAuthor(authorId):
        try:
            books = Book.query.filter(Book.author == authorId).all()

            formattedBooks = [book.format() for book in books]

            return jsonify({
                "results": formattedBooks
            })

        except:
            print(sys.exc_info())
            abort(404)

    @app.route('/books',methods=['POST'])
    def createBook():
        try:
            body = request.get_json()
            
            print(body)
            book = Book(
                title=body['title'],
                author=body['author'],
                category=body['category'],
                quantity=body['quantity']
            )

            book.insert()

            return jsonify({
                "success": True
            })

        except:
            print(request.get_data)
            print(sys.exc_info())
            abort(422)


    @app.route('/authors',methods=['POST'])
    def postAuthor():
        try:
            body = request.get_json()

            author = Author(
                first_name=body['firstName'],
                last_name=body['lastName']
            )

            author.insert()

            return jsonify({
                "success": True
            })

        except:
            print(sys.exc_info())
            abort(422)
    
    
    @app.route('/categories',methods=['POST'])
    def postCategory():
        try:
            body = request.get_json()

            category = Category(
                categoryName=body['name']
            )

            category.insert()

            return jsonify({
                "success": True
            })

        except:
            print(sys.exc_info())
            abort(422)


    @app.route('/books/<int:bookId>', methods=['DELETE'])
    def deleteBook(bookId):
        try:
            book = Book.query.get(bookId)

            book.delete()

            return jsonify({
                'success': True
            })

        except:
            print(sys.exc_info())
            abort(405)
    
    @app.route('/authors/<int:authorId>', methods=['DELETE'])
    def deleteAuthor(authorId):
        try:
            author = Author.query.get(authorId)

            author.delete()

            return jsonify({
                'success': True
            })

        except:
            print(sys.exc_info())
            abort(405)

    @app.route('/categories/<int:categoryId>', methods=['DELETE'])
    def deleteCategory(categoryId):
        try:
            category = Category.query.get(categoryId)

            category.delete()

            return jsonify({
                'success': True
            })

        except:
            print(sys.exc_info())
            abort(405)


    #ERROR HANDLING

    @app.errorhandler(404)
    def notFound(error):
        return jsonify({
            'success': False,
            'error': 404,
            'message': 'Resource was not found'
        })
    @app.errorhandler(405)
    def notAllowed(error):
        return jsonify({
            'success': False,
            'error': 405,
            'message': 'Method not allowed'
        })
    @app.errorhandler(422)
    def unprocessable(error):
        return jsonify({
            'success': False,
            'error': 422,
            'message': 'Unprocessable'
        })
    @app.errorhandler(400)
    def unprocessable(error):
        return jsonify({
            'success': False,
            'error': 400,
            'message': 'Bad request'
        })
    
    if __name__ == '__main__':
        app.run(debug=True);

createApp()