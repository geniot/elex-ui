import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexPanelComponent } from './index-panel.component';

describe('IndexPanelComponent', () => {
  let component: IndexPanelComponent;
  let fixture: ComponentFixture<IndexPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
