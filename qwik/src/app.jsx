import { Card } from "@/card";
import { loadPokemonByType } from "@/helpers";
import { component$, useSignal, useTask$ } from "@builder.io/qwik";

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

export const App = component$(() => {
  const cards = useSignal([]);
  const filter = useSignal(null);
  const loading = useSignal(false);

  useTask$(({ track }) => {
    const value = track(() => filter.value);

    if (value) {
      loading.value = true;
      loadPokemonByType(value)
        .then((response) => {
          cards.value = response;
          loading.value = false;
        })
        .catch((err) => {
          console.error(`Error loading Pokémon of type ${value}:`, err);
          cards.value = [];
          loading.value = false;
        })
        .finally(() => {
          loading.value = false;
        });
    } else {
      cards.value = [];
      loading.value = false;
    }
  });

  return (
    <div id="main">
      <header>
        <h1>Poké TCG Cards (Qwik)</h1>
      </header>
      <section id="content">
        <aside id="menu">
          {Object.entries(POKEMON_TYPES).map(([type, emoji], k) => {
            return (
              <button
                key={k}
                onClick$={() => {
                  if (filter === type) {
                    filter.value = "";
                  } else {
                    filter.value = type;
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
            {filter.value ? `Filter: ${filter.value}` : "No filter applied"}
          </h3>

          {loading.value && <span id="loader" className="loading" />}

          <div id="stage">
            {cards.value?.length
              ? cards.value.map((card, c) => {
                  if (!card.image) {
                    return null;
                  }

                  return (
                    <Card
                      key={c}
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
});
