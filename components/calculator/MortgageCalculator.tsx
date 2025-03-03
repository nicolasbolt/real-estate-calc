'use client'

import { MortgageInputs } from "@/types/mortgage"
import { calculateMortgage } from "@/utils/calculateMortgage"
import { camelCaseToWords } from "@/utils/stringUtils"

interface MortgageCalculatorProps {
  mortgage: MortgageInputs
  setMortgage: React.Dispatch<React.SetStateAction<MortgageInputs>>
}

const MortgageCalculator = ({ mortgage, setMortgage }: MortgageCalculatorProps) => {
  

  const monthlyPayment = calculateMortgage(mortgage)

  return (
    <div className="p-6 border rounded-lg shadow-md w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Mortgage Calculator</h2>
      <form className="space-y-3">
        {Object.keys(mortgage).map((key) => (
          <div key={key} className="flex items-center justify-between">
            <label className="block font-medium w-1/2">{camelCaseToWords(key)}</label>
            <input
              type="number"
              value={mortgage[key as keyof MortgageInputs]}
              onChange={(e) =>
                setMortgage((prev) => ({
                  ...prev,
                  [key]: Number(e.target.value),
                }))
              }
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
        ))}
      </form>
      <p className="mt-4 text-lg flex justify-between">
        <span>Monthly Payment:</span>
        <strong>${monthlyPayment.toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default MortgageCalculator
