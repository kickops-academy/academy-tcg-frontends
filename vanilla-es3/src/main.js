/*
 * Este é um exemplo meio simples do JavaScript antigo (ES3), com algumas de 
 * características comum, que hoje não são recomendadas.
 * 
 * Note que o arquivo parece ter sido declarado de forma estranha, e isso é 
 * proposital, até para que vejam como a linguagem evoluiu de lá pra cá.
 */

function renderCardsToImages() {
  CONTAINER.innerHTML = "";

  if (CARDS.length === 0) {
    CONTAINER.textContent = "No cards found.";
    return;
  }

  function renderCard(card) {
    if (!card.image) {
      return null;
    }

    var img = document.createElement("img");
    img.src = card.image + "/low.png";
    img.alt = card.name;
    img.title = card.name;
    CONTAINER.appendChild(img);
  }

  for (var i = 0; i < CARDS.length; i++) {
    var card = CARDS[i];
    renderCard(card);
  }
}

function getPokemonByType(type) {
  console.log("Selected type:", type);
  LOADER.className = "loading";

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/card/pokemon/" + type + "?amount=8");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // CUIDADO! NÃO RECOMENDADO USAR eval() COM DADOS NÃO CONFIÁVEIS!
      // Só use isso se você confia na fonte do JSON!
      var data = eval("(" + xhr.responseText + ")");
      CARDS = data;
      LOADER.className = "loading hidden";

      renderCardsToImages();
    }
  };
  xhr.onerror = function () {
    console.error("Error fetching data for type:", type);
    LOADER.className = "loading hidden";
  };
  xhr.send();
}

function mapTypesToButons() {
  /**
   * Sim, isso é permitido, era uma prática comum, mas você saberia dizer 
   * o motivo disso? Porquê precisamos declarar essa função se poderíamos 
   * aparentemente colocar tudo dentro do loop for?
   * 
   * Existe uma razão para isso, e é algo que versões mais novas da linguagem 
   * resolveram com uma nova sintaxe.
   */
  function generateButton(type) {
    var name = type[0];
    var icon = type[1];

    var button = document.createElement("button");
    button.textContent = name + " " + icon;
    button.onclick = function () {
      console.log(name, icon);
      if (FILTER === name) {
        FILTER = null;
        FILTER_NAME.textContent = "No filter applied";
      } else {
        FILTER = name;
        FILTER_NAME.textContent = "Filter: " + name;
        getPokemonByType(name);
      }
    };

    /**
     * Hoisting foi apenas mencionado na primeira aula, mas 
     * lá embaixo explico melhor.
     */
    MENU.appendChild(button);
  }

  var MENU = document.getElementById("menu");
  for (var i = 0; i < POKEMON_TYPES.length; i++) {
    var type = POKEMON_TYPES[i];
    generateButton(type);
  }
}

function bootstrap() {
  FILTER_NAME = document.getElementById("filter-name");
  FILTER_NAME.textContent = "No filter applied";

  LOADER = document.getElementById("loader");
  LOADER.className = "loading hidden";

  CONTAINER = document.getElementById("stage");

  mapTypesToButons();
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    bootstrap();
  }
};

/**
 * As variáveis abaixo são globais, não é uma boa prática, mas muitas coisas 
 * antes eram feitas assim, e é importante entender como funcionavam.
 * 
 * Outro ponto importante que você pode ter percebido é que estamos declarando 
 * as variáveis NO FINAL DO ARQUIVO, e não no começo, mas tudo funciona!
 * 
 * Bem, JavaScript tem uma característica chamada "hoisting", que significa 
 * que as declarações de variáveis são movidas para o topo do escopo 
 * durante a compilação. Isso permite que você declare variáveis depois de
 * usá-las, e ainda assim funcione corretamente. No entanto, isso pode
 * levar a confusões, especialmente com variáveis não inicializadas.
 */
var FILTER = null;
var FILTER_NAME;
var LOADER;
var CONTAINER;
var CARDS = [];
var POKEMON_TYPES = [
  ["Colorless", "⚪️"],
  ["Darkness", "🌑"],
  ["Dragon", "🐉"],
  ["Fairy", "🧚"],
  ["Fighting", "🥊"],
  ["Fire", "🔥"],
  ["Grass", "🌿"],
  ["Lightning", "⚡️"],
  ["Metal", "⚙️"],
  ["Psychic", "🔮"],
  ["Water", "💧"],
];
