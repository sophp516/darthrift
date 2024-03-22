import { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Post from "./components/Post.jsx"
import ProductDetails from "./components/ProductDetails.jsx"
import Signup from "./components/Signup.jsx";
import Profile from './components/Profile.jsx';
import { Toaster } from "react-hot-toast";
import './App.css'
import { useAuthContext } from './context/AuthContext.jsx';
import Conversations from './components/Conversations.jsx';

function App() {
  const {authUser} = useAuthContext();
  const [products, setProducts] = useState([
    { img: null,
      name: "clothes",
      price: 10,
      date: "3/9/2024",
      description: "from korea",
      isFavorite: false,
    }
  ])

  const toggleFavorite = (index) => {
    const updatedProducts = products.map((product, i) => {
      if (index == i) {
        return {...product, isFavorite: !product.isFavorite}
      } else {
        return product
      }
    })
    console.log("app.jsx")
    setProducts(updatedProducts)
  }

  const addProduct = (product) => {
    setProducts(prevProducts => {
      return [product, ...prevProducts]
    })
  }

  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <Home products={products} toggleFavorite={toggleFavorite} /> : <Navigate to={"/login"} />}></Route>
        <Route path="/productdetails" element={<ProductDetails products={products} toggleFavorite={toggleFavorite}/>}></Route>
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to={"/login"} />}></Route>
        <Route path="/post" element={<Post addProduct={addProduct} />}></Route>
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup/>}></Route>
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login/>}></Route>
        <Route path="/chat" element={<Conversations />}></Route>
      </Routes>
      <Toaster />
    </>
  )
}

export default App;