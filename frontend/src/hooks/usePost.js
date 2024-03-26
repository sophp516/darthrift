import toast from "react-hot-toast"

const usePost = () => {
    const postHook = async ({img, productName, price, description}) => {
        try {
            const res = await fetch("/api/products/post", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({img, productName, price, description})
            })
            const data = await res.json();
            if(data.error) {
                throw new Error(data.error)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    return { postHook }
}

export default usePost;