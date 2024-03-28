import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useStartMessage = () => {
	const [loading, setLoading] = useState(false);
    const { messages, setMessages } = useConversation();


	const startMessage = async (message, senderId) => {
		setLoading(true);
		try {
			const res = await fetch(`/api/messages/send/${senderId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const data = await res.json();
			if (data.error) throw new Error(data.error);

			setMessages([...messages, data]);
		} catch (error) {
			toast.error(error.message);
            console.log(error)
		} finally {
			setLoading(false);
		}
	};

	return { startMessage, loading };
};
export default useStartMessage;