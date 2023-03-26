import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictinariesPanelComponent } from './dictinaries-panel.component';

describe('DictinariesPanelComponent', () => {
  let component: DictinariesPanelComponent;
  let fixture: ComponentFixture<DictinariesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictinariesPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictinariesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
