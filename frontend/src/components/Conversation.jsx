import useConversation from "../zustand/useConversation.js";
import '../style/Conversation.css'

const Conversation = ({ conversation }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;

	const handleConversationClick = () => {
        console.log("Conversation clicked:", conversation);
        setSelectedConversation(conversation);
    };

	return (
		<div className={`conversation-block ${isSelected ? "selected" : "not-selected"}`} onClick={() => handleConversationClick(conversation)}>
			<div className="profile-holder">
				<div>
					<img id="pfp" src={conversation.profilepic} alt='user avatar' />
				</div>

				<div>
					<div>
						<p>{conversation.username}</p>
					</div>
				</div>
			</div>
		</div>
		
	);
};

export default Conversation;