import { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Post from "./components/Post.jsx"
import ProductDetails from "./components/ProductDetails.jsx"
import Signup from "./components/Signup.jsx";
import Profile from './components/Profile.jsx';
import './App.css'

function App() {
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
    <Router>
      <Routes>
        <Route path="/home" element={<Home products={products} toggleFavorite={toggleFavorite} />}></Route>
        <Route path="/productdetails" element={<ProductDetails products={products} toggleFavorite={toggleFavorite}/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/post" element={<Post addProduct={addProduct} />}></Route>
        <Route path="/api/auth/signup" element={<Signup/>}></Route>
        <Route path="/api/auth/login" element={<Login/>}></Route>
        <Route path="*" element={<Navigate to="/home" />}></Route>
      </Routes>
    </Router>
  )
}

export default App;