import { useEffect, useState } from "react";
import { loadPokemonByType } from "@/helpers";
import Button from "@/Button";
import Card from "@/Card";

const POKEMON_TYPES = {
  Colorless: "⚪️",
  Darkness: "🌑",
  Dragon: "🐉",
  Fairy: "🧚",
  Fighting: "🥊",
  Fire: "🔥",
  Grass: "🌿",
  Lightning: "⚡️",
  Metal: "⚙️",
  Psychic: "🔮",
  Water: "💧",
};

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter) {
      setLoading(true);
      setData([]);
      loadPokemonByType(filter).then((response) => {
        setData(response);
        setLoading(false);
      });
    } else {
      setData([]);
      setLoading(false);
    }
  }, [filter]);

  return (
    <div id="main">
      <header>
        <h1>Poké TCG Cards (React)</h1>
      </header>
      <section id="content">
        <aside id="menu">
          {Object.entries(POKEMON_TYPES).map(([type, emoji], k) => {
            return (
              <Button
                label={type}
                icon={emoji}
                key={k}
                onClick={() => {
                  if (filter === type) {
                    setFilter(null);
                  } else {
                    setFilter(type);
                  }
                }}
              />
            );
          })}
        </aside>
        <main>
          <h3 id="filter-name">
            {filter ? `Filter: ${filter}` : "No filter applied"}
          </h3>

          {loading && <span id="loader" className="loading" />}

          <div id="stage">
            {data?.length > 0
              ? data?.map((card) => {
                  return (
                    <Card key={card.id} source={`${card.image}/low.png`} alt={card.name} />
                  );
                })
              : "No cards."}
          </div>
        </main>
      </section>
      <footer>
        <p>&copy;2025 Kickops</p>
      </footer>
    </div>
  );
};

export default App;
