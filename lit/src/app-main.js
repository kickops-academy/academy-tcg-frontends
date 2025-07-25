import { LitElement, css, html } from "lit";
import { loadPokemonByType, POKEMON_TYPES } from "@/helpers";
import "@/app-button.js";
import "@/app-card.js";

export class AppMain extends LitElement {
  static properties = {
    filter: { state: true },
    loading: { state: true },
    data: { state: true },
  };

  constructor() {
    super();
    this.filter = "";
    this.loading = false;
    this.data = [];
  }

  static get styles() {
    return css`
      :root {
        --ko-yellow: #feff94;

        color-scheme: dark;
        color: #ffffff;
        background-color: #000000;

        font-family: "Bitcount", sans-serif;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.25;

        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      @keyframes loading {
        0% {
          content: "Loading";
        }
        
        25% {
          content: "Loading.";
        }
        
        50% {
          content: "Loading..";
        }
        
        75% {
          content: "Loading...";
        }
        
        100% {
          content: "Loading...";
        }
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      #main {
        width: 100%;
        max-width: 720px;
        min-height: 100dvh;
        padding: 1rem;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      header {
        border-bottom: 1px solid
          color-mix(in srgb, var(--ko-yellow) 25%, #000000);

        h1 {
          color: var(--ko-yellow);
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.25;
          margin-bottom: 1rem;
        }
      }

      section#content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;

        aside {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;

          button {
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
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      }

      #filter-name {
        color: var(--ko-yellow);
        font-size: 1rem;
      }

      #stage {
        color: color-mix(in srgb, var(--ko-yellow) 45%, #000000);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        row-gap: 1rem;
        column-gap: 1rem;
        font-weight: 300;
      }

      footer {
        border-top: 1px solid color-mix(in srgb, var(--ko-yellow) 25%, #000000);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 1rem;

        p {
          color: color-mix(in srgb, var(--ko-yellow) 25%, #000000);
          font-size: 0.875rem;
          font-weight: 700;
          line-height: 1;
          text-align: center;
        }
      }

      .loading {
        &:after {
          content: "";
          display: inline-block;
          color: var(--ko-yellow);
          font-size: 1rem;
          font-weight: 200;
          animation: loading 0.5s infinite steps(3);
        }

        &.hidden {
          display: none;
        }
      }

      @media (min-width: 768px) {
        section#content {
          flex-direction: row;

          aside {
            width: 25%;
            flex-direction: column;
            align-items: stretch;
            justify-content: flex-start;
          }

          main {
            width: 75%;
          }
        }

        #stage {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }
    `;
  }

  updated(changedProperties) {
    if (changedProperties.has("filter")) {
      if (this.filter) {
        this.loading = true;

        loadPokemonByType(this.filter).then((data) => {
          this.data = data;
          this.loading = false;
        });
      } else {
        this.loading = false;
        this.data = false;
      }
    }
  }

  render() {
    return html`
      <div id="main">
        <header>
          <h1>Poké TCG Cards (Lit)</h1>
        </header>
        <section id="content">
          <aside id="menu">
            ${Object.entries(POKEMON_TYPES).map(
              ([label, icon]) => html`
                <app-button
                  .label=${label}
                  .icon=${icon}
                  @click=${() => (this.filter = label)}
                >
                  ${label} ${icon}
                </app-button>
              `
            )}
          </aside>
          <main>
            <h3 id="filter-name">
              ${this.filter ? `Filter: ${this.filter}` : "No filter applied"}
            </h3>
            
            ${
              this.loading 
                ? html`<span id="loader" class="loading"></span>`
                : ''
            }

            <div id="stage">
              ${this.data?.length ? this.data.map((card) => {
                if (!card?.image) return;

                return html`
                  <app-card 
                    .source=${`${card.image}/low.png`}
                    .alt=${card.name}
                  />
                `;
              }) : "No cards"}
            </div>
          </main>
        </section>
        <footer>
          <p>&copy;2025 Kickops</p>
        </footer>
      </div>
    `;
  }
}

window.customElements.define("app-main", AppMain);
