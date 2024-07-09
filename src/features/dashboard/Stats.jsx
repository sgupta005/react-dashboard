import { BriefcaseBusiness, Calendar, DollarSign, Signal } from "lucide-react";
import Stat from "./Stat";
import { formatCurrency } from "@/utils/helpers";
import { useSearchParams } from "react-router-dom";

function Stats({ bookings, confirmedStays, numCabins }) {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last");

  const numBookings = bookings.length;
  const checkIns = confirmedStays.length;
  const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const occupation =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * numCabins);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<BriefcaseBusiness className="h-4 w-4" />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        icon={<DollarSign className="h-4 w-4" />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-Ins"
        icon={<Calendar className="h-4 w-4" />}
        value={checkIns}
      />
      <Stat
        title="Occupancy Rate"
        icon={<Signal className="h-4 w-4" />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
}

export default Stats;
