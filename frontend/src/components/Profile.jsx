import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Navbar from "./Navbar"
import useLogout from "../hooks/useLogout";
import Product from "./Product.jsx"
import useGetFavorites from "../hooks/useGetFavorites.js";
import useToggleFavorite from "../hooks/useToggleFavorite.js";
import useGetMyProducts from "../hooks/useGetMyProducts.js";
import 'primeicons/primeicons.css';
import '../style/Conversation.css'
import '../style/Home.css'


const Profile = () => {

    const { toggleFavorite } = useToggleFavorite();
    const { loading, logout } = useLogout()
    const { favoriteProducts } = useGetFavorites();
    const [userFavorites, setUserFavorites] = useState([]);
    const { myProducts } = useGetMyProducts();

    useEffect(() => {
        const storedFavorites = localStorage.getItem("userFavorites");
        if (storedFavorites) {
            setUserFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const LogoutButton = () => {
        
        return (
            <div>{!loading ? <button id="logout" onClick={logout}>log out</button> : <i className="pi pi-spin pi-spinner"></i>}</div>
        )
    }

    const MyProductList = () => {
        return (
            <div id="mypost-container">
            {myProducts.map((product) => {
                return (
                    <div className="mypost-content" key={product._id}>
                        {product.productName}
                    </div>
                )
            })}
            </div>
            
        )
    }

    const Profilecard = () => {

        const handleToggleFavorite = async (product) => {
            const productId = product._id;
    
            const updatedFavorites = userFavorites.includes(product._id)
                ? userFavorites.filter((id) => id !== product._id)
                : [...userFavorites, product._id];
    
            localStorage.setItem("userFavorites", JSON.stringify(updatedFavorites));
            setUserFavorites(updatedFavorites);
            await toggleFavorite(productId)
        }

        return (
            <div className="profilecard">
                <div className="header">
                    <div className="header-inner1">
                        <h2>Hello {JSON.parse(localStorage.getItem('darthrift-user')).username}</h2>
                        <LogoutButton />
                    </div>
                    <div className="header-inner2">
                        <p>My posts</p>
                        <div id="productList-container">
                        <MyProductList />
                        </div>
                    </div>
                </div>
                
                <div className="my-items">
                    <p>My favorites</p>
                    <div className="item-container">
                        {favoriteProducts && favoriteProducts.map((product) => (
                            <Product
                                key={product._id}
                                product={product}
                                toggleFavorite={() => handleToggleFavorite(product)}
                                isFavorite={userFavorites.includes(product._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
 
    return (
        <>
            <Navbar />
            <div className="profileContent">
                <Profilecard />
                <Link to="/post">
                    <button className="sellButton">SELL</button>
                </Link>
            </div>
        </>
        
    )
}

export default Profile