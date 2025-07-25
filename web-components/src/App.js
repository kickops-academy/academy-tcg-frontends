import template from "@/App.template.html?raw";
import { loadPokemonByType, POKEMON_TYPES } from "@/helpers";

class App extends HTMLElement {
  type = null;

  constructor() {
    super();
  }

  connectedCallback() {
    const element = document.createElement("template");
    element.innerHTML = template;

    const root = this.attachShadow({ mode: "open" });
    root.appendChild(element.content.cloneNode(true));

    const loader = this.shadowRoot.querySelector("#loader");
    loader.classList.add("hidden");

    this.renderButtons();
  }

  renderButtons() {
    const menu = this.shadowRoot.querySelector("#menu");

    Object.entries(POKEMON_TYPES).forEach(([name, icon]) => {
      const button = document.createElement("button");
      button.textContent = `${name} ${icon}`;
      button.addEventListener("click", () => {
        const loader = this.shadowRoot.querySelector("#loader");
        loader.classList.remove("hidden");

        this.type = this.type === name ? null : name;

        const filterName = this.shadowRoot.querySelector("#filter-name");
        filterName.textContent = this.type
          ? `Type: ${this.type}`
          : "No filter applied";

        this.dispatchEvent(
          new CustomEvent("type-selected", {
            detail: { type: this.type },
            bubbles: true,
            composed: true,
          })
        );

        if (this.type) {
          loadPokemonByType(this.type)
            .then((cards) => {
              this.dispatchEvent(
                new CustomEvent("card-list", {
                  detail: { list: cards },
                  bubbles: true,
                  composed: true,
                })
              );
            })
            .catch((err) => {
              console.error("Error loading Pokémon cards:", err);
              this.dispatchEvent(
                new CustomEvent("card-list", {
                  detail: { list: [] },
                  bubbles: true,
                  composed: true,
                })
              );
            })
            .finally(() => {
              loader.classList.add("hidden");
            });
        } else {
          this.dispatchEvent(
            new CustomEvent("card-list", {
              detail: { list: [] },
              bubbles: true,
              composed: true,
            })
          );
          loader.classList.add("hidden");
        }
      });
      menu.appendChild(button);
    });
  }
}

customElements.define("app-root", App);
