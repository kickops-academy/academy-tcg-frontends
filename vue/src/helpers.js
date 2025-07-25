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
