import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsToolbarComponent } from './contents-toolbar.component';

describe('ContentsToolbarComponent', () => {
  let component: ContentsToolbarComponent;
  let fixture: ComponentFixture<ContentsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
