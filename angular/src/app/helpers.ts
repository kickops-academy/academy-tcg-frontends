export const POKEMON_TYPES = {
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

export async function loadPokemonByType(type: string): Promise<any[]> {
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
