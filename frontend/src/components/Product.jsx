import '../style/Home.css'

const Product = ({ product, selectProduct, toggleFavorite, isFavorite }) => {

    const createdAt = product.createdAt;
    const dateObj = new Date(createdAt);
    const month = dateObj.getMonth() + 1; // Months are zero-based, so add 1
    const date = dateObj.getDate();
    const year = dateObj.getFullYear();
    const formattedDate = `${month}/${date}/${year}`;

    let imageUrl;
        if (typeof product.img === 'string') {
            // If product.img is a URL or string, use it directly
            imageUrl = product.img;
        } else if (product.img instanceof Blob) {
            // If product.img is a Blob or File object, create a URL for it
            imageUrl = URL.createObjectURL(product.img);
        } return (
            <div className="productCard">
                <div className="pic-container">
                    {product.img === null ? <img className="no-pic" onClick={() => selectProduct(product)} src="src/assets/images.png"></img> 
                    : <img className="pic" src={imageUrl} onClick={() => selectProduct(product)}/>}
                </div>
                <div className="cardText" onClick={() => selectProduct(product)}>
                    <p className="product-name">{product.productName}</p>
                    <p className="product-price">$ {product.price}</p>
                    <p className="product-date">{formattedDate}</p>
                </div>
                <div className="isFavorite" onClick={() => toggleFavorite(product)}>{isFavorite ? <i className="pi pi-heart-fill"></i> : <i className="pi pi-heart"></i>}</div>
                
            </div>
        )
}

export default Product