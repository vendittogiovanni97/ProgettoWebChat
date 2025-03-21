import Header from "./header";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { themeColors } from "../../theme/themeColor";
import ChatContainer from "./chatContainer";
import MessageComponents from "./messageComponent";
import InputBar from "./inputSend";

const ChatWindows1 = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const theme = useTheme();

  const colors = themeColors[theme.palette.mode];

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  //fare uno stack con box all'interno, creare un auth context per la video chiamata

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 pt-[7.8vh]">
      <Header />
      <ChatContainer colors={colors}>
        <MessageComponents
          text="Lorem ipsum dolor sit amet."
          timestamp="2 min ago"
          isSender={false}
          avatarUrl="/path/to/avatar1.jpg"
          colors={colors}
        />
        <MessageComponents
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          timestamp="2 min ago"
          isSender={true}
          avatarUrl="/path/to/avatar1.jpg"
          colors={colors}
        />
        <MessageComponents
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          timestamp="2 min ago"
          isSender={true}
          avatarUrl="/path/to/avatar1.jpg"
          colors={colors}
        />
        <MessageComponents
          text="Lorem ipsum dolor sit amet."
          timestamp="2 min ago"
          isSender={false}
          avatarUrl="/path/to/avatar1.jpg"
          colors={colors}
        />
        <MessageComponents
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          timestamp="2 min ago"
          isSender={true}
          avatarUrl="/path/to/avatar1.jpg"
          colors={colors}
        />
        <MessageComponents
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          timestamp="2 min ago"
          isSender={true}
          avatarUrl="/path/to/avatar1.jpg"
          colors={colors}
        />
        <InputBar
          onEmojiClick={handleClick}
          showEmojiPicker={showEmojiPicker}
          colors={colors}
        />
      </ChatContainer>
    </div>
  );
};

export default ChatWindows1;
