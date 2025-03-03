export interface ExpenseInput {
  amount: number;
  type: string;
}

export interface ExpenseInputs {
  propertyTaxes: ExpenseInput;
  vacancyRate: ExpenseInput;
  insurance: ExpenseInput;
  utilities: ExpenseInput;
  hoaFees: ExpenseInput;
  propertyManagement: ExpenseInput;
  repairs: ExpenseInput;
  capitalExpenditures: ExpenseInput;
  mortageInsurance: ExpenseInput;
  other: ExpenseInput;
  totalExpenses: number;
}