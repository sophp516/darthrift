import { useState, useEffect } from "react"

const useToggleFavorite = () => {
    
    const toggleFavorite = async (productId) => {

        try {
            const res = await fetch("/api/users/addfavorite", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({productId})
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

        } catch (error) {
            console.log(error)  
        } 
    }
    return { toggleFavorite }
}

export default useToggleFavorite;