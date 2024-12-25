import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateInfosPage } from './update-infos.page';

describe('UpdateInfosPage', () => {
  let component: UpdateInfosPage;
  let fixture: ComponentFixture<UpdateInfosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
