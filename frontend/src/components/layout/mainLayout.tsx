import { Box, styled } from "@mui/material";
import ChatList from "./chatList";
import Sidebar from "./server";
import ChatWindows1 from "../chat";

const MainLayout = () => {
  const Container = styled(Box)({
    display: "flex",
    height: "100vh",
  });
  return (
    <Container>
      <Sidebar />
      <ChatList />
      <ChatWindows1 />
    </Container>
  );
};

export default MainLayout;
