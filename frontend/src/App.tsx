import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { LoginPages } from "./pages/login.pages";
import { RegisterPages } from "./pages/register.pages";
import HomePages from "./pages/home";
import NotFound404Paged from "./pages/notFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Reindirizza alla pagina di login se la route non è specificata */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/home" element={<HomePages />} />
          <Route path="/notfound" element={<NotFound404Paged />} />
          <Route path="/settings" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
