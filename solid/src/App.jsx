import { createEffect, createSignal, on } from "solid-js";
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

export async function loadPokemonByType(type) {
  try {
    const response = await fetch(
      `http://localhost:3000/card/pokemon/${type}?amount=8`,
      {
        method: "GET",
      }
    );

    const cardData = await response?.json();
    if (Array.isArray(cardData)) {
      return cardData;
    }
  } catch (err) {
    console.error(`Error loading Pokémon of type ${type}:`, err);
  }

  return [];
}

const App = () => {
  const [data, setData] = createSignal([]);
  const [filter, setFilter] = createSignal(null);
  const [loading, setLoading] = createSignal(false);

  createEffect(
    on(
      filter,
      async (currentFilter) => {
        setLoading(true);

        if (currentFilter) {
          loadPokemonByType(currentFilter)
            .then((cards) => {
              if (Array.isArray(cards) && cards.length > 0) {
                setData(cards);
              } else {
                console.warn(`No cards found for type ${currentFilter}`);
                setData([]);
              }
            })
            .catch((err) => {
              console.error(
                `Failed to load cards for type ${currentFilter}:`,
                err
              );
              setData([]);
            })
            .finally(() => {
              setLoading(false);
            });
          return;
        }

        setData([]);
        setLoading(false);
      },
      { defer: true }
    )
  );

  return (
    <div id="main">
      <header>
        <h1>Poké TCG Cards (Solid)</h1>
      </header>
      <section id="content">
        <aside id="menu">
          {Object.entries(POKEMON_TYPES).map(([type, emoji], k) => {
            return (
              <button
                key={k}
                onClick={() => {
                  if (filter() === type) {
                    setFilter(null);
                  } else {
                    setFilter(type);
                  }
                }}
              >
                {emoji} {type}
              </button>
            );
          })}
        </aside>
        <main>
          <h3 id="filter-name">
            {filter() ? `Filter: ${filter()}` : "No filter applied"}
          </h3>

          {loading() && <span id="loader" className="loading" />}

          <div id="stage">
            {data()?.length > 0
              ? data()?.map((card) => {
                  if (!card.image) return null;

                  return (
                    <Card
                      key={card.id}
                      source={`${card.image}/low.png`}
                      alt={card.name}
                    />
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
