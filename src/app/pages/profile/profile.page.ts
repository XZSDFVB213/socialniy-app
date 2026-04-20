import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonContent, RouterLink],
  templateUrl: './profile.page.html',
})
export class ProfilePage {}