'use client'

import { RevenueInputs } from '@/types/revenue'
import { camelCaseToWords } from '@/utils/stringUtils'
<<<<<<< Updated upstream
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { DollarSign, Pencil } from "lucide-react"
=======
import { Input } from '../ui/input';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    <div className="space-y-8 p-4 bg-[#B3BDF2]/20 rounded-lg">
      {/* Unit 1 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="unit1" className="text-sm font-medium text-gray-700">Unit 1 Rent</Label>
          <span className="text-sm font-medium text-[#072BF2]">${revenue.unit1.toLocaleString()}</span>
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center h-full">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="number"
            id="unit1"
            value={revenue.unit1}
            onChange={(e) => handleInputChange('unit1', Number(e.target.value))}
            className="pl-8 pr-10 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter monthly rent"
          />
          <div className="absolute right-3 flex items-center h-full">
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      {/* Unit 2 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="unit2" className="text-sm font-medium text-gray-700">Unit 2 Rent</Label>
          <span className="text-sm font-medium text-[#072BF2]">${revenue.unit2.toLocaleString()}</span>
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center h-full">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="number"
            id="unit2"
            value={revenue.unit2}
            onChange={(e) => handleInputChange('unit2', Number(e.target.value))}
            className="pl-8 pr-10 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter monthly rent"
          />
          <div className="absolute right-3 flex items-center h-full">
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      {/* Unit 3 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="unit3" className="text-sm font-medium text-gray-700">Unit 3 Rent</Label>
          <span className="text-sm font-medium text-[#072BF2]">${revenue.unit3.toLocaleString()}</span>
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center h-full">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="number"
            id="unit3"
            value={revenue.unit3}
            onChange={(e) => handleInputChange('unit3', Number(e.target.value))}
            className="pl-8 pr-10 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter monthly rent"
          />
          <div className="absolute right-3 flex items-center h-full">
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      {/* Unit 4 */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="unit4" className="text-sm font-medium text-gray-700">Unit 4 Rent</Label>
          <span className="text-sm font-medium text-[#072BF2]">${revenue.unit4.toLocaleString()}</span>
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center h-full">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="number"
            id="unit4"
            value={revenue.unit4}
            onChange={(e) => handleInputChange('unit4', Number(e.target.value))}
            className="pl-8 pr-10 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter monthly rent"
          />
          <div className="absolute right-3 flex items-center h-full">
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-[#C5D0D9]" />

      <Card className="bg-[#578BF2]/10 border border-[#578BF2]/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Total Monthly Revenue:</span>
            <span className="text-xl font-bold text-[#072BF2]">${revenue.grossRentalIncome.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>Annual Revenue:</span>
            <span>${(revenue.grossRentalIncome * 12).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
=======
    <div className="p-6 border rounded-lg shadow-md w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Revenue (per month)</h2>
      <form className="space-y-3">
        {Object.keys(revenue)
          .filter((key) => key !== 'grossRentalIncome')
          .map((key) => (
            <div key={key} className="flex items-center justify-between">
              <label className="block font-medium w-1/2">{camelCaseToWords(key)}</label>
              <Input
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
>>>>>>> Stashed changes
    </div>
  )
}

export default Revenue
