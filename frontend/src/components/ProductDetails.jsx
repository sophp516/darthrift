import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../style/ProductDetails.css'
import 'primeicons/primeicons.css';

const ProductDetails = (props) => {
    
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [selectedProductIndex, setSelectedProductIndex] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedProduct(props.selectedProduct)
        setSelectedProductIndex(props.selectedProductIndex)
    }, [props.selectedProductIndex, props.selectedProduct, navigate])


    useEffect(() => {
        setProducts(props.products)
    }, [props.products])


    const toggleFavorite = () => {
        if (selectedProductIndex) {
            props.toggleFavorite(selectedProductIndex);
        }
    }

    if (selectedProductIndex) {
        const product = products[selectedProductIndex]
        if (typeof product.img === 'string') {
            imageUrl = product.img;
        } else if (product.img instanceof Blob) {
            imageUrl = URL.createObjectURL(product.img);
        }
        return (
            <div className="productPage">
                <button onClick={() => navigate('./home')}><i style={{ fontSize: '40px' }} className="pi pi-angle-left"></i></button>
                <div className="productDetail">
                    {product.img === null ? <img className="no-pic" src="src/assets/images.png"></img> : <img src={imageUrl} />}
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">$ {product.price}</p>
                    <p className="product-date">{product.date}</p>
                    <p className="product-description">{product.description}</p>
                    <p className="product-isFavorite" onClick={toggleFavorite}>{product.isFavorite ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>}</p>
                    <button>Start Conversation</button>
                </div>
            </div>
        )
    } else {
        return null
    }
}

export default ProductDetails;