import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { StreamChat } from "stream-chat";
import { apiFetch } from "../lib/api";
import { useAuth } from "@clerk/react";

const useChat = () => {
  const { id } = useParams();
  const { getToken } = useAuth();
  const { paid } = useOutletContext();

  const [client, setClient] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    let chatClientInstance = null;

    async function connectChat() {
      try {
        await apiFetch(`/api/orders/${id}/stream-channel`, {
          getToken,
          method: "POST",
        });

        const token = await apiFetch(`/api/stream/token`, {
          getToken,
          method: "POST",
        });

        if (!active) return;

        chatClientInstance = StreamChat.getInstance(token.apiKey);

        if (chatClientInstance.userID !== token.userId) {
          if (chatClientInstance.userID) {
            await chatClientInstance.disconnectUser();
          }

          await chatClientInstance.connectUser(
            { id: token.userId, name: token.name },
            token.token
          );
        }

        const channelInstance = chatClientInstance.channel(
          "messaging",
          `order-${id}`
        );
        await channelInstance.watch();

        if (active) {
          setClient(chatClientInstance);
        }
      } catch (e) {
        if (active) {
          setError(e.message);
        }
      }
    }

    connectChat();

    return () => {
      active = false;

      if (chatClientInstance) {
        chatClientInstance
          .disconnectUser()
          .catch((err) => console.error("Error disconnecting:", err));
        setClient(null);
      }
    };
  }, [paid, id, getToken]);

  const channel =
    client && id ? client.channel("messaging", `order-${id}`) : null;

  return {
    paid,
    client,
    error,
    channel,
  };
};

export default useChat;
