import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
// import Slider from './components/Slider/Slider';
import Login from './components/User/Login/Login';
import Remind from './components/User/Remind/Remind';
import Footer from './components/Footer/Footer';
import Signup from './components/User/Signup/Signup';
import Categories from './components/Categories/Categories';
import Cart from  './components/Cart/Cart'
import Category from './components/Category/Category'
import Profile from './components/User/Profile/Profile'
import CardPage from './components/CardPage/CardPage';
import { useEffect } from 'react';
import axios from 'axios'
import { login } from './redux/actionCreate/userActionCreate';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    axios('http://localhost:4000/refresh',{
      withCredentials: true,
    })
    .then(({ data }) => {
      dispatch(login(data))
    })
  }, [])

  return (
    <BrowserRouter>

      <header>
        <Nav />
      </header>
        <main>
          <Routes>
            <Route path="/" element={<Main />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/remind" element={<Remind />}/>
            <Route path="/categories" element={<Categories />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/categories/:id" element={<Category />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/card/:id" element={<CardPage />}/>
          </Routes>
        </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
}

export default App;
