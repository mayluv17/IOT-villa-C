'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function Occupancy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cottage Occupancy</CardTitle>
        <CardDescription>
          Check which of the cottage is occupied
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 m-4 gap-4">
          <div>
            <h4>Cottage 1</h4>
            <div className="w-40 bg-rose-500 border border-rose-600 h-20 rounded"></div>
          </div>
          <div>
            <h4>Cottage 2</h4>
            <div className="w-40 bg-rose-500 border border-rose-600 h-20 rounded"></div>
          </div>
          <div>
            <h4>Cottage 3</h4>
            <div className="w-40 bg-rose-500 border border-rose-600 h-20 rounded"></div>
          </div>
          <div>
            <h4>Cottage 4</h4>
            <div className="w-40 bg-gray-200 h-20 rounded"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Is a customer overstaying?
        </div>
        {/* <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
        <div className="rounded-full p-1 px-4 bg-blue-200 text-blue-950 flex items-center">
          2 rooms are occupied
        </div>
      </CardFooter>
    </Card>
  );
}

export default Occupancy;
