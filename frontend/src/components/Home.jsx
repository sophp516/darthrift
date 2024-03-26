import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import useGetAllProducts from "../hooks/useGetAllProducts";
import useToggleFavorite from "../hooks/useToggleFavorite.js";
import ProductDetails from "./ProductDetails.jsx"
import Product from "./Product.jsx"
import Navbar from "./Navbar";
import 'primeicons/primeicons.css';
import '../style/Home.css'

const Home = () => {

    const [selectedProduct, setSelectedProduct] = useState("")
    const [userFavorites, setUserFavorites] = useState([]);

    const { loading, products } = useGetAllProducts();
    const { toggleFavorite } = useToggleFavorite();

    useEffect(() => {
        const storedFavorites = localStorage.getItem("userFavorites");
        if (storedFavorites) {
            setUserFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const selectProduct = (product) => {
        setSelectedProduct(product)
    }

    const setSelectProductNull = () => {
        setSelectedProduct("")
    }

    const handleToggleFavorite = async (product) => {
        const productId = product._id;

        const updatedFavorites = userFavorites.includes(product._id)
            ? userFavorites.filter((id) => id !== product._id)
            : [...userFavorites, product._id];

        localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
        setUserFavorites(updatedFavorites);
        await toggleFavorite(productId)
    }

    if (loading) {
        return (
            <div className="buttonContainer">
                <Link to="/post">
                    <button className="sellButton">Sell my item</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div className={selectedProduct ? "mainContainer white" : "mainContainer"}>
                <Navbar />
                <main>
                    {selectedProduct ? <ProductDetails 
                                        setSelectProductNull={setSelectProductNull} 
                                        toggleFavorite={() => handleToggleFavorite(selectedProduct)} 
                                        isFavorite={userFavorites.includes(selectedProduct._id)} 
                                        selectedProduct={selectedProduct} /> 
                    : <div className="cardContainer">
                        {products.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                                selectProduct={selectProduct}
                                toggleFavorite={() => handleToggleFavorite(product)}
                                isFavorite={userFavorites.includes(product._id)}
                            />
                ))}</div>}
                    <div className="buttonContainer">
                        <Link to="/post">
                            <button className="sellButton">Sell my item</button>
                        </Link>
                    </div>
                </main>
            </div>
    
        )
    }
    
}

export default Home