import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import '../style/Message.css'

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
    const yourPic = selectedConversation?.profilepic;

    function padZero(number) {
        return number.toString().padStart(2, "0");
    }

    function extractTime(dateString) {
        const date = new Date(dateString);
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${hours}:${minutes}`;
    }
    const formattedTime = extractTime(message.createdAt);
    
	return (
		<div className={`chat-block ${chatClassName}`}>
			{fromMe ? <div></div> : <div> <img id="message-pfp" src={yourPic} /></div>}
            <div id="message-block">
                <div id="message-message">{message.message}</div>
                <div id="message-time">{formattedTime}</div>
            </div>
		</div>
	);
};
export default Message;