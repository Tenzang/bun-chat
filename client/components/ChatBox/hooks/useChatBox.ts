import { useCallback, useEffect, useState } from "react";

interface Message {
	id: string;
	author: string;
	content: string;
}

export function useChatBox(roomId: string) {
	// use roomId to fetch
	const [messages, setMessages] = useState<Message[]>(null);
	const [ws, setWs] = useState<WebSocket>(null);
	const [name, setName] = useState<string>(null);

	const sendMessage = useCallback(
		(content: string) => {
			ws.send(JSON.stringify({ content }));
		},
		[ws]
	);

	useEffect(() => {
		const handleIncomingMessage = ({ data }: MessageEvent<any>) => {
			const payload = JSON.parse(data);
			setMessages(payload.messages);
			if (payload.author) setName(payload.author); // TODO: separate into "message" & "open" event handlers
		};

		const ws = new WebSocket("ws://localhost:3000/ws"); // provide roomId as param to create connection in specific room

		ws.addEventListener("message", handleIncomingMessage);
		setWs(ws);

		return () => {
			ws.removeEventListener("message", handleIncomingMessage);
			ws.close();
		};
	}, []);

	return { name, messages, sendMessage };
}
