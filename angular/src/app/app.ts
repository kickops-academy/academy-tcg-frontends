import { Component, effect, signal } from '@angular/core';
import { AppButton } from './app-button/app-button';
import { AppCard } from './app-card/app-card';
import { loadPokemonByType, POKEMON_TYPES } from './helpers';

@Component({
  selector: 'app-root',
  imports: [AppButton, AppCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular');
  protected readonly pokemonTypes = Object.entries(POKEMON_TYPES);

  readonly loading = signal(false);
  readonly type = signal<string>('');
  readonly cards = signal<any[]>([]);

  constructor() {
    effect(() => {
      this.loading.set(true);
      if (this.type()) {
        loadPokemonByType(this.type()).then((cards) => {
          this.cards.set(cards);
          this.loading.set(false);
        });
      } else {
        this.cards.set([]);
        this.loading.set(false);
      }
    });
  }

  selectType(type: string): void {
    if (this.type() === type) {
      this.type.set("");
    } else {
      this.type.set(type);
    }
  }
}
