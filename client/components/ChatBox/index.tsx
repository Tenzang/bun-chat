import { useCallback, useState } from "react";
import { useChatBox } from "./hooks/useChatBox";

import styles from "./ChatBox.module.css";

export default () => {
	const [inputMessage, setInputMessage] = useState("");

	const { name, messages, sendMessage } = useChatBox();

	const handleInput = useCallback((e) => {
		setInputMessage(e.target.value);
	}, []);

	const handleSend = useCallback(
		(e) => {
			sendMessage(inputMessage);
			setInputMessage("");
		},
		[inputMessage]
	);

	return (
		<>
			<div>
				{messages
					? messages.map(({ id, author, content }) => (
							<div key={id} className={name === author ? styles.fancy : ""}>
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
