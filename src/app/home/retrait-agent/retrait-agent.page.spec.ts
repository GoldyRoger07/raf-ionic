import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetraitAgentPage } from './retrait-agent.page';

describe('RetraitAgentPage', () => {
  let component: RetraitAgentPage;
  let fixture: ComponentFixture<RetraitAgentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RetraitAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
