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

const Sidebar = () => {
  const Sidebar = styled(Box)(({ theme }) => ({
    width: "84px",
    paddingTop: "6px",
    height: "100vh",
    backgroundColor: theme.palette.grey[100],
    overflowY: "auto",
    borderRight: `1px solid ${theme.palette.divider}`,
  }));
  return (
    <>
      <Sidebar>
        <AppBar position="relative" color="default" elevation={0}>
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
