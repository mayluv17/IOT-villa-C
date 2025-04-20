'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

function Occupancy({ motion }: { motion: boolean[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cottage Occupancy</CardTitle>
        <CardDescription>Check which of the cottage is occupied</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 m-4 gap-4">
          {motion.map((motion, i) => {
            const bgCOlor = motion ? 'bg-rose-500 border-rose-600' : ' bg-gray-500 border-gray-600';
            return (
              <div key={i}>
                <h4>Cottage {i + 1}</h4>
                <div className={cn(`max-w-40 bg-rose-500 border border-rose-600 h-20 rounded ${bgCOlor}`)}></div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">Is a customer overstaying?</div>

        <div className="rounded-full p-1 px-4 bg-blue-200 text-blue-950 flex items-center">
          {motion.filter((motion) => motion === true).length < 1
            ? 'No'
            : motion.filter((motion) => motion === true).length}{' '}
          rooms are occupied
        </div>
      </CardFooter>
    </Card>
  );
}

export default Occupancy;
