import Filter from "@/ui/Filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { LoadingSpinner } from "@/ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import { DurationChart } from "./DurationChart";
import { SalesChart } from "./SalesChart";
import TodayActivity from "../check-in-out/TodayActivity";

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { confirmedStays, isLoading: isLoadingStays } = useRecentStays();
  const { cabins, isLoading: isLoadingCabins } = useCabins();
  if (isLoadingBookings || isLoadingStays || isLoadingCabins)
    return <LoadingSpinner />;
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Dashboard</CardTitle>
        <Filter
          filterField="last"
          options={[
            { value: "7", label: "Last 7 days" },
            { value: "30", label: "Last 30 days" },
            { value: "90", label: "Last 90 days" },
          ]}
        />
      </CardHeader>
      <CardContent className="grid gap-6 [grid-template-columns:1fr_1fr_1fr_1fr] [grid-template-rows:110px_330px_auto]">
        <Stats
          bookings={bookings}
          confirmedStays={confirmedStays}
          numCabins={cabins.length}
        />
        <TodayActivity />
        <DurationChart confirmedStays={confirmedStays} />
        <SalesChart bookings={bookings} />
      </CardContent>
    </Card>
  );
}

export default DashboardLayout;
