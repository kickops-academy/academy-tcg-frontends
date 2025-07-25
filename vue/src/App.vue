<script setup>
import { ref, watch } from 'vue';
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";
import { loadPokemonByType } from '@/helpers';

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

const data = ref([]);
const filter = ref(null);
const loading = ref(false);

watch(() => filter.value, (newFilterValue) => {
  if (newFilterValue) {
    loading.value = true;
    
    data.value = [];

    loadPokemonByType(newFilterValue).then((cards) => {
      data.value = cards;
      loading.value = false;
    }).catch(() => {
      loading.value = false;
      data.value = [];
      console.error(`Failed to load Pokémon of type: ${newFilterValue}`);
    });
  } else {
    data.value = [];
    loading.value = false;
  }
});
</script>

<template>
    <div id="main">
      <header>
        <h1>Poké TCG Cards (Vue)</h1>
      </header>
      <section id="content">
        <aside id="menu">
          <Button
            v-for="([label, value]) in Object.entries(POKEMON_TYPES)"
            :key="label"
            :label="label"
            :icon="value"
            :onClick="() => filter = filter === label ? null : label"
          />
        </aside>
        <main>
          <h3 id="filter-name">
            {{ filter ? `Filter: ${filter}` : "No filter applied" }}
          </h3>

          <span v-if="loading" id="loader" className="loading" />

          <div id="stage">
            {{ !data.length && !loading ? "No cards." : "" }}
            <Card
              v-for="card in data"
              :key="card.id"
              :source="`${card.image}/low.png`"
              :alt="card.name"
            />
          </div>
        </main>
      </section>
      <footer>
        <p>&copy;2025 Kickops</p>
      </footer>
    </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
