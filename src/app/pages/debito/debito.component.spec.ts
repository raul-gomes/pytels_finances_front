import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoComponent } from './debito.component';

describe('DebitoComponent', () => {
  let component: DebitoComponent;
  let fixture: ComponentFixture<DebitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
