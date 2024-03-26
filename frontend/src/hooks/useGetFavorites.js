import { useState, useEffect } from "react"

const useGetFavorites = () => {
    const [loading, setLoading] = useState(false);
    const [favoriteProducts, setFavoriteProducts] = useState([])

    useEffect(() => {
        const getFavorites = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users/getfavorites');
                if (!res.ok) {
                    throw new Error('Failed to fetch favorites');
                }
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error)
                }
                setFavoriteProducts(data);
            } catch (error) {
                console.log(error.message)
            } finally {
                setLoading(false)
            }
        }
        getFavorites();
    },[])

    return { loading, favoriteProducts }
}

export default useGetFavorites