import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleAlert, DropletOff, Droplets } from 'lucide-react';
export function WaterLeakage({ moisture }: { moisture: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leakage</CardTitle>
        <CardDescription>The floor is wet</CardDescription>
      </CardHeader>
      <CardContent>
        {moisture > 5 ? (
          <Droplets color="#E11D47" className="w-56 h-56 place-self-center" strokeWidth={1} />
        ) : (
          <DropletOff color="#d8d8d8" className="w-56 h-56 place-self-center" strokeWidth={1} />
        )}
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
        {moisture > 5 ? (
          <div className="rounded-full p-1 px-4 bg-red-200 text-red-950 flex items-center">
            There is water leakage, go over to inspect
            <CircleAlert className="h-4 w-4 ml-2" />
          </div>
        ) : (
          <div className="rounded-full p-1 px-4 bg-blue-200 text-blue-950 flex items-center">
            No water Leakage detected
            <CircleAlert className="h-4 w-4 ml-2" />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
