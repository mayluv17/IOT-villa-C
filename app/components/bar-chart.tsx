'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartConfig = {
  temp: {
    label: 'Temperature',
  },
} satisfies ChartConfig;

type chartType = {
  date: string;
  temperature: string;
};

type ChartProps = {
  chartData: chartType[];
};

export function NegativeBarChar({ chartData }: ChartProps) {
  console.log(chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Temperature Chart</CardTitle>
        <CardDescription>This Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel hideIndicator />} />
            <Bar dataKey="temperature">
              <LabelList position="top" dataKey="month" fillOpacity={1} />
              {chartData?.map((item) => (
                <Cell
                  key={item.date}
                  fill={Number(item.temperature) > 0 ? 'hsl(var(--chart-1))' : 'hsl(var(--chart-2))'}
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
