import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TUI_LAST_DAY, TuiDay } from '@taiga-ui/cdk';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { TuiNamedDay } from '@taiga-ui/kit';
import { firstValueFrom, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { IncomesService } from '../../services/incomes.service';

@Component({
  selector: 'app-modal-credito',
  templateUrl: './modal-credito.component.html',
  styleUrl: './modal-credito.component.scss'
})
export class ModalCreditoComponent implements OnInit {
  myControl = new FormControl('');
  options?: string[];
  filteredOptions!: Observable<string[]>;
  incomeForm!: FormGroup;
  otherControl: Boolean = false;

  from: TuiDay | null = null;
  to: TuiDay | null = null;
  min = new TuiDay(2017, 9, 4);
  max = TuiDay.currentLocal();
  items = [
    new TuiNamedDay(
      TUI_LAST_DAY.append({ year: -1 }),
      'Until today',
      TuiDay.currentLocal(),
    ),
  ];

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext,
    private fb: FormBuilder,
    private incomeService: IncomesService

  ) {
    this.incomeForm = this.fb.group({
      date: ['', Validators.required],
      describe: ['', Validators.required],
      amount: ['', Validators.required],
      newDescribe: [''],
      isNewDescribe: [false]
    });
   }

  async ngOnInit(): Promise<void> {
    await this.loadMonths();

    console.log('options_out : ', this.options);

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


    this.incomeForm.get('describe')?.valueChanges.subscribe((change) => {
       this.otherControl = change === 'Outro'
    }
    )
  }

  async loadMonths(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.incomeService.getDescribes());
      this.options = data.describes;
    } catch (error) {
      console.log(error);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options!.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  submit() {

    if (this.incomeForm.valid) {
      let date = this.incomeForm.value.date.toString()
      this.incomeForm.get('date')?.setValue(this.convertDate(date))

      if (this.incomeForm.get('newDescribe')?.value) {
        this.incomeForm.get('isNewDescribe')?.setValue(true);
      }
      this.context.completeWith(this.incomeForm.value);
    }
  }

  convertDate(dateString: string) {
    const [day, month, year] = dateString.split('.');
    return `${year}-${month}-${day}`
  }

  closeDialog() {
    this.context.completeWith()
  }


}
