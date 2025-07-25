import { css, html, LitElement } from "lit";

export class AppButton extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      icon: { type: String },
      clickHandler: { type: Function },
    }
  }

  constructor() {
    super();
  }
  
  static get styles() {
    return css`
      button {
        width: 100%;
        border: 1px solid color-mix(in srgb, var(--ko-yellow) 25%, #000000);
        background-color: transparent;
        color: var(--ko-yellow);
        font-family: inherit;
        font-size: 1rem;
        padding: 0.25em 0.5em;
        border-radius: 0.5em;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background-color: color-mix(
            in srgb,
            var(--ko-yellow) 25%,
            #000000
          );
        }
      }
    `;
  }

  render() {
    return html`
      <button @click=${this.clickHandler}>
        ${this.icon} ${this.label}
      </button>
    `;
  }
}

window.customElements.define("app-button", AppButton);
