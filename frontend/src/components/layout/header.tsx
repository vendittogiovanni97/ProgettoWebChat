import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "../common/toggleiconMode";
import { useTheme } from "@mui/material/styles";

export default function ButtonAppBar() {
  const theme = useTheme();
  const appBarColor = theme.palette.mode === "dark" ? "#2d2d2d" : "#1a237e";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" sx={{ background: appBarColor }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            ChatSfera
          </Typography>
          <ToggleColorMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
