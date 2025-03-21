import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Typography,
  Box,
  IconButton,
  useTheme,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { themeColors } from "../../theme/themeColor";

interface VoiceCallModalProps {
  open: boolean;
  onClose: () => void;
}

const VoiceCallModal = ({ open, onClose }: VoiceCallModalProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [audio, setAudio] = useState<MediaStream | null>(null);

  const theme = useTheme();
  const boxColors = themeColors[theme.palette.mode];

  const handleStartCall = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      // Usa lo stream per la chiamata
      setIsCallActive(true);
      setAudio(audioStream);
    } catch (error) {
      console.error("Errore nell'accesso al microfono:", error);
    }
  };

  const handleEndCall = () => {
    // Interrompi lo stream audio
    if (audio) {
      audio.getTracks().forEach((track) => track.stop());
      setAudio(null);
    }

    setIsCallActive(false); // Termina la chiamata
    onClose(); // Chiudi il modale
  };

  // Effetto per pulire lo stream quando il modale viene chiuso
  useEffect(() => {
    return () => {
      if (audio) {
        audio.getTracks().forEach((track) => track.stop()); // Interrompi i track quando il componente viene smontato
      }
    };
  }, [audio]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: { background: boxColors.bg },
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        {!isCallActive ? (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Avvia una chiamata vocale
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Sei sicuro di voler avviare una chiamata vocale?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PhoneIcon />}
              onClick={handleStartCall}
              sx={{ mr: 2 }}
            >
              Chiama
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary">
              Annulla
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Chiamata in corso
            </Typography>
            <Typography sx={{ mb: 2 }}>
              Chiamata con Giovanni Venditto
            </Typography>
            <IconButton
              onClick={handleEndCall}
              color="secondary"
              sx={{ bgcolor: "error.main", color: "white", p: 2 }}
            >
              <CallEndIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default VoiceCallModal;
