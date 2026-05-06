import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerSliderPage } from './banner-slider.page';

describe('BannerSliderPage', () => {
  let component: BannerSliderPage;
  let fixture: ComponentFixture<BannerSliderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerSliderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
