import { useState } from "react"
import useSendMessage from "../hooks/useSendMessage";
import '../style/MessageContainer.css'

const MessageInput = () => {
    const [ message, setMessage ] = useState("")
    const { sendMessage } = useSendMessage();
    console.log("rerendeer")

    const handleTextClick = async (event) => {
        event.preventDefault();
        if (!message) return;
        await sendMessage(message)
        setMessage("")
    }

    return (
        <form id="sendText" onSubmit={handleTextClick}>
            <input id="sendTextInput" type="text" value={message} onChange={(e) => setMessage(e.target.value)} name="message"></input>
            <button id="sendTextButton">send</button>
        </form>
    )
}

export default MessageInput;