import { useCallback, useEffect, useState } from "react";

interface Message {
	id: number;
	author: string;
	content: string;
}

export function useChatBox() {
	const [messages, setMessages] = useState<Message[]>(null);
	const [ws, setWs] = useState<WebSocket>(null);

	const sendMessage = useCallback(
		(author: string, content: string) => {
			ws.send(JSON.stringify({ author, content }));
		},
		[ws]
	);

	useEffect(() => {
		const handleIncomingMessage = (e: MessageEvent<any>) => {
			setMessages(JSON.parse(e.data));
		};

		const ws = new WebSocket("ws://localhost:3000/ws");
		ws.addEventListener("message", handleIncomingMessage);
		setWs(ws);

		return () => {
			ws.removeEventListener("message", handleIncomingMessage);
			ws.close();
		};
	}, []);

	return { messages, sendMessage };
}
