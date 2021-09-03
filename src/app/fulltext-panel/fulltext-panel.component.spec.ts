import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FulltextPanelComponent } from './fulltext-panel.component';

describe('FulltextPanelComponent', () => {
  let component: FulltextPanelComponent;
  let fixture: ComponentFixture<FulltextPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FulltextPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FulltextPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
