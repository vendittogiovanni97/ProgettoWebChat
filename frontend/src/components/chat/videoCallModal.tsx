import { Modal, Button, Typography, Box, useTheme } from "@mui/material";
import { themeColors } from "../../theme/themeColor";
import { useEffect, useState } from "react";
import VideoCallScreen from "./videoCallScreen";

interface VideoCallModalProps {
  open: boolean;
  onClose: () => void;
}

const VideoCallModal = ({ open, onClose }: VideoCallModalProps) => {
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const theme = useTheme();
  const boxColors = themeColors[theme.palette.mode];

  const handleConfirmVideoCall = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setIsVideoCallActive(true);
      setStream(videoStream);
    } catch (error) {
      console.log("Errore nell'accesso alla videochiamata:", error);
    }
  };
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          bgcolor: { background: boxColors.bg },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {!isVideoCallActive ? (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Avvia una videochiamata
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Sei sicuro di voler avviare una videochiamata?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ padding: 1 }}
              onClick={handleConfirmVideoCall} // Gestisci il click su "Conferma"
            >
              Conferma
            </Button>
            <Button
              onClick={onClose}
              variant="contained"
              color="primary"
              sx={{ padding: 1, float: "right" }}
            >
              Esci
            </Button>
          </>
        ) : (
          <VideoCallScreen
            onClose={() => setIsVideoCallActive(false)}
            stream={stream}
          />
        )}
      </Box>
    </Modal>
  );
};

export default VideoCallModal;
