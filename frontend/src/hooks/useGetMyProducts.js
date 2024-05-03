import { useState, useEffect } from "react"

const useGetMyProducts = () => {
    const [loading, setLoading] = useState(false);
    const [myProducts, setMyProducts] = useState([])

    useEffect(() => {
        const getMyProducts = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/products/myposts');
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setMyProducts(data);
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getMyProducts();
    },[])

    return { loading, myProducts }
}

export default useGetMyProducts