import { css, html, LitElement } from "lit";

export class AppCard extends LitElement {
  static get properties() {
    return {
      source: { type: String },
      alt: { type: String },
      error: { state: true }
    }
  }

  constructor() {
    super();
    this.error = false;
  }
  
  static get styles() {
    return css`
      img {
        width: 100%;
        margin: 0;
        padding: 0;
      }
    `;
  }

  render() {
    if (this.error) return null;

    return html`
      <img src=${this.source} alt=${this.alt} @error=${() => {
        this.error = true;
      }} />
    `;
  }
}

window.customElements.define("app-card", AppCard);
