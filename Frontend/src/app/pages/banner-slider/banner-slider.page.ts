import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-slider',
  templateUrl: './banner-slider.page.html',
  styleUrls: ['./banner-slider.page.scss'],
  standalone: true,
  imports: [
    CommonModule,       // ← Главное
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerSliderPage implements OnInit {

  constructor() {}

  ngOnInit() {}
}