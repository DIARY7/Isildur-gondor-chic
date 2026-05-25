import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axiosInstance from "../lib/axios";
import { AxiosError } from "axios";

const LoginPage: React.FC = () => {
  const [pseudo, setPseudo] = useState("");
  const [accessKey, setAccessKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // --- Validation front ---
    if (!pseudo.trim()) {
      setError("Le pseudo est obligatoire.");
      return;
    }
    if (!accessKey.trim()) {
      setError("La clé d'accès est obligatoire.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axiosInstance.post("/auth/login", {
        pseudo,
        mdp: accessKey,
      });

      // Succès
      localStorage.setItem("utilisateur", JSON.stringify(data.data));
      navigate("/accueil");

    } catch (err) {
      const error = err as AxiosError<{ success: boolean; message: string }>;

      if (error.response) {
        // Erreur retournée par le back (400, 401, 500...)
        setError(error.response.data?.message || "Une erreur est survenue.");
      } else if (error.request) {
        // Serveur injoignable
        setError("Impossible de joindre le serveur. Vérifiez votre connexion.");
      } else {
        setError("Une erreur inattendue est survenue.");
      }
    } finally {
      setLoading(false);
    }
  };

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

          {/* --- Bloc erreur --- */}
          {error && (
            <div
              className="flex items-start gap-3 mb-6 px-4 py-3 rounded-lg border text-sm"
              style={{
                backgroundColor: "#fef2f2",
                borderColor: "#fca5a5",
                color: "#b91c1c",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mt-0.5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>{error}</span>
            </div>
          )}

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
                onChange={(e) => {
                  setPseudo(e.target.value);
                  if (error) setError(null);
                }}
                disabled={loading}
                className="w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 disabled:opacity-50"
                style={{
                  borderColor: error ? "#fca5a5" : "#d0c8be",
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
                onChange={(e) => {
                  setAccessKey(e.target.value);
                  if (error) setError(null);
                }}
                disabled={loading}
                className="w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 disabled:opacity-50"
                style={{
                  borderColor: error ? "#fca5a5" : "#d0c8be",
                  fontSize: "1rem",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3 px-4 rounded-lg mb-6 transition-all duration-200 hover:opacity-90 text-white disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: "var(--gondor-red)",
                fontSize: "1rem",
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12" cy="12" r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Vérification...
                </>
              ) : (
                "S'identifier"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;