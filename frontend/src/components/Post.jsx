import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import '../style/Post.css'

const Post = (props) => {

    const [newProduct, setNewProduct] = useState({ 
        img: null,
        name: "",
        price: "",
        date: "",
        description: "",
        isFavorite: false,
        isSold: false,
        })

        const navigate = useNavigate();
    
    const addProduct = () => {
        const alphanumericRegex = /[a-zA-Z0-9]/;
        if ((newProduct.name !== "" || alphanumericRegex.test(newProduct.name)) && (newProduct.price !== null || typeof newProduct.price === 'number')) {

            const today = new Date();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const date = today.getDate();

            // setNewProduct(prevState => ({...prevState, date: `${month}/${date}/${year}`}))
            // using newProduct here doesn't work because the new date value is not reflected in the render
            const updatedProduct = {
                ...newProduct,
                date: `${month}/${date}/${year}`
            };    

            props.addProduct(updatedProduct)
            setNewProduct({ 
                img: null,
                name: "",
                price: null,
                date: "",
                description: "",
                isFavorite: false,
                isSold: false,
                })
            navigate('/home');
        } else {
            alert("Invalid or missing input. Try again!")
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
        const selectedFile = files && files[0];
        if (type === "file" && selectedFile) {
            // Process the selected file as needed
            console.log('Selected file:', selectedFile.name);
            setNewProduct(prevState => ({ ...prevState, [name]: selectedFile }));
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
                <button className="closeButton" onClick={() => navigate('./home')}>X</button>
            </div>
            <div className="postCard">
                <form action="POST">
                    <div className="input">
                        <input name="img" type="file" onChange={handleChange}></input>
                    </div>
                    <div className="input">
                        <input placeholder="Name your Goody" name="name" value={newProduct.name} type="text" onChange={handleChange}></input>
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