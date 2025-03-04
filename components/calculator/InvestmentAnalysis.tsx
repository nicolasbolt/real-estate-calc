'use client'

import React from 'react';
import { calculateNOI, calculateCashFlow, calculateCapRate, calculateCashOnCashReturn, calculateLoanAmortization } from '@/utils/calculateFinancialAnalysis';
import { RevenueInputs } from '@/types/revenue';
import { ExpenseInputs } from '@/types/expenses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, ArrowUp, BarChart3, PieChart, Calendar, ArrowRight } from "lucide-react";

interface InvestmentAnalysisProps {
  revenue: RevenueInputs;
  expenses: ExpenseInputs;
  mortgagePayment: number;
  downPayment: number;
  homePrice: number;
  loanAmount: number;
  annualInterestRate: number;
  loanTermYears: number;
}

const InvestmentAnalysis = ({ 
  revenue, 
  expenses, 
  mortgagePayment, 
  downPayment, 
  homePrice, 
  loanAmount, 
  annualInterestRate, 
  loanTermYears 
}: InvestmentAnalysisProps) => {

  const noi = calculateNOI(revenue, expenses);
  const cashFlow = calculateCashFlow(revenue, expenses, mortgagePayment);
  const capRate = calculateCapRate(revenue, expenses, homePrice);
  const cashOnCashReturn = calculateCashOnCashReturn(revenue, expenses, mortgagePayment, downPayment);
  const amortizationSchedule = calculateLoanAmortization(loanAmount, annualInterestRate, loanTermYears);
  const firstYearAmortization = amortizationSchedule[0];
  const totalROI = cashFlow + firstYearAmortization.principalPaid;
  const totalROIPercentage = (totalROI / downPayment) * 100;

  // Determine color for metrics based on value
  const getMetricColor = (value: number) => {
    if (value > 0) return "text-emerald-600";
    if (value < 0) return "text-red-500";
    return "text-gray-600";
  };

  // Determine background color intensity based on ROI percentage
  const getRoiBgIntensity = (percentage: number) => {
    if (percentage >= 20) return "from-emerald-500/20 to-emerald-500/5";
    if (percentage >= 10) return "from-blue-500/20 to-blue-500/5";
    if (percentage >= 5) return "from-amber-500/20 to-amber-500/5";
    if (percentage >= 0) return "from-orange-500/20 to-orange-500/5";
    return "from-red-500/20 to-red-500/5";
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cards remain unchanged */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROI Breakdown */}
        <Card className={`border-[#B3BDF2]/50 shadow-sm overflow-hidden bg-gradient-to-br ${getRoiBgIntensity(totalROIPercentage)}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <ArrowUp className="h-4 w-4 mr-2 text-[#072BF2]" /> 
              Return on Investment
            </CardTitle>
            <CardDescription>
              Annual returns breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Cash Flow */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <span className="size-2 rounded-full bg-[#072BF2] mr-2"></span>
                  <span className="text-sm text-gray-600">Cash Flow</span>
                </div>
                <div>
                  <span className="text-sm font-semibold">${(cashFlow * 12).toFixed(2)}</span>
                  <span className="ml-1 text-xs text-gray-500">/ year</span>
                </div>
              </div>
              
              {/* Principal Paid */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <span className="size-2 rounded-full bg-[#4B75F2] mr-2"></span>
                  <span className="text-sm text-gray-600">Principal Paid</span>
                </div>
                <div>
                  <span className="text-sm font-semibold">${firstYearAmortization.principalPaid.toFixed(2)}</span>
                  <span className="ml-1 text-xs text-gray-500">/ year</span>
                </div>
              </div>
              
              {/* Total ROI - with separator */}
              <div className="pt-3 mt-2 border-t border-[#B3BDF2]/30">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Total ROI</span>
                  <div>
                    <span className="text-base font-bold text-[#072BF2]">${totalROI.toFixed(2)}</span>
                    <span className="ml-2 text-sm font-medium text-[#4B75F2]">({totalROIPercentage.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loan Amortization */}
        <Card className="border-[#B3BDF2]/50 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-[#072BF2]" /> 
              First Year Amortization
            </CardTitle>
            <CardDescription>
              Loan paydown breakdown
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {/* Interest Paid */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <span className="size-2 rounded-full bg-amber-500 mr-2"></span>
                  <span className="text-sm text-gray-600">Interest Paid</span>
                </div>
                <span className="text-sm font-semibold">${firstYearAmortization.interestPaid.toFixed(2)}</span>
              </div>
              
              {/* Principal Paid */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <span className="size-2 rounded-full bg-emerald-500 mr-2"></span>
                  <span className="text-sm text-gray-600">Principal Paid</span>
                </div>
                <span className="text-sm font-semibold">${firstYearAmortization.principalPaid.toFixed(2)}</span>
              </div>
              
              {/* Remaining Balance */}
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <span className="size-2 rounded-full bg-gray-400 mr-2"></span>
                  <span className="text-sm text-gray-600">Remaining Balance</span>
                </div>
                <span className="text-sm font-semibold">${firstYearAmortization.remainingBalance.toFixed(2)}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative pt-5 mt-2">
              <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ 
                    width: `${(firstYearAmortization.principalPaid/loanAmount)*100}%` 
                  }}
                ></div>
              </div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                {((firstYearAmortization.principalPaid/loanAmount)*100).toFixed(2)}% paid in first year
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Analysis */}
        <Card className="border-[#B3BDF2]/50 shadow-sm bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center">
              <ArrowRight className="h-4 w-4 mr-2 text-[#072BF2]" /> 
              Property Analysis
            </CardTitle>
            <CardDescription>
              Investment overview
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2.5">
              {/* Purchase Price */}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Purchase Price:</span>
                <span className="text-sm font-semibold">${homePrice.toLocaleString()}</span>
              </div>
              
              {/* Down Payment */}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Down Payment:</span>
                <div className="text-right">
                  <span className="text-sm font-semibold">${downPayment.toLocaleString()}</span>
                  <span className="text-xs text-gray-500 block">
                    ({((downPayment/homePrice)*100).toFixed(0)}%)
                  </span>
                </div>
              </div>
              
              {/* Monthly Revenue */}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Monthly Revenue:</span>
                <span className="text-sm font-semibold">${revenue.grossRentalIncome.toLocaleString()}</span>
              </div>
              
              {/* Monthly Expenses */}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Monthly Expenses:</span>
                <span className="text-sm font-semibold">${expenses.totalExpenses.toLocaleString()}</span>
              </div>
              
              {/* Mortgage Payment */}
              <div className="flex justify-between items-center py-1">
                <span className="text-sm text-gray-600">Mortgage Payment:</span>
                <span className="text-sm font-semibold">${mortgagePayment.toFixed(2)}</span>
              </div>
              
              {/* Monthly NOI - with separator */}
              <div className="pt-2 mt-1 border-t border-[#B3BDF2]/30">
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-sm font-medium text-gray-700">Monthly NOI:</span>
                  <span className="text-sm font-semibold">${(noi/12).toFixed(2)}</span>
                </div>
              </div>
              
              {/* Annual NOI */}
              <div className="flex justify-between items-center py-1.5">
                <span className="text-sm font-medium text-gray-700">Annual NOI:</span>
                <span className="text-sm font-bold text-[#072BF2]">${noi.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;