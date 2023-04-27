import { useCallback, useEffect, useState } from "react";
import API, { HandleMessage, Message } from "utils/API";

export function useChatBox(roomId: string) {
  const [messages, setMessages] = useState<Message[]>(null);
  const [ws, setWs] = useState<ReturnType<typeof API.joinRoom>>(null);
  const [name, setName] = useState<string>(null);

  const sendMessage = useCallback(
    (content: string) => {
      ws.send(content);
    },
    [ws]
  );

  useEffect(() => {
    const handleMessage: HandleMessage = ({ data: { author, messages } }) => {
      console.log(author);
      setName(author);
      setMessages(messages);
    };

    const ws = API.joinRoom(roomId, handleMessage);
    setWs(ws);

    return () => {
      API.leaveRoom(ws, handleMessage);
    };
  }, []);

  return { name, messages, sendMessage };
}
