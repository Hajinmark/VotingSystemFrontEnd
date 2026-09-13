import { Component, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  protected readonly isMenuOpen = signal(false);

  protected toggleMenu(): void {
    this.isMenuOpen.update((isOpen) => !isOpen);
  }
}
