from gettext import NullTranslations
from unicodedata import category
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from settings import DB_NAME, DB_USER, DB_PASSWORD


databaseName = "library_app"
databasePath = "postgresql://{}:{}@{}/{}".format(DB_USER,DB_PASSWORD,"localhost:5432",DB_NAME)

db = SQLAlchemy()

def setupDb(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = databasePath
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.app = app
    db.init_app(app)
    db.create_all()


# class Users(Model):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key = True)
#     username = Column(String, nullable = False)
#     password = Column(String, nullable = False)
#     roleId = Column(Integer, ForeignKey("role.id"))


# class Roles(Model):
#     __tablename__ = "roles"

#     id = Column(Integer, primary_key = True)
#     permissions = Column(ARRAY, nullable = False)


class Book(db.Model):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    author = Column(Integer, ForeignKey("authors.id"), nullable=False)
    category = Column(Integer, ForeignKey("categories.id"), nullable = False)
    available = Column(Boolean, nullable=False, default=False)
    quantity = Column(Integer, nullable=False)

    def format(self):

        return {
            "id": self.id,
            "title": self.title,
            "author": {
                "first_name": self.ref_author.first_name,
                "last_name": self.ref_author.last_name
            },
            "category": self.ref_category.categoryName,
            "quantity": self.quantity
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()

class Category(db.Model):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    categoryName = Column(String, nullable = False)
    book = db.relationship('Book', backref='ref_category', lazy=True) 

    def format(self):

        return {
            "id": self.id,
            "category": self.categoryName
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()

class Author(db.Model):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable = False)
    last_name = Column(String, nullable = False)
    books = db.relationship('Book', backref='ref_author', lazy=True)


    def format(self):

        return {
            "id": self.id,
            "author": self.authorName
        }

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()