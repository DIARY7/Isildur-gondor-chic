import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";
import logo from "../assets/logo.png";

interface Produit {
  id: number;
  libelle: string;
  description: string;
  estDuJour: boolean;
  prix: number;
  qteStock: number;
  img: string;
}

interface Utilisateur {
  id: number;
  pseudo: string;
  nom: string;
  prenom: string;
}

export default function Accueil() {
  const [products, setProducts] = useState<Produit[]>([]);
  const [current, setCurrent] = useState(0);
  const [quantities, setQuantities] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [utilisateur, setUtilisateur] = useState<Utilisateur | null>(null);

  const navigate = useNavigate();

  // --- Récupération de l'utilisateur connecté ---
  useEffect(() => {
    const stored = localStorage.getItem("utilisateur");
    if (!stored) {
      navigate("/"); // redirige si non connecté
      return;
    }
    setUtilisateur(JSON.parse(stored));
  }, []);

  // --- Récupération des produits du jour ---
  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/produits/du-jour");
        setProducts(data.data);
        setQuantities(new Array(data.data.length).fill(1));
      } catch (err: any) {
        if (err.response) {
          setError(
            err.response.data?.message ||
              "Erreur lors du chargement des produits.",
          );
        } else if (err.request) {
          setError(
            "Impossible de joindre le serveur. Vérifiez votre connexion.",
          );
        } else {
          setError("Une erreur inattendue est survenue.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduits();
  }, []);

  const total = products.length;
  const p = products[current];

  const goTo = (n: number) => setCurrent(((n % total) + total) % total);

  const changeQty = (delta: number) =>
    setQuantities((prev) =>
      prev.map((q, i) => (i === current ? Math.max(1, q + delta) : q)),
    );

  // Résolution de l'image depuis assets
  const getImage = (imgName: string) => {
    try {
      return new URL(`../assets/${imgName}`, import.meta.url).href;
    } catch {
      return "/placeholder.png";
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      <div className="min-h-screen bg-[#ede8df] font-['Lato',sans-serif]">
        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-10 py-4 bg-[#ede8df] border-b border-[#d6cdc0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c9a96e] rounded flex items-center justify-center">
              <img
                src={logo}
                alt="Gondor Chic Logo"
                className="h-25 w-auto object-contain"
              />
            </div>
            <span className="font-['Cinzel',serif] text-[0.95rem] font-medium tracking-[0.16em]" style={{ color: "var(--gondor-title)" }}>
              Gondor Chic
            </span>
          </div>
          <span className="font-['Cinzel',serif] text-[0.85rem] tracking-[0.28em]" style={{ color: "var(--gondor-label)" }}>
            ACCUEIL
          </span>
        </nav>

        <main className="flex flex-col items-center pt-12 pb-12 " style={{ backgroundColor: "rgb(230 219 200)" }}>
          {/* CLIENT */}
          <div className="text-center mb-10">
            <p className="font-['Cinzel',serif] text-[#8b6a4a] text-[0.85rem] tracking-[0.3em] uppercase mb-1">
              Client
            </p>
            <h1
              className="font-['Cormorant_Garamond',serif] text-[2.6rem] font-normal tracking-[0.01em] leading-tight relative inline-block"
              style={{ color: "var(--gondor-label)" }}
            >
              {utilisateur ? `${utilisateur.nom} ${utilisateur.prenom} ` : "—"}

              {/* Trait centré en bas, 25% de largeur */}
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "37.5%",
                  width: "35%",
                  height: "1.5px",
                  background: "var(--gondor-title)",
                }}
              />
            </h1>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="flex items-center gap-3 text-[#8b6a4a] font-['Cinzel',serif] text-[0.75rem] tracking-[0.2em]">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              CHARGEMENT...
            </div>
          )}

          {/* ERREUR */}
          {!loading && error && (
            <div
              className="flex items-start gap-3 px-5 py-4 rounded border text-sm max-w-md w-full"
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

          {/* AUCUN PRODUIT */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center font-['Cormorant_Garamond',serif] text-[#8b6a4a] text-[1.2rem] italic">
              Aucun produit du jour disponible pour le moment.
            </div>
          )}

          {/* CARD */}
          {!loading && !error && p && (
            <div className="w-full max-w-[660px] bg-[#faf6f0] border-t-[3px] border-t-[#6b3012] border-x border-b border-x-[#c8b89a] border-b-[#c8b89a] shadow-[0_4px_24px_rgba(60,30,10,0.10)]">
              {/* SLIDE */}
              <div className="flex flex-row min-h-[280px]">
                {/* Image */}
                <div className="w-[230px] min-w-[230px] overflow-hidden bg-[#c8a050]">
                  <img
                    key={current}
                    src={getImage(p.img)}
                    alt={getImage(p.img)}
                    className="w-full h-full object-cover block"
                  />
                </div>

                {/* Contenu */}
                <div className="flex flex-col justify-center flex-1 px-9 py-7">
                  <p className="font-['Cinzel',serif] text-[#8b6a4a] text-[0.55rem] tracking-[0.28em] uppercase mb-[0.4rem]">
                    Produit du Jour
                  </p>

                  <h2 className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[1.9rem] font-normal leading-[1.15]">
                    {p.libelle}
                  </h2>

                  {/* Sous-titre / description */}
                  <p className="font-['Cormorant_Garamond',serif] italic text-[#7a6050] text-[0.88rem] mt-1 mb-[1.1rem]">
                    {p.description || "Aucune description disponible."}
                  </p>

                  <div className="h-px bg-[#c8b89a] mb-[0.85rem]" />

                  {/* Prix */}
                  <div className="flex justify-between items-baseline mb-[0.4rem]">
                    <span className="font-['Lato',sans-serif] text-[#3b1f0e] text-[0.8rem]">
                      Prix
                    </span>
                    <span className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[1.05rem] font-medium">
                      {p.prix} gondariar
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="flex justify-between items-baseline mb-[1rem]">
                    <span className="font-['Lato',sans-serif] text-[#3b1f0e] text-[0.8rem]">
                      En stock
                    </span>
                    <span className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[1.05rem] font-medium">
                      {p.qteStock} unité(s)
                    </span>
                  </div>

                  <div className="h-px bg-[#c8b89a] mb-[0.85rem]" />

                  <p className="font-['Cinzel',serif] text-[#8b6a4a] text-[0.55rem] tracking-[0.25em] uppercase mb-[0.55rem]">
                    Quantité
                  </p>

                  {/* Stepper + Bouton */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <button
                        onClick={() => changeQty(-1)}
                        className="w-7 h-7 border border-[#9a7a5a] bg-transparent text-[#3b1f0e] text-base flex items-center justify-center cursor-pointer hover:bg-[#ede8df] transition-colors"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        readOnly
                        value={quantities[current] ?? 1}
                        className="w-9 h-7 border-y border-[#9a7a5a] bg-transparent text-center font-['Lato',sans-serif] text-[0.85rem] text-[#3b1f0e] outline-none"
                      />
                      <button
                        onClick={() => changeQty(1)}
                        className="w-7 h-7 border border-[#9a7a5a] bg-transparent text-[#3b1f0e] text-base flex items-center justify-center cursor-pointer hover:bg-[#ede8df] transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <button className="bg-[#6b3012] hover:bg-[#4e200a] text-white font-['Cinzel',serif] text-[0.62rem] tracking-[0.12em] font-medium px-[1.1rem] py-[0.5rem] uppercase whitespace-nowrap transition-colors cursor-pointer">
                      Ajouter au Panier
                    </button>
                  </div>
                </div>
              </div>

              {/* CONTRÔLES SLIDER */}
              {products.length > 1 && (
                <div className="flex items-center justify-between px-6 py-[0.6rem] border-t border-[#c8b89a] bg-[#f5efe6]">
                  <button
                    onClick={() => goTo(current - 1)}
                    className="w-8 h-8 rounded-full border border-[#c9a96e] bg-[#ede8df]/80 text-[#3b1f0e] flex items-center justify-center text-base hover:bg-[#e0d8cc] transition-colors cursor-pointer"
                  >
                    ←
                  </button>

                  <div className="flex items-center gap-2">
                    {products.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`w-2 h-2 rounded-full border-none p-0 cursor-pointer transition-colors ${
                          i === current ? "bg-[#3b1f0e]" : "bg-[#c9a96e]"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goTo(current + 1)}
                    className="w-8 h-8 rounded-full border border-[#c9a96e] bg-[#ede8df]/80 text-[#3b1f0e] flex items-center justify-center text-base hover:bg-[#e0d8cc] transition-colors cursor-pointer"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
