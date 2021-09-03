import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DictionaryButtonComponent } from './dictionary-button.component';

describe('DictionaryButtonComponent', () => {
  let component: DictionaryButtonComponent;
  let fixture: ComponentFixture<DictionaryButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DictionaryButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
