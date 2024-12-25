import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompteProfilePage } from './compte-profile.page';

describe('CompteProfilePage', () => {
  let component: CompteProfilePage;
  let fixture: ComponentFixture<CompteProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompteProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
