import React, { useState } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [pseudo, setPseudo] = useState("");
  const [accessKey, setAccessKey] = useState();

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // validation...
    navigate('/accueil') // 👈 redirige vers la page d'accueil
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gondor-bg">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Gondor Chic Logo"
            className="h-20 w-auto object-contain"
          />
        </div>
        <h1
          className="text-5xl font-bold tracking-wide"
          style={{ color: "#6b2a10" }}
        >
          Gondor Chic
        </h1>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
        {/* Bandeau marron en haut */}
        <div
          className="h-2 w-full"
          style={{ background: "var(--gondor-label)" }}
        />

        <div className="p-10">
          <h2
            className="text-3xl font-semibold text-center mb-8"
            style={{ color: "var(--gondor-dark)", lineHeight: "1.2" }}
          >
            Vérification
            <br />
            d'Identité
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                className="block text-sm font-medium mb-2 uppercase tracking-wide"
                style={{ color: "var(--gondor-label)" }}
              >
                Pseudo
              </label>
              <input
                type="text"
                value={pseudo}
                placeholder="gollum01"
                onChange={(e) => setPseudo(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200"
                style={{
                  borderColor: "#d0c8be",
                  fontSize: "1rem",
                }}
              />
            </div>

            <div className="mb-8">
              <label
                className="block text-sm font-medium mb-2 uppercase tracking-wide"
                style={{ color: "var(--gondor-label)" }}
              >
                Clé d'Accès
              </label>
              <input
                type="password"
                value={accessKey}
                placeholder="....."
                onChange={(e) => setAccessKey(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200"
                style={{
                  borderColor: "#d0c8be",
                  fontSize: "1rem",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full font-bold py-3 px-4 rounded-lg mb-6 transition-all duration-200 hover:opacity-90 text-white"
              style={{
                background: "var(--gondor-red)",
                fontSize: "1rem",
              }}
            >
              S'identifier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
