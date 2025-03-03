'use client'

import React from 'react'
import { ExpenseInputs, ExpenseInput } from '@/types/expenses'
import { camelCaseToWords } from '@/utils/stringUtils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ExpensesProps {
  expenses: ExpenseInputs;
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseInputs>>;
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
          ...prev[key],
          amount: value,
        },
        totalExpenses: calculateTotalExpenses({
          ...prev,
          [key]: {
            ...prev[key],
            amount: value,
          },
        }),
      }
      return newInputs
    })
  }

  return (
    <div className="p-6 border rounded-lg shadow-md w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Expenses</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(expenses)
          .filter((key) => key !== 'totalExpenses')
          .map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <Label className="block font-medium w-1/3">{camelCaseToWords(key)}</Label>
              <span className='mr-2'>$</span><Input
                type="number"
                value={(expenses[key as keyof ExpenseInputs] as ExpenseInput).amount}
                onChange={(e) => handleInputChange(key as keyof ExpenseInputs, Number(e.target.value))}
                className="w-1/3 p-2 border rounded-md"
              />
              {/* <select
                value={(expenses[key as keyof ExpenseInputs] as ExpenseInput).type}
                onChange={(e) =>
                  setExpenses((prev) => ({
                    ...prev,
                    [key]: {
                      ...(prev[key as keyof ExpenseInputs] as ExpenseInput),
                      type: e.target.value,
                    },
                  }))
                }
                className="w-1/3 p-2 border rounded-md"
              >
                <option value="$">$</option>
                <option value="%">%</option>
              </select> */}
            </div>
          ))}
      </form>
      <p className="mt-4 text-lg flex space-x-4">
        <span>Total Expenses:</span>
        <strong>${expenses.totalExpenses}</strong>
      </p>
    </div>
  )
}

export default Expenses
