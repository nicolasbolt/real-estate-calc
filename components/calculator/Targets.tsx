import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Targets = () => {
  return (
    <div className="p-6 border rounded-lg shadow-md w-full h-fit">
      <h2 className="text-xl font-bold mb-4">Targets</h2>
      <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col space-y-2">
          <Label className="block font-medium">NOI</Label>
          <Input type="text" className="p-2 border rounded-md" />
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="block font-medium">Cash Flow</Label>
          <Input type="text" className="p-2 border rounded-md" />
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="block font-medium">Cap Rate</Label>
          <Input type="text" className="p-2 border rounded-md" />
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="block font-medium">Cash on Cash Return</Label>
          <Input type="text" className="p-2 border rounded-md" />
        </div>
        <div className="flex flex-col space-y-2">
          <Label className="block font-medium">Total ROI</Label>
          <Input type="text" className="p-2 border rounded-md" />
        </div>
        {/* <div className="flex flex-col space-y-2">
          <Label className="block font-medium">Target 6</Label>
          <Input type="text" className="p-2 border rounded-md" />
        </div> */}
      </form>
    </div>
  );
}

export default Targets;
