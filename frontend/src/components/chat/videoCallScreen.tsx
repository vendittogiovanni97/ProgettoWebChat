import { Box, Typography, IconButton } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";

interface VideoCallScreenProps {
  onClose: () => void;
  stream: MediaStream | null;
}

const VideoCallScreen = ({ onClose, stream }: VideoCallScreenProps) => {
  return (
    <Box>
      <Typography
        variant="h6"
        component="h2"
        gutterBottom
        sx={{ textAlign: "center" }}
      >
        Videochiamata in corso
      </Typography>
      {stream && (
        <video
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          autoPlay
          muted
          style={{
            width: "300%",
            height: "400px",
            backgroundColor: "black",
            borderRadius: 15,
          }}
        />
      )}
      <IconButton
        onClick={onClose}
        color="secondary"
        sx={{
          bgcolor: "error.main",
          color: "white",
          p: 2,
          left: "45%",
          margin: 2,
        }}
      >
        <CallEndIcon />
      </IconButton>
    </Box>
  );
};

export default VideoCallScreen;
