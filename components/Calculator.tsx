'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

import Expenses from "@/components/calculator/Expenses"
import MortgageCalculator from "@/components/calculator/MortgageCalculator"
import Revenue from "@/components/calculator/Revenue"
import InvestmentAnalysis from "@/components/calculator/InvestmentAnalysis"
import { RevenueInputs } from "@/types/revenue"
import { MortgageInputs } from "@/types/mortgage"
import { ExpenseInputs } from "@/types/expenses"
import { calculateMortgage } from "@/utils/calculateMortgage"

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

  const mortgagePayment = calculateMortgage(mortgage)

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold text-[#072BF2]">Real Estate Investment Calculator</h1>
        <p className="text-[#4B75F2] mt-2 text-center max-w-2xl">
          Calculate your potential investment returns with our comprehensive real estate calculator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#C5D0D9]/20">
              <TabsTrigger 
                value="inputs" 
                className="data-[state=active]:bg-[#4B75F2] data-[state=active]:text-white"
              >
                Inputs
              </TabsTrigger>
              <TabsTrigger 
                value="expenses" 
                className="data-[state=active]:bg-[#4B75F2] data-[state=active]:text-white"
              >
                Expenses
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="data-[state=active]:bg-[#4B75F2] data-[state=active]:text-white"
              >
                Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inputs" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-[#B3BDF2] shadow-md">
                  <CardHeader className="bg-[#072BF2]/5 pb-2">
                    <CardTitle className="text-[#072BF2]">Mortgage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <MortgageCalculator mortgage={mortgage} setMortgage={setMortgage} />
                  </CardContent>
                </Card>
                
                <Card className="border-[#B3BDF2] shadow-md">
                  <CardHeader className="bg-[#072BF2]/5 pb-2">
                    <CardTitle className="text-[#072BF2]">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <Revenue revenue={revenue} setRevenue={setRevenue} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-4">
              <Card className="border-[#B3BDF2] shadow-md">
                <CardHeader className="bg-[#072BF2]/5 pb-2">
                  <CardTitle className="text-[#072BF2]">Expenses Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <Expenses expenses={expenses} setExpenses={setExpenses} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-4">
              <Card className="border-[#B3BDF2] shadow-md">
                <CardHeader className="bg-[#072BF2]/5 pb-2">
                  <CardTitle className="text-[#072BF2]">Investment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-4">
          <Card className="border-[#B3BDF2] shadow-md sticky top-4">
            <CardHeader className="bg-[#072BF2] text-white">
              <CardTitle>Investment Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  <div className="p-3 bg-[#B3BDF2]/20 rounded-md">
                    <h3 className="font-medium text-[#072BF2]">Property Details</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-semibold">${mortgage.homePrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Down Payment:</span>
                        <span className="font-semibold">${mortgage.downPayment.toLocaleString()} ({((mortgage.downPayment / mortgage.homePrice) * 100).toFixed(0)}%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span className="font-semibold">${(mortgage.homePrice - mortgage.downPayment).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#578BF2]/10 rounded-md">
                    <h3 className="font-medium text-[#072BF2]">Monthly Financials</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross Income:</span>
                        <span className="font-semibold">${revenue.grossRentalIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Expenses:</span>
                        <span className="font-semibold">${expenses.totalExpenses.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mortgage Payment:</span>
                        <span className="font-semibold">${mortgagePayment.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between border-t border-[#4B75F2]/20 pt-1 mt-1">
                        <span className="text-gray-600">Cash Flow:</span>
                        <span className="font-semibold text-[#072BF2]">
                          ${(revenue.grossRentalIncome - expenses.totalExpenses - mortgagePayment).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#4B75F2]/10 rounded-md">
                    <h3 className="font-medium text-[#072BF2]">Key Metrics</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cap Rate:</span>
                        <span className="font-semibold">
                          {((revenue.grossRentalIncome - expenses.totalExpenses) * 12 / mortgage.homePrice * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cash on Cash Return:</span>
                        <span className="font-semibold">
                          {((revenue.grossRentalIncome - expenses.totalExpenses - mortgagePayment) * 12 / mortgage.downPayment * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Calculator
