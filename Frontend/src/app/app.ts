import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonApp,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { AuthService } from './services/auth/auth-service';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonApp, IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, RouterLink, IonApp],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('Социальный');
  private auth = inject(AuthService);
  ngOnInit() {
    this.auth.loadUser();
    register();
  }
}
