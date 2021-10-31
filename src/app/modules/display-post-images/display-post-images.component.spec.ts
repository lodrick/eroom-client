import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPostImagesComponent } from './display-post-images.component';

describe('DisplayPostImagesComponent', () => {
  let component: DisplayPostImagesComponent;
  let fixture: ComponentFixture<DisplayPostImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayPostImagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPostImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
