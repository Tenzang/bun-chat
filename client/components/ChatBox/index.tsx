import { useCallback, useState } from "react";
import { useChatBox } from "./hooks/useChatBox";

export default () => {
	const [inputMessage, setInputMessage] = useState("");

	const { messages, sendMessage } = useChatBox();

	const handleInput = useCallback((e) => {
		setInputMessage(e.target.value);
	}, []);

	const handleSend = useCallback(
		(e) => {
			sendMessage("Loden", inputMessage);
			setInputMessage("");
		},
		[inputMessage]
	);

	return (
		<>
			<div>
				{messages
					? messages.map(({ id, author, content }) => (
							<div key={id}>
								<p>{author}</p>
								<p>{content}</p>
							</div>
					  ))
					: "Loading..."}
			</div>
			<input
				placeholder="type your message here..."
				value={inputMessage}
				onChange={handleInput}
			></input>
			<button onClick={handleSend}>send</button>
		</>
	);
};
