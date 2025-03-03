import { ExpenseInputs } from '@/types/expenses'
import { RevenueInputs } from '@/types/revenue'

export const calculateNOI = (revenue: RevenueInputs, expenses: ExpenseInputs) => {
    return revenue.grossRentalIncome - calculateTotalExpenses(expenses);
}

export const calculateTotalExpenses = (expenses: ExpenseInputs) => {
    return expenses.propertyTaxes.amount + expenses.insurance.amount + expenses.utilities.amount + expenses.hoaFees.amount + expenses.propertyManagement.amount + expenses.repairs.amount + expenses.capitalExpenditures.amount + expenses.mortageInsurance.amount + expenses.other.amount;
}

export const calculateCashFlow = (revenue: RevenueInputs, expenses: ExpenseInputs, mortgagePayment: number) => { 
    return calculateNOI(revenue, expenses) - mortgagePayment;
}

export const calculateCapRate = (revenue: RevenueInputs, expenses: ExpenseInputs, homePrice: number) => {
    return (calculateNOI(revenue, expenses) * 12) / homePrice;
}

export const calculateCashOnCashReturn = (revenue: RevenueInputs, expenses: ExpenseInputs, mortgagePayment: number, downPayment: number) => {
    return (calculateCashFlow(revenue, expenses, mortgagePayment) * 12) / downPayment;
}

// Function to calculate loan amortization for each year
export const calculateLoanAmortization = (loanAmount: number, annualInterestRate: number, loanTermYears: number) => {
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const numberOfPayments = loanTermYears * 12;
    const monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    
    let balance = loanAmount;
    const amortizationSchedule = [];

    for (let year = 1; year <= loanTermYears; year++) {
        let interestPaid = 0;
        let principalPaid = 0;

        for (let month = 1; month <= 12; month++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = monthlyPayment - interestPayment;
            balance -= principalPayment;

            interestPaid += interestPayment;
            principalPaid += principalPayment;
        }

        amortizationSchedule.push({
            year,
            interestPaid,
            principalPaid,
            remainingBalance: balance
        });
    }

    return amortizationSchedule;
}