import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './app-button.html',
  styleUrl: './app-button.css'
})
export class AppButton {
  @Input() label: string = "";
  @Input() icon: string = "";
  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    this.clicked.emit();
  }
}
