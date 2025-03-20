import { Box, styled } from "@mui/material";
import ChatList from "./chatList";
import Sidebar from "./sidebar";
import ChatWindows from "../chat";

const MainLayout = () => {
  const Container = styled(Box)({
    display: "flex",
    height: "100vh",
  });
  return (
    <Container>
      <Sidebar />
      <ChatList />
      <ChatWindows />
    </Container>
  );
};

export default MainLayout;
