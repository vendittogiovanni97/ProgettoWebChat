import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  styled,
  useTheme,
} from "@mui/material";
import { themeColors } from "../../theme/themeColor";

const Sidebar = () => {
  const theme = useTheme();
  const Sidebar = styled(Box)(({ theme }) => ({
    width: "84px",
    paddingTop: "6px",
    height: "100vh",
    overflowY: "auto",
    borderRight: `1px solid ${theme.palette.divider}`,
  }));
  const styleBg = themeColors[theme.palette.mode];
  return (
    <>
      <Sidebar sx={{ background: styleBg.bg }}>
        <AppBar position="relative" elevation={0}>
          <Toolbar variant="dense"></Toolbar>
        </AppBar>

        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="/path/to/avatar1.jpg" />
            </ListItemAvatar>
            <ListItemText />
          </ListItem>
        </List>
      </Sidebar>
    </>
  );
};

export default Sidebar;
