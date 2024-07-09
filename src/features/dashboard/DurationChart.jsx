import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/shadcn/ui/chart";
import { getChartData } from "@/utils/helpers";
import { Pie, PieChart } from "recharts";

const chartConfig = {
  one: {
    label: "1 night",
    color: "hsl(var(--chart-1))",
  },
  two: {
    label: "2 nights",
    color: "hsl(var(--chart-2))",
  },
  three: {
    label: "3 nights",
    color: "hsl(var(--chart-3))",
  },
  four: {
    label: "4-5 nights",
    color: "hsl(var(--chart-4))",
  },
  five: {
    label: "6-7 nights",
    color: "hsl(var(--chart-5))",
  },
  six: {
    label: "8-14 nights",
    color: "hsl(var(--chart-6))",
  },
  seven: {
    label: "15-21 nights",
    color: "hsl(var(--chart-7))",
  },
  eight: {
    label: "21+ nights",
    color: "hsl(var(--chart-8))",
  },
};

export function DurationChart({ confirmedStays }) {
  const chartData = getChartData(confirmedStays);
  return (
    <Card className="flex flex-col [grid-column:3/5] [grid-row:2/3]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stay duration summary</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="nights"
              innerRadius={60}
              outerRadius={80}
            />
            <ChartLegend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
