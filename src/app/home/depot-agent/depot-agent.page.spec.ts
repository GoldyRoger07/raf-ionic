import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepotAgentPage } from './depot-agent.page';

describe('DepotAgentPage', () => {
  let component: DepotAgentPage;
  let fixture: ComponentFixture<DepotAgentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepotAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
