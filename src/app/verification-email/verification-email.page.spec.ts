import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerificationEmailPage } from './verification-email.page';

describe('VerificationEmailPage', () => {
  let component: VerificationEmailPage;
  let fixture: ComponentFixture<VerificationEmailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
