import { useRef } from "react"
import useGetMessages from "../hooks/useGetMessages"
import Message from "./Message"
import '../style/Message.css'

const Messages = () => {
    const { messages } = useGetMessages();
    console.log(messages)
    //useListenMessages();
    const lastMessageRef = useRef();
    return (
        <div id="messages">
            {messages.length > 0 &&
            messages.map((message) => (
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            ))}
            {messages.length === 0 && (
				<p>Send a message to start the conversation</p>
			)}
        </div>
    )
}

export default Messages