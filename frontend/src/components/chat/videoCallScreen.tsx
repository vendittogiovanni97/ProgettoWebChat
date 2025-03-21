import { Button, Box, Typography } from "@mui/material";

interface VideoCallScreenProps {
  onClose: () => void;
  stream: MediaStream | null;
}

const VideoCallScreen = ({ onClose, stream }: VideoCallScreenProps) => {
  return (
    <Box>
      <Typography variant="h6" component="h2" gutterBottom>
        Videochiamata in corso
      </Typography>
      {stream && (
        <video
          ref={(video) => {
            if (video) video.srcObject = stream;
          }}
          autoPlay
          muted
          style={{ width: "100%", height: "200px", backgroundColor: "black" }}
        />
      )}
      <Button
        onClick={onClose}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Termina videochiamata
      </Button>
    </Box>
  );
};

export default VideoCallScreen;
