import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  SvgIcon,
  Modal,
  Button,
} from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AppBar position="static" sx={{ background: "#696969" }}>
      <Toolbar>
        <Avatar src="/path/to/avatar1.jpg" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Giovanni Venditto
        </Typography>
        <AddIcCallIcon sx={{ margin: 1 }} />
        <VideoChatIcon
          sx={{
            margin: 1,
          }}
          onClick={handleClick}
        />
        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <div>
            <h2>Avvia una videochiamata</h2>
            <Button onClick={handleCloseModal}>Chiudi</Button>
          </div>
        </Modal>
        <SvgIcon>
          {/* credit: cog icon from https://heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ margin: 3 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
            />
          </svg>
        </SvgIcon>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
