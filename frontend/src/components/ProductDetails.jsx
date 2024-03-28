import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useStartMessage from '../hooks/useStartMessage';
import '../style/ProductDetails.css'
import 'primeicons/primeicons.css';

const ProductDetails = (props) => {
    
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isFavorite, setIsFavorite] = useState(null)
    const navigateto = useNavigate();
    

    const { startMessage } = useStartMessage();
    
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

    const handleclick = async (event) => {
        event.preventDefault();
        const senderId = selectedProduct.senderId;
        console.log(selectedProduct.productName)
        console.log(senderId)
        await startMessage(`${selectedProduct.productName} purchase request!`, senderId);
        navigateto('/chat');
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
                        {selectedProduct.img === null ? <img className="no-pic" src="src/assets/images.png"></img> : <img className="yes-pic" src={imageUrl} />}
                        <p className="product-name">{selectedProduct.name}</p>
                        <p className="product-price">$ {selectedProduct.price}</p>
                        <p className="product-date">{formattedDate}</p>
                        <p className="product-description">{selectedProduct.description}</p>
                        <p onClick={() => toggleFavorite(selectedProduct)} className="product-isFavorite">{isFavorite ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>}</p>
                        <button onClick={handleclick}>Start Conversation</button>
                    </div>
                </div>
            </>
        );
    }
}

export default ProductDetails;