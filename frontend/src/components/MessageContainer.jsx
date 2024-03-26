import { useEffect } from "react";
import useConversation from "../zustand/useConversation";
import MessageInput from "./MessageInput.jsx"
import Messages from "./Messages.jsx";
import '../style/MessageContainer.css'
import 'primeicons/primeicons.css';


const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const NoChat = () => {
        return (
            <div className="flex-nochat">
                <p>Enjoy thrifting by starting a conversation!</p>
            </div>
        )
    }


    const handleConversationClick = () => {
        setSelectedConversation(null);
    };

    useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

    return (
        <div className="chatbox">{!selectedConversation ? <NoChat /> 
        : (
        <div>
            <div className="header2"><i onClick={handleConversationClick} style={{ fontSize: '40px' }} className="pi pi-angle-left"></i><span>To: </span><span id="username-message">{selectedConversation.username}</span></div>
            <Messages />
            <MessageInput />
        </div>
        )}
        </div>
    )
}

export default MessageContainer