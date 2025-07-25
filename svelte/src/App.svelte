<script>
  import { loadPokemonByType } from "@/helpers";
  import Button from "@/lib/Button.svelte";
  import Card from "@/lib/Card.svelte";

  let loading = $state(false);
  let data = $state([]);
  let filter = $state(null);

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

  $effect(() => {
    if (filter) {
      loading = true;
      loadPokemonByType(filter).then((cards) => {
        data = cards;
        loading = false;
      });
    } else {
      data = [];
      loading = false;
    }
  });
</script>

<div id="main">
  <header>
    <h1>Poké TCG Cards (Svelte)</h1>
  </header>
  <section id="content">
    <aside id="menu">
      {#each Object.entries(POKEMON_TYPES) as [label, icon]}
        <Button
          {label}
          {icon}
          onClick={() => {
            loading = true;
            filter = filter === label ? null : label;
          }}
        />
      {/each}
    </aside>
    <main>
      <h3 id="filter-name">
        {filter ? `Filter: ${filter}` : "No filter applied"}
      </h3>
      {#if loading}
        <span id="loader" class="loading"></span>
      {/if}
      <div id="stage">
        {data?.length === 0 ? "No cards." : ""}
        {#each data as card (card.id)}
          <Card source={`${card.image}/low.png`} alt={card.name} />
        {/each}
      </div>
    </main>
  </section>
  <footer>
    <p>&copy;2025 Kickops</p>
  </footer>
</div>

<style>
</style>
