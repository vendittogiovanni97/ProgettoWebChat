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
} from "@mui/material";

const ChatList = () => {
  const ChatList = styled(Box)(({ theme }) => ({
    width: "260px",
    paddingTop: "6px",
    height: "100vh",
    backgroundColor: theme.palette.grey[100],
    overflowY: "auto",
    borderRight: `1px solid ${theme.palette.divider}`,
  }));
  return (
    <>
      <ChatList>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar variant="dense"></Toolbar>
        </AppBar>

        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src="/path/to/avatar1.jpg" />
            </ListItemAvatar>
            <ListItemText secondary="Online" />
          </ListItem>
        </List>
      </ChatList>
    </>
  );
};

export default ChatList;
