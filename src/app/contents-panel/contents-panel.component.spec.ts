import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsPanelComponent } from './contents-panel.component';

describe('ContentsPanelComponent', () => {
  let component: ContentsPanelComponent;
  let fixture: ComponentFixture<ContentsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
