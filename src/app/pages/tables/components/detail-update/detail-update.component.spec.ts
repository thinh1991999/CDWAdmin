import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailUpdateComponent } from './detail-update.component';

describe('DetailUpdateComponent', () => {
  let component: DetailUpdateComponent;
  let fixture: ComponentFixture<DetailUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
