// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Books from './components/books.js';
import Home from './components/home.js';
import Categories from './components/categories.js';
import Authors from './components/authors.js';
import CategoryDetails from './components/categoryDetails.js';
import AuthorDetails from './components/authorsDetails.js';
import LoginForm from './components/loginForm.js';
import PostBook from './components/postbook.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Sidebar/>
        <div className="display">
          <Switch>
            <Route path='/' element={<Home/>}/>
            <Route path='/books' element={<Books/>}/>
            <Route path='/categories' element={<Categories/>}/>
            <Route path='/categories/:id/books' element={<CategoryDetails/>}/>
            <Route path='/authors' element={<Authors/>}/>
            <Route path='/authors/:id/books' element={<AuthorDetails/>}/>
            <Route path='/login' element={<LoginForm/>}/>
            <Route path='/createBook' element={<PostBook/>}/>
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
