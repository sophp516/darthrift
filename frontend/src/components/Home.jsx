import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ProductDetails from './ProductDetails'
import Navbar from "./Navbar";
import 'primeicons/primeicons.css';

const Home = (props) => {

    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProductIndex, setSelectedProductIndex] = useState(null)
    
    // Changes in dependency variable are constantly updated locally through hook
    useEffect(() => {
        setProducts(props.products)
      }, [props.products])

    const selectProduct = (product, index) => {
        setSelectedProductIndex(index)
        setSelectedProduct(product)
    }

    const toggleFavorite = (index) => {
        console.log("home.jsx")
        props.toggleFavorite(index)
    }

    let productCards = []
    // prevent error when products list is empty
    if (products !== null) {
        // Use Object.entries when mapping over deconstructed objects
        productCards = Object.entries(products).map(([index, product]) => {
    
        let imageUrl;
        if (typeof product.img === 'string') {
            // If product.img is a URL or string, use it directly
            imageUrl = product.img;
        } else if (product.img instanceof Blob) {
            // If product.img is a Blob or File object, create a URL for it
            imageUrl = URL.createObjectURL(product.img);
        } return (
            <div className="productCard" key={index}>
                <div className="pic-container">
                    {product.img === null ? <img className="no-pic" onClick={() => selectProduct(product, index)} src="src/assets/images.png"></img> : <img className="pic" src={imageUrl} onClick={() => selectProduct(product)}/>}
                </div>
                <div className="cardText" onClick={() => selectProduct(product, index)}>
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">$ {product.price}</p>
                    <p className="product-date">{product.date}</p>
                </div>
                <div className="isFavorite" onClick={() => toggleFavorite(index)}>{product.isFavorite ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>}</div>
                
            </div>
            )
         })
    } 

    return (
        <div className={selectedProduct ? "mainContainer white" : "mainContainer"}>
            <Navbar />
            <main>
                {selectedProduct ? <ProductDetails products={products} toggleFavorite={toggleFavorite} selectedProduct={selectedProduct} selectedProductIndex={selectedProductIndex} /> : <div className="cardContainer">{productCards}</div>}
                <div className="buttonContainer">
                    <Link to="/post">
                        <button className="sellButton">Sell my item</button>
                    </Link>
                </div>
            </main>
        </div>

    )
}

export default Home