import { useRouter } from "next/router";
import { useEffect } from "react";
import ChatBox from "../../components/ChatBox";

export default () => {
	const { id } = useRouter().query;

	useEffect(() => {});

	return <ChatBox roomId={id as string} />;
};
