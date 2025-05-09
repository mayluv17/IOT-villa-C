'use client';

import { TrendingUp } from 'lucide-react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartConfig = {
  wood: {
    label: 'Wood Level',
    color: 'hsl(var(--chart-2))',
  },
  nowood: {
    label: 'No wood',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function RadialChart({ woodLevel }: { woodLevel: number }) {
  const chartData = [{ woodState: 'wood', value: woodLevel, fill: 'hsl(var(--chart-2))' }];
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Wood Level</CardTitle>
        <CardDescription>Today</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <RadialBarChart
            data={chartData}
            startAngle={0}
            endAngle={(woodLevel / 100) * 360}
            // percentage is here
            innerRadius={80}
            outerRadius={110}>
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="value" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                          {chartData[0]?.value?.toLocaleString()}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">Showing level of wood in store</div>
        <div className="rounded-full p-1 px-4 bg-yellow-200 text-yellow-950 flex items-center">
          {woodLevel < 30 ? 'Prepare to fill up' : 'You have enough wood in store'}{' '}
          <TrendingUp className="h-4 w-4 ml-2" />
        </div>
      </CardFooter>
    </Card>
  );
}
