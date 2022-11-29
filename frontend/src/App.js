// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import { UserContext } from './context/userContext.js';
import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Books from './components/books.js';
import Home from './components/home.js';
import Categories from './components/categories.js';
import Authors from './components/authors.js';
import CategoryDetails from './components/categoryDetails.js';
import AuthorDetails from './components/authorsDetails.js';
import Search from './components/search.js';
import Register from './components/register.js';
import Login from './components/login.js';
import NotFound from './components/notFound.js';
import { useState } from 'react';
import BookDetail from './components/Book/bookDetail.js';
import PostBook from './components/Admin/-Book/postbook.js';
import PostAuthor from './components/Admin/-Author/postAuthor.js';
import PostCategory from './components/Admin/-Category/postCategory.js';
import Admin  from './components/Admin/admin';



function App() {

  const [user, setUser] = useState(null);

  return (
    <Router>
      <UserContext.Provider value={{user,setUser}}>
        <div className="App">
          <Navbar/>
          <Sidebar/>
          <div className="display">
            <Switch>

              {/* {Public Routes} */}
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/' element={<Home/>}/>
              <Route path='/books' element={<Books/>}/>
              <Route path='/books/:bookID' element={<BookDetail/>}/>
              <Route path='/categories' element={<Categories/>}/>
              <Route path='/search' element={<Search/>}/>

              {/* Protected Routes */}
              <Route path="/admin" element={<Admin/>}/>
              <Route path='/categories/:id/books' element={<CategoryDetails/>}/>
              <Route path='/authors' element={<Authors/>}/>
              <Route path='/authors/:id/books' element={<AuthorDetails/>}/>
              <Route path='/createbook' element={<PostBook/>}/>
              <Route path="/createauthor" element={<PostAuthor/>}/>
              <Route path="/createcategory" element={<PostCategory/>}/>

              {/* 404 */}
              <Route path='*' element={<NotFound/>}/>

            </Switch>
          </div>
        </div>
      </UserContext.Provider>
    </Router>

  );
}

export default App;
