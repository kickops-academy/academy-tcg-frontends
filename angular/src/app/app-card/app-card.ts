import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './app-card.html',
  styleUrl: './app-card.css'
})
export class AppCard {
  @Input() source: string = "";
  @Input() alt: string = "";
}
