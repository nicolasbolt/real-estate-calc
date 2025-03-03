'use client'

import React from 'react';
import { calculateNOI, calculateCashFlow, calculateCapRate, calculateCashOnCashReturn, calculateLoanAmortization } from '@/utils/calculateFinancialAnalysis';
import { RevenueInputs } from '@/types/revenue';
import { ExpenseInputs } from '@/types/expenses';

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

const InvestmentAnalysis = ({ revenue, expenses, mortgagePayment, downPayment, homePrice, loanAmount, annualInterestRate, loanTermYears }: InvestmentAnalysisProps) => {

  const noi = calculateNOI(revenue, expenses);
  const cashFlow = calculateCashFlow(revenue, expenses, mortgagePayment);
  const capRate = calculateCapRate(revenue, expenses, homePrice);
  const cashOnCashReturn = calculateCashOnCashReturn(revenue, expenses, mortgagePayment, downPayment);
  const amortizationSchedule = calculateLoanAmortization(loanAmount, annualInterestRate, loanTermYears);
  const firstYearAmortization = amortizationSchedule[0];
  const totalROI = cashFlow + firstYearAmortization.principalPaid;
  const totalROIPercentage = (totalROI / downPayment) * 100;

  return (
    <div className="p-6 mb-3 border rounded-lg shadow-md w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Investment Analysis</h2>
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="space-y-3 flex-1">
          <div className="flex">
            <span>Net Operating Income (NOI):</span>
            <strong className='ml-3'>${noi.toFixed(2)}</strong>
          </div>
          <div className="flex">
            <span>Cash Flow:</span>
            <strong className='ml-3'>${cashFlow.toFixed(2)}</strong>
          </div>
          <div className="flex">
            <span>Cap Rate:</span>
            <strong className='ml-3'>{(capRate * 100).toFixed(2)}%</strong>
          </div>
          <div className="flex">
            <span>Cash on Cash Return:</span>
            <strong className='ml-3'>{(cashOnCashReturn * 100).toFixed(2)}%</strong>
          </div>
          <div className="flex">
            <span>Total ROI (Cash Flow + Amortization):</span>
            <strong className='ml-3'>${totalROI.toFixed(2)} ({totalROIPercentage.toFixed(2)}%)</strong>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex">
            <span>First Year Amortization - Interest Paid:</span>
            <strong className='ml-3'>${firstYearAmortization.interestPaid.toFixed(2)}</strong>
          </div>
          <div className="flex">
            <span>First Year Amortization - Principal Paid:</span>
            <strong className='ml-3'>${firstYearAmortization.principalPaid.toFixed(2)}</strong>
          </div>
          <div className="flex">
            <span>First Year Amortization - Remaining Balance:</span>
            <strong className='ml-3'>${firstYearAmortization.remainingBalance.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAnalysis;