import { useEffect, useState } from 'react'
import '../style/ProductDetails.css'
import 'primeicons/primeicons.css';

const ProductDetails = (props) => {
    
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isFavorite, setIsFavorite] = useState(null)
    
    useEffect(() => {
        setSelectedProduct(props.selectedProduct)
    }, [props.selectedProduct])

    useEffect(() => {
        setIsFavorite(props.isFavorite)
    }, [props.isFavorite])

    const setSelectProductNull = () => {
        props.setSelectProductNull()
    }

    const toggleFavorite = (product) => {
        props.toggleFavorite(product)
    }

    if (selectedProduct) {
        const createdAt = selectedProduct.createdAt;
        const dateObj = new Date(createdAt);
        const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();
        const formattedDate = `${month}/${date}/${year}`;

        let imageUrl;
        if (typeof selectedProduct.img === 'string') {
            // If product.img is a URL or string, use it directly
            imageUrl = selectedProduct.img;
        } else if (selectedProduct.img instanceof Blob) {
            // If product.img is a Blob or File object, create a URL for it
            imageUrl = URL.createObjectURL(selectedProduct.img);
        }

        return (
            <>
                <div className="productPage">
                    <button onClick={setSelectProductNull}><i style={{ fontSize: '40px' }} className="pi pi-angle-left"></i></button>
                    <div className="productDetail">
                        {selectedProduct.img === null ? <img className="no-pic" src="src/assets/images.png"></img> : <img src={imageUrl} />}
                        <p className="product-name">{selectedProduct.name}</p>
                        <p className="product-price">$ {selectedProduct.price}</p>
                        <p className="product-date">{formattedDate}</p>
                        <p className="product-description">{selectedProduct.description}</p>
                        <p onClick={() => toggleFavorite(selectedProduct)} className="product-isFavorite">{isFavorite ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>}</p>
                        <button>Start Conversation</button>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductDetails;