import template from "@/Stage.template.html?raw";

class Stage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = document.createElement("template");
    element.innerHTML = template;

    const root = this.attachShadow({ mode: "open" });
    root.appendChild(element.content.cloneNode(true));

    const appRoot = document.querySelector("app-root");
    appRoot.addEventListener("card-list", (event) => {
      const cardList = event.detail.list;
      const stage = this.shadowRoot.querySelector("#stage");
      stage.innerHTML = ""; // Clear previous cards

      if (cardList.length > 0) {
        cardList.forEach((card) => {
          if (!card.image) return;

          const cardElement = document.createElement("img");
          cardElement.src = `${card.image}/low.png`;
          cardElement.alt = card.name;
          stage.appendChild(cardElement);
        });
      } else {
        stage.textContent = "No cards.";
      }
    });
  }

  disconnectedCallback() {
    const appRoot = document.querySelector("app-root");
    appRoot.removeEventListener("card-list", this.handleCardList);
  }
}

customElements.define("app-stage", Stage);
