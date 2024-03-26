import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import '../style/Message.css'

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = message.senderId === authUser._id;
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? authUser.profilepic : selectedConversation?.profilepic;

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
		<div className={`${chatClassName}`}>
			<div>
				<div>
					<img id="message-pfp" src={profilePic} />
				</div>
			</div>
			<div>{message.message}</div>
			<div>{formattedTime}</div>
		</div>
	);
};
export default Message;