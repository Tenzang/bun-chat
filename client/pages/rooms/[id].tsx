import { useRouter } from "next/router";
import ChatBox from "../../components/ChatBox";

export default () => {
  const { id } = useRouter().query;

  return id && <ChatBox roomId={id as string} />;
};
