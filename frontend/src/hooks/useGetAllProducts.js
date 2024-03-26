import { useState, useEffect } from "react"
import toast from "react-hot-toast";

const useGetAllProducts = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([])

    useEffect(() => {
        const getAllProducts = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/products/allposts');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setProducts(data);
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getAllProducts();
    },[])

    return { loading, products }
}

export default useGetAllProducts
