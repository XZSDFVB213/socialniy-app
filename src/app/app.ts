import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    IonApp,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
    RouterLink,
    IonApp
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('social-store');
}