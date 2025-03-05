'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

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
    <div className="container mx-auto py-10 px-4 md:w-8/12 w-11/12">
      <div className="flex flex-col items-center mb-10 bg-[#4B75F2]/10 py-8 px-6 rounded-lg border border-[#B3BDF2]/30 shadow-sm">
        <div className="mb-3">
          <h1 className="text-4xl md:text-left text-center font-bold text-[#072BF2]">
            Real Estate <span className="border-b-2 border-[#4B75F2] pb-0.5">Investment</span> Calculator
          </h1>
        </div>
        <p className="text-gray-700 mt-6 text-center max-w-2xl">
          Calculate your potential investment returns with our comprehensive real estate calculator
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#C5D0D9]/20">
              <TabsTrigger 
                value="inputs" 
                className="data-[state=active]:bg-[#4B75F2] data-[state=active]:text-white cursor-pointer"
              >
                Inputs
              </TabsTrigger>
              <TabsTrigger 
                value="expenses" 
                className="data-[state=active]:bg-[#4B75F2] data-[state=active]:text-white cursor-pointer"
              >
                Expenses
              </TabsTrigger>
              <TabsTrigger 
                value="analysis" 
                className="data-[state=active]:bg-[#4B75F2] data-[state=active]:text-white cursor-pointer"
              >
                Analysis
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="inputs" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-[#B3BDF2] shadow-md">
                  <CardHeader className="bg-[#072BF2]/5 py-4">
                    <CardTitle className="text-[#072BF2] text-xl">Mortgage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <MortgageCalculator mortgage={mortgage} setMortgage={setMortgage} />
                  </CardContent>
                </Card>
                
                <Card className="border-[#B3BDF2] shadow-md">
                  <CardHeader className="bg-[#072BF2]/5 py-4">
                    <CardTitle className="text-[#072BF2] text-xl">Revenue</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Revenue revenue={revenue} setRevenue={setRevenue} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="expenses" className="mt-4">
              <Card className="border-[#B3BDF2] shadow-md">
                <CardHeader className="bg-[#072BF2]/5 py-4">
                  <CardTitle className="text-[#072BF2] text-xl">Expenses Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Expenses expenses={expenses} setExpenses={setExpenses} grossRentalIncome={revenue.grossRentalIncome} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-4">
              <Card className="border-[#B3BDF2] shadow-md">
                <CardHeader className="bg-[#072BF2]/5 py-4">
                  <CardTitle className="text-[#072BF2] text-xl">Investment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
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
          <div className="bg-gradient-to-b from-[#C5D0D9]/30 to-transparent p-0.5 rounded-lg shadow-lg">
            <Card className="border-[#B3BDF2] shadow-inner rounded-md sticky top-4">
              <CardHeader className="bg-[#4B75F2]/10 py-4 rounded-t-md border-b border-[#B3BDF2]">
                <CardTitle className="text-[#072BF2] text-xl flex items-center">
                  <div className="h-6 w-1 bg-[#072BF2] rounded-full mr-2"></div>
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-5">
                  <div className="p-4 bg-[#B3BDF2]/20 rounded-md border border-[#B3BDF2]/30">
                    <h3 className="font-medium text-[#072BF2] mb-2 flex items-center">
                      <span className="h-3 w-3 bg-[#072BF2] rounded-full mr-2"></span>
                      Property Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Purchase Price:</span>
                        <span className="font-semibold">${mortgage.homePrice.toLocaleString()}</span>
                      </div>
                      <Separator className="bg-[#C5D0D9]/50" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Down Payment:</span>
                        <span className="font-semibold">${mortgage.downPayment.toLocaleString()} ({((mortgage.downPayment / mortgage.homePrice) * 100).toFixed(0)}%)</span>
                      </div>
                      <Separator className="bg-[#C5D0D9]/50" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Loan Amount:</span>
                        <span className="font-semibold">${(mortgage.homePrice - mortgage.downPayment).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#578BF2]/10 rounded-md border border-[#578BF2]/20">
                    <h3 className="font-medium text-[#072BF2] mb-2 flex items-center">
                      <span className="h-3 w-3 bg-[#578BF2] rounded-full mr-2"></span>
                      Monthly Financials
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gross Income:</span>
                        <span className="font-semibold">${revenue.grossRentalIncome.toLocaleString()}</span>
                      </div>
                      <Separator className="bg-[#C5D0D9]/50" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Expenses:</span>
                        <span className="font-semibold">${expenses.totalExpenses.toLocaleString()}</span>
                      </div>
                      <Separator className="bg-[#C5D0D9]/50" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mortgage Payment:</span>
                        <span className="font-semibold">${mortgagePayment.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-[#4B75F2]/20" />
                      <div className="flex justify-between pt-1">
                        <span className="text-gray-800 font-medium">Cash Flow:</span>
                        <span className="font-bold text-[#072BF2]">
                          ${(revenue.grossRentalIncome - expenses.totalExpenses - mortgagePayment).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#4B75F2]/10 rounded-md border border-[#4B75F2]/20">
                    <h3 className="font-medium text-[#072BF2] mb-2 flex items-center">
                      <span className="h-3 w-3 bg-[#4B75F2] rounded-full mr-2"></span>
                      Key Metrics
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cap Rate:</span>
                        <span className="font-semibold">
                          {((revenue.grossRentalIncome - expenses.totalExpenses) * 12 / mortgage.homePrice * 100).toFixed(2)}%
                        </span>
                      </div>
                      <Separator className="bg-[#C5D0D9]/50" />
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cash on Cash Return:</span>
                        <span className="font-semibold">
                          {((revenue.grossRentalIncome - expenses.totalExpenses - mortgagePayment) * 12 / mortgage.downPayment * 100).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
