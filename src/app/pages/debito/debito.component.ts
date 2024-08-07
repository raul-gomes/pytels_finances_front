import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  data: Date;
  descricao: string;
  icon:string;
  tipo_despesa: string;
  credito_debito: string;
  valor: number;
}

const MESES: { [key: number]: string } = {
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

const ELEMENT_DATA: PeriodicElement[] = [
  {data: new Date(), descricao: 'Contas', icon: '', tipo_despesa: 'Casa', credito_debito: 'Crédito', valor: 1009 },
  {data: new Date(), descricao: 'Escola',icon: '', tipo_despesa: 'Filhos', credito_debito: 'Débito', valor: 426 },
  {data: new Date(), descricao: 'Multas', icon: '', tipo_despesa: 'Carro', credito_debito: 'Débito', valor: 441 },
  {data: new Date(), descricao: 'Gonçalina', icon: '', tipo_despesa: 'Lazer', credito_debito: 'Débito', valor: 2122 },
];

@Component({
  selector: 'app-debito',
  templateUrl: './debito.component.html',
  styleUrl: './debito.component.scss'
})
export class DebitoComponent {
  displayedColumns: string[] = ['data', 'descricao', 'tipo_despesa', 'credito_debito', 'valor'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  
  mes_corrente = MESES[new Date().getMonth()]

  valorTotal = ELEMENT_DATA.reduce((acc, element) => acc + element.valor, 0)
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log()
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
