import { ReactNode } from "react";

interface ChatContainerProps {
  children: ReactNode; // Definizione del tipo per children
  colors: {
    bg: string;
  };
}
const ChatContainer = ({ children, colors }: ChatContainerProps) => {
  return (
    <div
      className="flex flex-col flex-grow w-full shadow-xl rounded-lg overflow-hidden"
      style={{ background: colors.bg }}
    >
      <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default ChatContainer;
