import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, Injector } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TuiDialogService } from '@taiga-ui/core';
import { firstValueFrom, Observable, ReplaySubject, Subscription } from 'rxjs';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ModalCreditoComponent } from '../modal-credito/modal-credito.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomesService } from '../../services/incomes.service';
import { TuiDay } from '@taiga-ui/cdk';
import { IIncome, IIncomeResponse } from '../../interfaces/incomes-interfaces';

const MONTHS: { [key: number]: string } = {
  0: 'Janeiro',
  1: 'Fevereiro',
  2: 'Março',
  3: 'Abril',
  4: 'Maio',
  5: 'Junho',
  6: 'Julho',
  7: 'Agosto',
  8: 'Setembro',
  9: 'Outubro',
  10: 'Novembro',
  11: 'Dezembro'

}


@Component({
  selector: 'app-credito',
  templateUrl: './credito.component.html',
  styleUrl: './credito.component.scss',
  providers: [
    IncomesService
  ]
})
export class CreditoComponent {

  constructor(
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private fb: FormBuilder,
    private incomeService: IncomesService
  ) { }

  // Global Variables
  
  displayedColumns: string[] = ['data', 'descricao', 'valor'];
  currentMonthDatepick = MONTHS[new Date().getMonth()]
  monthForm!: FormGroup;
  totalAmount!: number;
  
  ELEMENT_DATA: IIncome[] = [];
  dataSource = new MatTableDataSource<IIncome>();


  private readonly dialog = this.dialogs.open<number>(
    new PolymorpheusComponent(ModalCreditoComponent, this.injector),
    {},
  );

  months: string[] = this.getMesesAteCorrente()


  keyMonth(monthName: string) {
    for (const key in MONTHS) {
      if (MONTHS[key] === monthName) {
        return Number(key);
      }
    }
    return null
  }


  getMesesAteCorrente(): string[] {
    const todayDate = new Date();
    const currentMonth = todayDate.getMonth();

    const mesesAteCorrente: string[] = [];
    for (let i = 0; i <= currentMonth; i++) {
      mesesAteCorrente.push(MONTHS[i]);
    }

    return mesesAteCorrente;
  }

  getIncomes(month: number | null) {
    this.incomeService.getIncomes(month).subscribe(
      data => {
        console.log(data)
        this.dataSource = data.incomes
        this.totalAmount = data.incomes.reduce((sum: number, incomes: IIncome) => {
          return sum + parseFloat(incomes.amount)
        }, 0)
      },
      error => {
        console.log('error', error)
      });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadData();
    
    this.monthForm = this.fb.group({
      month: [this.currentMonthDatepick, Validators.required]
  
    })

    this.getIncomes(this.keyMonth(this.monthForm.value.month))

    this.monthForm.valueChanges.subscribe(change => {
      this.getIncomes(this.keyMonth(this.monthForm.value.month))
    },
      error => {
        console.log('error', error)
      });
  }

  async loadData() {
    try {
      const data: IIncomeResponse = await firstValueFrom(
        this.incomeService.getIncomes(7));
      this.dataSource.data = data.income
    } catch (error) {
      console.log(error)
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showDialog(): void {
    this.dialog.subscribe({
      next: (income: any) => {
        console.log(income);
        this.incomeService.newIncome(income)
      },
      complete: () => {
        console.info('Dialog closed');
        location.reload();
      },
    });
  }

}
