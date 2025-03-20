import { AppBar, Toolbar, Typography, Avatar } from "@mui/material";
import IconCall from "./iconCellTheme";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "grey" }}>
      <Toolbar>
        <Avatar src="/path/to/avatar1.jpg" />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Giovanni Venditto
        </Typography>
        <IconCall />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
