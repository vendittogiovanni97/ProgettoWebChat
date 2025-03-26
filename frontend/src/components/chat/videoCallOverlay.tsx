import { Box, IconButton } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useChatContext } from "../../context/VideoCallContext";

const VideoCallOverlay = () => {
  const { endVideoCall, stream } = useChatContext();

  return (
    <Box
      sx={{
        position: "absolute",
        top: 60,
        right: 0,
        width: 1192,
        height: 400,
        borderRadius: 2,
        boxShadow: 6,
        overflow: "hidden",
        backgroundColor: "black",
        zIndex: 1000,
      }}
    >
      {stream && (
        <video
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          autoPlay
          muted
          style={{
            width: "100%",
            height: "230px",
            backgroundColor: "black",
            borderRadius: "8px 8px 0 0",
          }}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 13,
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <IconButton
          onClick={endVideoCall}
          color="error"
          sx={{
            bgcolor: "error.main",
            color: "white",
            "&:hover": {
              bgcolor: "error.dark",
            },
          }}
        >
          <CallEndIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default VideoCallOverlay;
