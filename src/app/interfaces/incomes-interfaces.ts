export interface IIncome {
    date: string;
    describe: string;
    icon: string;
    amount: string;
}

export interface IIncomeResponse {
    income: IIncome[]
  }
  