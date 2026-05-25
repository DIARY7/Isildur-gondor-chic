import { useState } from "react";

const products = [
  {
    id: 0,
    name: "Pendentif d'Eärendil",
    subtitle: "Argent ciselé et pierre de lune",
    price: "249 po",
    stock: "7 unités",
    image: "https://images.unsplash.com/photo-1601121141461-9d6647bef0a1?w=600&q=80",
  },
  {
    id: 1,
    name: "Bague de Galadriel",
    subtitle: "Or elfique et saphir céleste",
    price: "480 po",
    stock: "3 unités",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80",
  },
  {
    id: 2,
    name: "Collier de Mithril",
    subtitle: "Mithril pur et émeraude des forêts",
    price: "695 po",
    stock: "5 unités",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
  },
];

export default function Accueil() {
  const [current, setCurrent] = useState(0);
  const [quantities, setQuantities] = useState([1, 1, 1]);

  const total = products.length;
  const p = products[current];

  const goTo = (n) => setCurrent(((n % total) + total) % total);
  const changeQty = (delta) =>
    setQuantities((prev) =>
      prev.map((q, i) => (i === current ? Math.max(1, q + delta) : q))
    );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Cinzel:wght@400;500;600&family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet"
      />

      {/* PAGE */}
      <div className="min-h-screen bg-[#ede8df] font-['Lato',sans-serif]">

        {/* NAVBAR */}
        <nav className="flex items-center justify-between px-10 py-4 bg-[#ede8df] border-b border-[#d6cdc0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c9a96e] rounded flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-['Cinzel',serif] text-[#3b1f0e] text-[0.95rem] font-medium tracking-[0.06em]">
              Gondor Chic
            </span>
          </div>
          <span className="font-['Cinzel',serif] text-[#3b1f0e] text-[0.65rem] tracking-[0.28em]">
            ACCUEIL
          </span>
        </nav>

        {/* MAIN */}
        <main className="flex flex-col items-center pt-12 pb-12">

          {/* CLIENT */}
          <div className="text-center mb-10">
            <p className="font-['Cinzel',serif] text-[#8b6a4a] text-[0.58rem] tracking-[0.3em] uppercase mb-1">
              Client
            </p>
            <h1 className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[2.6rem] font-normal tracking-[0.01em] leading-tight">
              Arwen Undómiel
            </h1>
          </div>

          {/* CARD */}
          <div className="w-full max-w-[660px] bg-[#faf6f0] border-t-[3px] border-t-[#6b3012] border-x border-b border-x-[#c8b89a] border-b-[#c8b89a] shadow-[0_4px_24px_rgba(60,30,10,0.10)]">

            {/* SLIDE */}
            <div className="flex flex-row min-h-[280px]">

              {/* Image */}
              <div className="w-[230px] min-w-[230px] overflow-hidden bg-[#c8a050]">
                <img
                  key={current}
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover block"
                />
              </div>

              {/* Contenu */}
              <div className="flex flex-col justify-center flex-1 px-9 py-7">

                {/* Label */}
                <p className="font-['Cinzel',serif] text-[#8b6a4a] text-[0.55rem] tracking-[0.28em] uppercase mb-[0.4rem]">
                  Produit du Jour
                </p>

                {/* Nom */}
                <h2 className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[1.9rem] font-normal leading-[1.15]">
                  {p.name}
                </h2>

                {/* Sous-titre */}
                <p className="font-['Cormorant_Garamond',serif] italic text-[#7a6050] text-[0.88rem] mt-1 mb-[1.1rem]">
                  {p.subtitle}
                </p>

                {/* Séparateur */}
                <div className="h-px bg-[#c8b89a] mb-[0.85rem]" />

                {/* Prix */}
                <div className="flex justify-between items-baseline mb-[0.4rem]">
                  <span className="font-['Lato',sans-serif] text-[#3b1f0e] text-[0.8rem]">Prix</span>
                  <span className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[1.05rem] font-medium">
                    {p.price}
                  </span>
                </div>

                {/* Stock */}
                <div className="flex justify-between items-baseline mb-[1rem]">
                  <span className="font-['Lato',sans-serif] text-[#3b1f0e] text-[0.8rem]">En stock</span>
                  <span className="font-['Cormorant_Garamond',serif] text-[#2e1505] text-[1.05rem] font-medium">
                    {p.stock}
                  </span>
                </div>

                {/* Séparateur */}
                <div className="h-px bg-[#c8b89a] mb-[0.85rem]" />

                {/* Quantité label */}
                <p className="font-['Cinzel',serif] text-[#8b6a4a] text-[0.55rem] tracking-[0.25em] uppercase mb-[0.55rem]">
                  Quantité
                </p>

                {/* Stepper + Bouton */}
                <div className="flex items-center gap-3">

                  {/* Stepper */}
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
                      value={quantities[current]}
                      className="w-9 h-7 border-y border-[#9a7a5a] bg-transparent text-center font-['Lato',sans-serif] text-[0.85rem] text-[#3b1f0e] outline-none"
                    />
                    <button
                      onClick={() => changeQty(1)}
                      className="w-7 h-7 border border-[#9a7a5a] bg-transparent text-[#3b1f0e] text-base flex items-center justify-center cursor-pointer hover:bg-[#ede8df] transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Bouton panier */}
                  <button className="bg-[#6b3012] hover:bg-[#4e200a] text-white font-['Cinzel',serif] text-[0.62rem] tracking-[0.12em] font-medium px-[1.1rem] py-[0.5rem] uppercase whitespace-nowrap transition-colors cursor-pointer">
                    Ajouter au Panier
                  </button>
                </div>
              </div>
            </div>

            {/* CONTRÔLES SLIDER */}
            <div className="flex items-center justify-between px-6 py-[0.6rem] border-t border-[#c8b89a] bg-[#f5efe6]">

              {/* Précédent */}
              <button
                onClick={() => goTo(current - 1)}
                className="w-8 h-8 rounded-full border border-[#c9a96e] bg-[#ede8df]/80 text-[#3b1f0e] flex items-center justify-center text-base hover:bg-[#e0d8cc] transition-colors cursor-pointer"
              >
                ←
              </button>

              {/* Dots */}
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

              {/* Suivant */}
              <button
                onClick={() => goTo(current + 1)}
                className="w-8 h-8 rounded-full border border-[#c9a96e] bg-[#ede8df]/80 text-[#3b1f0e] flex items-center justify-center text-base hover:bg-[#e0d8cc] transition-colors cursor-pointer"
              >
                →
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}