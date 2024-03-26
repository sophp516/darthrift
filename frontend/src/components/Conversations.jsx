import useGetConversations from "../hooks/useGetConversations.js";
import Conversation from "./Conversation.jsx";
import Navbar from "./Navbar.jsx";
import MessageContainer from "./MessageContainer.jsx";
import '../style/Conversation.css'

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
    
	return (
		<main>
            <Navbar></Navbar>
            <div className="chat">
                <div className="conversations">
                    {conversations.map((conversation) => (
                        <Conversation
                            key={conversation._id}
                            conversation={conversation}
                        />
                    ))}

                    {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
                </div>
                <div className="messageContainer"><MessageContainer /></div>
            </div>
		</main>
	);
};
export default Conversations;