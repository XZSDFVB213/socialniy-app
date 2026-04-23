import { Component } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonRouterOutlet, RouterLink],
  templateUrl: './tabs.layout.html',
  styleUrls: ['./tabs.layout.css']
})
export class TabsLayout {}