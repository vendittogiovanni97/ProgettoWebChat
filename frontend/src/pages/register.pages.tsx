/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEventHandler, useContext, useState } from "react";
//import "./register.css";
import { Link } from "react-router";
import { AuthContext } from "../context/Auth.Provider";

export function RegisterPages() {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const registerData = {
      firstName: formData.get("firstname") as string,
      lastName: formData.get("lastname") as string,
      username: formData.get("username") as string,
      birthDate: formData.get("birthdate") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    console.log("dati", registerData);
    try {
      const responseBody = await register(registerData);
      if (responseBody) {
        setSuccess(true);
        // TODO: aggiungere messaggio per il client reg successfull
      } else {
        setError("Si è verificato un errore durante la registrazione.");
      }
    } catch (err) {
      setError("Si è verificato un errore durante la registrazione.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Registrazione
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Registrati
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-gray-600">
          <p>
            Sei già registrato?{" "}
            <Link to="/login" className="text-purple-600 hover:underline">
              Accedi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
