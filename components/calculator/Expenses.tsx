'use client'

import React from 'react'
import { ExpenseInputs, ExpenseInput } from '@/types/expenses'
import { camelCaseToWords } from '@/utils/stringUtils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Pencil, PieChart, ArrowUpRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ExpensesProps {
  expenses: ExpenseInputs;
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseInputs>>;
  grossRentalIncome: number;
}

const Expenses = ({ expenses, setExpenses }: ExpensesProps) => {
  const calculateTotalExpenses = (inputs: ExpenseInputs) => {
    return Object.keys(inputs)
      .filter((key) => key !== 'totalExpenses')
      .reduce((total, key) => Number(total) + Number((inputs[key as keyof ExpenseInputs] as ExpenseInput).amount), 0)
  }

  const handleInputChange = (key: keyof ExpenseInputs, value: number) => {
    setExpenses((prev) => {
      const newInputs = {
        ...prev,
        [key]: {
          ...(prev[key as keyof ExpenseInputs] as ExpenseInput),
          amount: value,
        },
        totalExpenses: calculateTotalExpenses({
          ...prev,
          [key]: {
            ...(prev[key as keyof ExpenseInputs] as ExpenseInput),
            amount: value,
          },
        }),
      }
      return newInputs
    })
  }

  // Expense categories grouped by type
  const expenseGroups = {
    taxes: ['propertyTaxes', 'mortageInsurance'],
    operational: ['vacancyRate', 'insurance', 'utilities', 'hoaFees'],
    maintenance: ['propertyManagement', 'repairs', 'capitalExpenditures', 'other']
  };

  return (
    <div className="space-y-6 p-5 bg-[#B3BDF2]/20 rounded-lg">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-800">Monthly Expenses</h3>
            <p className="text-sm text-gray-500">Manage all your property expenses</p>
          </div>
          <TabsList className="bg-[#F0F2FB] w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-1">
            <TabsTrigger value="all" className="text-xs cursor-pointer">All Expenses</TabsTrigger>
            <TabsTrigger value="taxes" className="text-xs cursor-pointer">Taxes</TabsTrigger>
            <TabsTrigger value="operational" className="text-xs cursor-pointer">Operational</TabsTrigger>
            <TabsTrigger value="maintenance" className="text-xs cursor-pointer">Maintenance</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(expenses)
              .filter(key => key !== 'totalExpenses')
              .map((key) => (
                <div key={key} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <Label htmlFor={key} className="text-sm font-medium text-gray-700">{camelCaseToWords(key)}</Label>
                    <span className="text-sm font-medium text-[#072BF2]">
                      ${(expenses[key as keyof ExpenseInputs] as ExpenseInput).amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative flex items-center transition-all duration-150 group-hover:scale-[1.01]">
                    <div className="absolute left-3 flex items-center h-full">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      type="number"
                      id={key}
                      value={(expenses[key as keyof ExpenseInputs] as ExpenseInput).amount}
                      onChange={(e) => handleInputChange(key as keyof ExpenseInputs, Number(e.target.value))}
                      className="pl-8 pr-10 h-11 bg-white shadow-sm border-[#B3BDF2]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2 transition-all duration-150"
                      placeholder={`Enter ${camelCaseToWords(key).toLowerCase()}`}
                    />
                    <div className="absolute right-3 flex items-center h-full opacity-70 group-hover:opacity-100">
                      <Pencil className="h-4 w-4 text-[#578BF2]" />
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </TabsContent>

        {Object.entries(expenseGroups).map(([group, keys]) => (
          <TabsContent key={group} value={group} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keys.map((key) => (
                <div key={key} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <Label htmlFor={key} className="text-sm font-medium text-gray-700">{camelCaseToWords(key)}</Label>
                    <span className="text-sm font-medium text-[#072BF2]">
                      ${(expenses[key as keyof ExpenseInputs] as ExpenseInput).amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="relative flex items-center transition-all duration-150 group-hover:scale-[1.01]">
                    <div className="absolute left-3 flex items-center h-full">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                    </div>
                    <Input
                      type="number"
                      id={key}
                      value={(expenses[key as keyof ExpenseInputs] as ExpenseInput).amount}
                      onChange={(e) => handleInputChange(key as keyof ExpenseInputs, Number(e.target.value))}
                      className="pl-8 pr-10 h-11 bg-white shadow-sm border-[#B3BDF2]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2 transition-all duration-150"
                      placeholder={`Enter ${camelCaseToWords(key).toLowerCase()}`}
                    />
                    <div className="absolute right-3 flex items-center h-full opacity-70 group-hover:opacity-100">
                      <Pencil className="h-4 w-4 text-[#578BF2]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <Separator className="my-6 bg-[#C5D0D9]" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-[#578BF2]/10 border border-[#578BF2]/30 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-gray-700 font-medium flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-[#4B75F2]" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Monthly Expenses:</span>
              <span className="text-xl font-bold text-[#072BF2]">${expenses.totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Annual Expenses:</span>
              <span>${(expenses.totalExpenses * 12).toLocaleString()}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-[#C5D0D9]/40">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-xs text-gray-500">Property Taxes: 
                  <span className="ml-1 text-gray-700 font-medium">
                    ${(expenses.propertyTaxes as ExpenseInput).amount}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Insurance: 
                  <span className="ml-1 text-gray-700 font-medium">
                    ${(expenses.insurance as ExpenseInput).amount}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Vacancy: 
                  <span className="ml-1 text-gray-700 font-medium">
                    ${(expenses.vacancyRate as ExpenseInput).amount}
                  </span>
                </div>
                <div className="text-xs text-gray-500">Repairs: 
                  <span className="ml-1 text-gray-700 font-medium">
                    ${(expenses.repairs as ExpenseInput).amount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#578BF2]/10 border border-[#578BF2]/30 shadow-sm">
          <CardContent className="p-4 flex flex-col h-full min-h-[160px] justify-between">
            <div>
              <h4 className="text-lg font-semibold text-gray-700 flex items-center mb-2">
                <ArrowUpRight className="h-4 w-4 mr-2 text-[#4B75F2]" />
                Expense Ratio
              </h4>
              <p className="text-xs text-gray-500">Percentage of gross income</p>
            </div>
            <div className="mt-4">
              <div className="text-3xl font-bold text-[#072BF2]">
                {expenses.totalExpenses > 0 ? (expenses.totalExpenses / 2000 * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Industry standard: 35-45%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Expenses
