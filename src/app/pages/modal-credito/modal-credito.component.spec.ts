import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreditoComponent } from './modal-credito.component';

describe('ModalCreditoComponent', () => {
  let component: ModalCreditoComponent;
  let fixture: ComponentFixture<ModalCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
