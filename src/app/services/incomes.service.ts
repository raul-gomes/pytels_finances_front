import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENVIRONMENTS } from '../environments';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  constructor(private httpClient: HttpClient) { }

  getIncomes(month: any) {
    return this.httpClient.get<any>(`${ENVIRONMENTS.getIncomes}${month+1}`)
  }

  newIncome(incomeForm: any) {
    this.httpClient.post(ENVIRONMENTS.newIncome, incomeForm).subscribe(event => {
      return event
    })
  }

  getDescribes() {
    return this.httpClient.get<any>(ENVIRONMENTS.getDescribes)
  }
}
