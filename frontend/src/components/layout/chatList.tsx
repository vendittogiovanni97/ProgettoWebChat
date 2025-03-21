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

const ChatList = () => {
  const theme = useTheme();
  const ChatList = styled(Box)(({ theme }) => ({
    width: "260px",
    paddingTop: "6px",
    height: "100vh",
    overflowY: "auto",
    borderRight: `1px solid ${theme.palette.divider}`,
  }));

  const styleBg = themeColors[theme.palette.mode];
  return (
    <>
      <ChatList sx={{ background: styleBg.bg }}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar variant="dense"></Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="/path/to/avatar1.jpg" />
            </ListItemAvatar>
            <ListItemText secondary="Nicola Vettone" />
          </ListItem>
        </List>
      </ChatList>
    </>
  );
};

export default ChatList;
