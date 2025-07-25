import $ from "jquery";

var POKEMON_TYPES = {
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

var FILTER = "";

var CARDS = [];

function displayCards(cards) {
  const stage = $("#stage");
  stage.empty();

  if (cards.length === 0) {
    stage.text("No cards.");
    return;
  }

  cards.forEach((card) => {
    if (!card.image) return;

    const cardElement = $("<img />");
    cardElement.attr("src", card.image + "/low.png");
    cardElement.attr("alt", card.name);
    stage.append(cardElement);
  });
}

function fetchCards(type) {
  var loader = $("#loader");
  loader.removeClass("hidden");

  return $.ajax({
    url: "http://localhost:3000/card/pokemon/" + type + "?amount=8",
    method: "GET"
  }).done(function (data) {
    loader.addClass("hidden");
    CARDS = data;

    displayCards(CARDS);
  }).fail(function (error) {
    console.error("Error fetching cards:", error);
    loader.addClass("hidden");
  });
}

function mapTypesToButtons() {
  Object.keys(POKEMON_TYPES).forEach((type) => {
    var button = $("<button></button>");
    button.text(POKEMON_TYPES[type] + " " + type);
    button.on("click", function () {
      FILTER = FILTER === type ? "" : type;
      $("#filter-name").text(FILTER ? "Filter: " + FILTER : "No filter applied");
      $("#stage").empty();

      if (FILTER) {
        fetchCards(type);
      }
    });

    $("#menu").append(button);
  });
}

$(function () {
  var loader = $("#loader");
  loader.addClass("hidden");
  mapTypesToButtons();
});
