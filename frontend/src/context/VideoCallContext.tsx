// In un file come AppContext.tsx o nel componente principale
import { createContext, useState, ReactNode, useContext } from "react";

interface ChatContextType {
  isVideoCallActive: boolean;
  startVideoCall: () => void;
  endVideoCall: () => void;
  stream: MediaStream | null;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startVideoCall = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setStream(videoStream);
      setIsVideoCallActive(true);
    } catch (error) {
      console.log("Errore nell'accesso alla videochiamata:", error);
    }
  };

  const endVideoCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsVideoCallActive(false);
    setStream(null);
  };

  return (
    <ChatContext.Provider
      value={{
        isVideoCallActive,
        startVideoCall,
        endVideoCall,
        stream,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "useChatContext deve essere usato all'interno di un ChatProvider"
    );
  }
  return context;
};
