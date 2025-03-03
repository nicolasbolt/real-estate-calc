import { MortgageInputs } from "@/types/mortgage";

export const calculateMortgage = ({
    homePrice,
    downPayment,
    loanTerm,
    interestRate,
}: MortgageInputs): number => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // if the loan is interest free
    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }

    // otherwise, calculate the monthly payment with interest
    return principal * monthlyRate / (1 - Math.pow(1 / (1 + monthlyRate), numberOfPayments));
};