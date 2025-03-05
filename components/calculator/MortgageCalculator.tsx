'use client'

import { MortgageInputs } from "@/types/mortgage"
import { calculateMortgage } from "@/utils/calculateMortgage"
import { camelCaseToWords } from "@/utils/stringUtils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { DollarSign, Pencil } from "lucide-react"

interface MortgageCalculatorProps {
  mortgage: MortgageInputs
  setMortgage: React.Dispatch<React.SetStateAction<MortgageInputs>>
}

const MortgageCalculator = ({ mortgage, setMortgage }: MortgageCalculatorProps) => {
  const monthlyPayment = calculateMortgage(mortgage)
  
  const handleInputChange = (key: keyof MortgageInputs, value: number) => {
    setMortgage((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="space-y-8 p-4 rounded-lg bg-[#B3BDF2]/20">
      {/* Home Price */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="homePrice" className="text-sm font-medium text-gray-700">Home Price</Label>
          <span className="text-sm font-medium text-[#072BF2]">${mortgage.homePrice.toLocaleString()}</span>
        </div>
        <div className="py-2">
          <Slider 
            id="homePrice"
            min={50000} 
            max={2000000} 
            step={5000} 
            value={[mortgage.homePrice]} 
            onValueChange={(value) => handleInputChange('homePrice', value[0])}
          />
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center h-full">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="number"
            id="homePrice"
            value={mortgage.homePrice}
            onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
            className="pl-8 pr-10 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter amount"
          />
          <div className="absolute right-3 flex items-center h-full">
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      {/* Down Payment */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="downPayment" className="text-sm font-medium text-gray-700">Down Payment</Label>
          <span className="text-sm font-medium text-[#072BF2]">
            ${mortgage.downPayment.toLocaleString()} ({((mortgage.downPayment / mortgage.homePrice) * 100).toFixed(0)}%)
          </span>
        </div>
        <div className="py-2">
          <Slider 
            id="downPayment"
            min={0} 
            max={mortgage.homePrice} 
            step={5000} 
            value={[mortgage.downPayment]} 
            onValueChange={(value) => handleInputChange('downPayment', value[0])}
          />
        </div>
        <div className="relative flex items-center">
          <div className="absolute left-3 flex items-center h-full">
            <DollarSign className="h-4 w-4 text-gray-500" />
          </div>
          <Input
            type="number"
            id="downPayment"
            value={mortgage.downPayment}
            onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
            className="pl-8 pr-10 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter amount"
          />
          <div className="absolute right-3 flex items-center h-full">
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      {/* Interest Rate */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">Interest Rate</Label>
          <span className="text-sm font-medium text-[#072BF2]">{mortgage.interestRate}%</span>
        </div>
        <div className="py-2">
          <Slider 
            id="interestRate"
            min={1} 
            max={10} 
            step={0.125} 
            value={[mortgage.interestRate]} 
            onValueChange={(value) => handleInputChange('interestRate', value[0])}
          />
        </div>
        <div className="relative flex items-center">
          <Input
            type="number"
            id="interestRate"
            value={mortgage.interestRate}
            onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
            step={0.125}
            className="pr-20 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter rate"
          />
          <div className="absolute right-3 flex items-center h-full space-x-2">
            <span className="text-gray-500 mr-2">%</span>
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      {/* Loan Term */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700">Loan Term</Label>
          <span className="text-sm font-medium text-[#072BF2]">{mortgage.loanTerm} years</span>
        </div>
        <div className="py-2">
          <Slider 
            id="loanTerm"
            min={10} 
            max={30} 
            step={5} 
            value={[mortgage.loanTerm]} 
            onValueChange={(value) => handleInputChange('loanTerm', value[0])}
          />
        </div>
        <div className="relative flex items-center">
          <Input
            type="number"
            id="loanTerm"
            value={mortgage.loanTerm}
            onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
            className="pr-24 h-12 border-[#B3BDF2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4B75F2] focus-visible:ring-offset-2"
            placeholder="Enter years"
          />
          <div className="absolute right-3 flex items-center h-full space-x-2">
            <span className="text-gray-500 mr-2">years</span>
            <Pencil className="h-4 w-4 text-[#578BF2]" />
          </div>
        </div>
      </div>

      <Separator className="my-6 bg-[#C5D0D9]" />

      <Card className="bg-[#578BF2]/10 border border-[#578BF2]/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Monthly Payment:</span>
            <span className="text-xl font-bold text-[#072BF2]">${monthlyPayment.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span>Total Loan Amount:</span>
            <span>${(mortgage.homePrice - mortgage.downPayment).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default MortgageCalculator
