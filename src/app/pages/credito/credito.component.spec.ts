import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoComponent } from './credito.component';

describe('CreditoComponent', () => {
  let component: CreditoComponent;
  let fixture: ComponentFixture<CreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
