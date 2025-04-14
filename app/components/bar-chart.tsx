'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { day: '04-12', temp: 186 },
  { day: '05-12', temp: 205 },
  { day: '06-12', temp: -207 },
  { day: '07-12', temp: 173 },
  { day: '08-12', temp: -209 },
  { day: '09-12', temp: 214 },
];

const chartConfig = {
  temp: {
    label: 'Temperature',
  },
} satisfies ChartConfig;

export function NegativeBarChar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Chart - Negative</CardTitle>
        <CardDescription>June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel hideIndicator />}
            />
            <Bar dataKey="temp">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData.map((item) => (
                <Cell
                  key={item.day}
                  fill={
                    item.temp > 0
                      ? 'hsl(var(--chart-1))'
                      : 'hsl(var(--chart-2))'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="rounded-full p-1 px-4 bg-blue-200 text-blue-950 flex items-center">
          The lake is frozen <TrendingUp className="h-4 w-4 ml-2" />
        </div>
      </CardFooter>
    </Card>
  );
}
