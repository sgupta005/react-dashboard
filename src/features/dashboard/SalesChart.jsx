import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/ui/shadcn/ui/chart";
import { getToday } from "@/utils/helpers";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export function SalesChart({ bookings }) {
  const [searchParams] = useSearchParams();
  const days = Number(searchParams.get("last")) ?? 7;
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), days - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => ({
    label: format(date, "dd MMM"),
    totalSale: bookings
      .filter((booking) => isSameDay(date, booking.created_at))
      .reduce((acc, curr) => acc + curr.totalPrice, 0),
    extrasSale: bookings
      .filter((booking) => isSameDay(date, booking.created_at))
      .reduce((acc, curr) => acc + curr.extrasPrice, 0),
  }));
  return (
    <Card className="[grid-column:1/5] [grid-row:3/4]">
      <CardHeader>
        <CardTitle>
          {`Sales form ${format(subDays(getToday(), days), "MMM dd yyyy")} - ${format(getToday(), "MMM dd yyyy")}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer height={300} width={"100%"}>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis unit="$" />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />

              <Area
                name="Total Sales"
                dataKey="totalSale"
                type="monotone"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
              <Area
                name="Extras Sale"
                dataKey="extrasSale"
                type="monotone"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="b"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
