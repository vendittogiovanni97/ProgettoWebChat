import Avatar from "@mui/material/Avatar";

export interface MessageProps {
  text: string;
  timestamp: string;
  isSender: boolean;
  avatarUrl: string;
  colors: {
    message1: string;
    message2: string;
  };
}

const MessageComponents = ({
  text,
  timestamp,
  isSender,
  avatarUrl,
  colors,
}: MessageProps) => {
  return (
    <div
      className={`flex w-full mt-2 space-x-3 max-w-xs ${
        isSender ? "ml-auto justify-end" : ""
      }`}
    >
      {!isSender && <Avatar src={avatarUrl} />}
      <div>
        <div
          className={`p-3 rounded-lg ${
            isSender
              ? "rounded-l-lg rounded-br-lg text-white"
              : "rounded-r-lg rounded-bl-lg"
          }`}
          style={{ background: isSender ? colors.message1 : colors.message2 }}
        >
          <p className="text-sm">{text}</p>
        </div>
        <span className="text-xs text-gray-500 leading-none">{timestamp}</span>
      </div>
      {isSender && <Avatar src={avatarUrl} />}
    </div>
  );
};

export default MessageComponents;
