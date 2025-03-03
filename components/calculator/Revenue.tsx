'use client'

import { RevenueInputs } from '@/types/revenue'
import { camelCaseToWords } from '@/utils/stringUtils'

interface RevenueProps {
  revenue: RevenueInputs;
  setRevenue: React.Dispatch<React.SetStateAction<RevenueInputs>>;
}

const Revenue = ({ revenue, setRevenue }: RevenueProps) => {

  const calculateTotal = (inputs: RevenueInputs) => {
    return inputs.unit1 + inputs.unit2 + inputs.unit3 + inputs.unit4
  }

  const handleInputChange = (key: keyof RevenueInputs, value: number) => {
    setRevenue((prev) => {
      const newInputs = {
        ...prev,
        [key]: value,
        grossRentalIncome: calculateTotal({
          ...prev,
          [key]: value,
        }),
      }
      return newInputs
    })
  }

  return (
    <div className="p-6 border rounded-lg shadow-md w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Revenue</h2>
      <form className="space-y-3">
        {Object.keys(revenue)
          .filter((key) => key !== 'grossRentalIncome')
          .map((key) => (
            <div key={key} className="flex items-center justify-between">
              <label className="block font-medium w-1/2">{camelCaseToWords(key)}</label>
              <input
                type="number"
                value={revenue[key as keyof RevenueInputs]}
                onChange={(e) => handleInputChange(key as keyof RevenueInputs, Number(e.target.value))}
                className="w-1/2 p-2 border rounded-md"
              />
            </div>
          ))}
      </form>
      <p className="mt-4 text-lg flex justify-between">
        <span>Total Gross Rental Income:</span>
        <strong>${revenue.grossRentalIncome}</strong>
      </p>
    </div>
  )
}

export default Revenue
