import useGetConversations from "../hooks/useGetConversations";
import Conversation from "./Conversation";
import Navbar from "./Navbar";
import '../style/Conversation.css'

const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	return (
		<div>
            <Navbar></Navbar>
            <div className="conversations">
                {conversations.map((conversation, idx) => (
                    <Conversation
                        key={conversation._id}
                        conversation={conversation}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))}

                {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
            </div>
		</div>
	);
};
export default Conversations;