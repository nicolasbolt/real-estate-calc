'use client'

import { useState } from 'react'

import Expenses from "@/components/calculator/Expenses";
import MortgageCalculator from "@/components/calculator/MortgageCalculator";
import Revenue from "@/components/calculator/Revenue";
import InvestmentAnalysis from "@/components/calculator/InvestmentAnalysis";
import { RevenueInputs } from "@/types/revenue";
import { MortgageInputs } from "@/types/mortgage";
import { ExpenseInputs } from "@/types/expenses";
import { calculateMortgage } from "@/utils/calculateMortgage";

const Calculator = () => {
  const [revenue, setRevenue] = useState<RevenueInputs>({
    unit1: 2000,
    unit2: 0,
    unit3: 0,
    unit4: 0,
    grossRentalIncome: 2000
  })

  const [mortgage, setMortgage] = useState<MortgageInputs>({
    homePrice: 300000,
    downPayment: 60000,
    loanTerm: 30,
    interestRate: 5,
  })

  const [expenses, setExpenses] = useState<ExpenseInputs>({
    propertyTaxes: { amount: 0, type: '$' },
    vacancyRate: { amount: 0, type: '$' },
    insurance: { amount: 0, type: '$' },
    utilities: { amount: 0, type: '$' },
    hoaFees: { amount: 0, type: '$' },
    propertyManagement: { amount: 0, type: '$' },
    repairs: { amount: 0, type: '$' },
    capitalExpenditures: { amount: 0, type: '$' },
    mortageInsurance: { amount: 0, type: '$' },
    other: { amount: 0, type: '$' },
    totalExpenses: 0
  })

  const mortgagePayment = calculateMortgage(mortgage);

  return (
    <>
      <div className="md:flex space-x-4 mt-4 mx-auto md:w-6/12 w-11/12 md:space-y-0 space-y-4">
        <MortgageCalculator mortgage={mortgage} setMortgage={setMortgage} />
        <Revenue revenue={revenue} setRevenue={setRevenue} />
      </div>

      <div className="mx-auto md:w-6/12 w-11/12 mt-8">
        <Expenses expenses={expenses} setExpenses={setExpenses} />
      </div>

      <div className="mx-auto md:w-6/12 w-11/12 mt-8">
        <InvestmentAnalysis
          revenue={revenue}
          expenses={expenses}
          mortgagePayment={mortgagePayment}
          downPayment={mortgage.downPayment}
          homePrice={mortgage.homePrice}
          loanAmount={mortgage.homePrice - mortgage.downPayment}
          annualInterestRate={mortgage.interestRate}
          loanTermYears={mortgage.loanTerm}
        />
      </div>
    </>
  )
}

export default Calculator
