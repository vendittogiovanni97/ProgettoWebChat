import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/Auth.Provider";
import { LoginForm } from "../types/Login.Form.Type";

export function LoginPages() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    const dataLogin: LoginForm = {
      email,
      password,
    };
    const response = await login(dataLogin);
    if (response) {
      console.log("login succesfull");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Inserisci email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Inserisci password"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Login
        </button>
        <p className="text-center mt-4 text-gray-600">
          Se non sei registrato,{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}
