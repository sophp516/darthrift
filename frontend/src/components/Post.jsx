import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import usePost from '../hooks/usePost';
import '../style/Post.css'

const Post = () => {

    const [newProduct, setNewProduct] = useState({ 
        img: null,
        productName: "",
        price: "",
        description: "",
        })

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { postHook } = usePost();
    
    const addProduct = async (event) => {
        event.preventDefault();
        if (newProduct.productName !== "" && (newProduct.price !== null || typeof newProduct.price === 'number')) {

            // setNewProduct(prevState => ({...prevState, date: `${month}/${date}/${year}`}))
            // using newProduct here doesn't work because the new date value is not reflected in the render    

            await postHook(newProduct)
            setNewProduct({ 
                img: null,
                productName: "",
                price: null,
                date: "",
                description: "",
                isSold: false,
                })

            navigate('/');
        } 
    }


  /*   const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        const selectedFile = files[0];
        (type === "file" && selectedFile
            ? setNewProduct(prevState => ({ ...prevState, [name]: selectedFile }))
            : setNewProduct(prevState => ({ ...prevState, [name]: value }))
        );
        console.log(newProduct)
    }; */

    
    const handleChange = (event) => {
        const { name, type, files } = event.target;

        if (type === "file") {
            const selectedFile = files[0];
            // Process the selected file as needed
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = () => {
                const imageData = reader.result;
                setNewProduct(prevState => ({ ...prevState, img: imageData }));
            };
            reader.readAsDataURL(selectedFile);
            }

        } else {
            // For other input types, update the state normally
            setNewProduct(prevState => ({ ...prevState, [name]: event.target.value }));
        }
        console.log(newProduct);
    };


    return (
        <>
        <Navbar />
        <div className="post">  
            <div className="button">
                <button className="closeButton" onClick={() => navigate('/')}><i style={{ fontSize: '40px' }} className="pi pi-angle-left"></i></button>
            </div>
            <div className="postCard">
                <form id="postId">
                    <div id="file-div" className="input">
                        <input id="file" name="img" type="file" onChange={handleChange} ref={fileInputRef} ></input>
                    </div>
                    <div className="input">
                        <input placeholder="Name your Goody" name="productName" value={newProduct.productName} type="text" onChange={handleChange}></input>
                    </div>
                    <div className="input">
                        <input placeholder="Set Price" name="price" value={newProduct.price} type="number" onChange={handleChange}></input>
                    </div>
                    <div className="input">
                        <textarea placeholder="Describe your Goody" name="description" value={newProduct.description} onChange={handleChange}></textarea>
                    </div>
                    <div className="buttonContainer">
                        <button onClick={addProduct}>Post</button>
                    </div>
                </form>
            </div>
        </div>
        </>  
    )
}

export default Post