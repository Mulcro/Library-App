// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom';
import Navbar from './components/navbar.js';
import Sidebar from './components/sidebar.js';
import Books from './components/books.js';
import Home from './components/home.js';

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
          </Switch>
        </div>
      </div>
    </Router>

  );
}

export default App;
