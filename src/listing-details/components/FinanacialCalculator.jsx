import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';

function WasteReuseCalculator({ productDetail }) {

    const [productCost, setProductCost] = useState(0);
    const [recyclingFee, setRecyclingFee] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const CalculateMonthlyPayment = () => {
        console.log(productCost, recyclingFee, loanTerm, downPayment);
        const Principal = productCost + recyclingFee - downPayment;
        const MonthlyPayment = Principal / loanTerm;

        setMonthlyPayment(MonthlyPayment.toFixed(2));
    };

    return (
        <div className='p-10 border rounded-xl shadow-md mt-7'>
            <h2 className='font-medium text-2xl'>Waste Reuse Financial Calculator</h2>
            <div className='flex gap-5 mt-5'>
                <div className="w-full">
                    <label>Product Cost (₹)</label>
                    <Input type="number" onChange={(e) => setProductCost(e.target.value)} />
                </div>
                <div className="w-full">
                    <label>Recycling Fee (₹)</label>
                    <Input type="number" onChange={(e) => setRecyclingFee(e.target.value)} />
                </div>
            </div>
            <div className='flex gap-5 mt-5'>
                <div className="w-full">
                    <label>Loan Term (Months)</label>
                    <Input type="number" onChange={(e) => setLoanTerm(e.target.value)} />
                </div>
                <div className="w-full">
                    <label>Down Payment (₹)</label>
                    <Input type="number" onChange={(e) => setDownPayment(e.target.value)} />
                </div>
            </div>

            {monthlyPayment > 0 && (
                <h2 className='font-medium text-2xl mt-5'>Your Monthly Payment Is: 
                    <span className='text-4xl font-bold'>₹{monthlyPayment}</span>
                </h2>
            )}
            <Button className="w-full mt-5" size="lg" onClick={CalculateMonthlyPayment}>
                Calculate
            </Button>
        </div>
    );
}

export default WasteReuseCalculator;
