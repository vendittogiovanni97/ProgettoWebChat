import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { LoginPages } from "./pages/login.pages";
import { RegisterPages } from "./pages/register.pages";
import HomePages from "./pages/home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPages />} />
          <Route path="/home" element={<HomePages />} />
          {/* Reindirizza alla pagina di login se la route non è specificata */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Altre route della tua applicazione... */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
