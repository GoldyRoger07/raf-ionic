import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangerPasswordPage } from './changer-password.page';

describe('ChangerPasswordPage', () => {
  let component: ChangerPasswordPage;
  let fixture: ComponentFixture<ChangerPasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangerPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
