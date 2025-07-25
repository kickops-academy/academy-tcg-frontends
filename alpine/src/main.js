import Alpine from "alpinejs";

const POKEMON_TYPES = [
  { label: "Colorless", icon: "⚪️" },
  { label: "Darkness", icon: "🌑" },
  { label: "Dragon", icon: "🐉" },
  { label: "Fairy", icon: "🧚" },
  { label: "Fighting", icon: "🥊" },
  { label: "Fire", icon: "🔥" },
  { label: "Grass", icon: "🌿" },
  { label: "Lightning", icon: "⚡️" },
  { label: "Metal", icon: "⚙️" },
  { label: "Psychic", icon: "🔮" },
  { label: "Water", icon: "💧" },
];

async function loadPokemonByType(type) {
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

window.Alpine = Alpine;

document.addEventListener("alpine:init", () => {
  Alpine.data("state", () => {
    return {
      cards: [], 
      executeRequest: function (type) {
        if (type === this.filter) {
          this.filter = null;
          this.cards = [];
          return;
        }

        this.filter = type;
        this.loading = true;
        loadPokemonByType(type).then((data) => {
          this.cards = data;
          this.loading = false;
        }).catch((err) => {
          console.error("Failed to load Pokémon cards:", err);
          this.cards = [];
          this.loading = false;
        });
      },
      filter: null,
      loading: false,
      types: POKEMON_TYPES,
    }
  });
});

Alpine.start();
