'use client'

import { MortgageInputs } from "@/types/mortgage"
import { calculateMortgage } from "@/utils/calculateMortgage"
import { camelCaseToWords } from "@/utils/stringUtils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"

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
    <div className="space-y-6">
      {/* Home Price */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="homePrice" className="text-sm font-medium text-gray-700">Home Price</Label>
          <span className="text-sm font-medium text-[#072BF2]">${mortgage.homePrice.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-4">
          <Slider 
            id="homePrice"
            min={50000} 
            max={2000000} 
            step={5000} 
            value={[mortgage.homePrice]} 
            onValueChange={(value) => handleInputChange('homePrice', value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={mortgage.homePrice}
            onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
            className="w-24 text-right"
          />
        </div>
      </div>

      {/* Down Payment */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="downPayment" className="text-sm font-medium text-gray-700">Down Payment</Label>
          <span className="text-sm font-medium text-[#072BF2]">
            ${mortgage.downPayment.toLocaleString()} ({((mortgage.downPayment / mortgage.homePrice) * 100).toFixed(0)}%)
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Slider 
            id="downPayment"
            min={0} 
            max={mortgage.homePrice} 
            step={5000} 
            value={[mortgage.downPayment]} 
            onValueChange={(value) => handleInputChange('downPayment', value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={mortgage.downPayment}
            onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
            className="w-24 text-right"
          />
        </div>
      </div>

      {/* Interest Rate */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="interestRate" className="text-sm font-medium text-gray-700">Interest Rate</Label>
          <span className="text-sm font-medium text-[#072BF2]">{mortgage.interestRate}%</span>
        </div>
        <div className="flex items-center gap-4">
          <Slider 
            id="interestRate"
            min={1} 
            max={10} 
            step={0.125} 
            value={[mortgage.interestRate]} 
            onValueChange={(value) => handleInputChange('interestRate', value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={mortgage.interestRate}
            onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
            step={0.125}
            className="w-24 text-right"
          />
        </div>
      </div>

      {/* Loan Term */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="loanTerm" className="text-sm font-medium text-gray-700">Loan Term (years)</Label>
          <span className="text-sm font-medium text-[#072BF2]">{mortgage.loanTerm} years</span>
        </div>
        <div className="flex items-center gap-4">
          <Slider 
            id="loanTerm"
            min={10} 
            max={30} 
            step={5} 
            value={[mortgage.loanTerm]} 
            onValueChange={(value) => handleInputChange('loanTerm', value[0])}
            className="flex-1"
          />
          <Input
            type="number"
            value={mortgage.loanTerm}
            onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
            className="w-24 text-right"
          />
        </div>
      </div>

      <Separator className="my-6 bg-[#C5D0D9]" />

      <Card className="bg-[#578BF2]/10 border-[#578BF2]/30">
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
