import useConversation from "../zustand/useConversation";
import useGetConversations from "../hooks/useGetConversations";
import Navbar from "./Navbar";
import '../style/Conversation.css'

const Conversation = ({ conversation, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	// const isSelected = selectedConversation?._id === conversation._id;

	return (
		<div className="conversation">
			<div onClick={() => setSelectedConversation(conversation)}>
				<div>
					<img id="pfp" src={conversation.profilepic} alt='user avatar' />
				</div>

				<div>
					<div>
						<p>{conversation.username}</p>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider' />}
		</div>
	);
};

export default Conversation;