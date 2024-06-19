import { TableCell, TableRow } from "@/ui/shadcn/ui/table";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import { format, isToday } from "date-fns";

function BookingRow({ booking }) {
  const {
    // created_at,
    startDate,
    endDate,
    numNights,
    status,
    totalPrice,
    cabins: { name: cabinName },
    guests: { fullName: guestName, email },
  } = booking;

  let statusClassname;
  if (status === "unconfirmed")
    statusClassname =
      "w-max flex justify-center rounded-2xl bg-blue-100 py-1 px-2 font-medium uppercase text-blue-500";
  if (status === "checked-in")
    statusClassname =
      "w-max flex justify-center rounded-2xl bg-green-100 py-1 px-2 font-medium uppercase text-emerald-700";
  if (status === "checked-out")
    statusClassname =
      "w-max flex justify-center rounded-2xl bg-gray-200 py-1 px-2 font-medium uppercase text-gray-500";

  return (
    <TableRow>
      <TableCell className="font-medium">{cabinName}</TableCell>
      <TableCell>
        <p className="font-medium">{guestName}</p>
        <p>{email}</p>
      </TableCell>
      <TableCell className="md:table-cell">
        <p className="font-medium">
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
          </span>
          <span> &rarr; </span>
          <span>{numNights} night stay</span>
        </p>
        <p>
          {format(new Date(startDate), "MMM dd yyyy")} -{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </p>
      </TableCell>
      <TableCell>
        <p className={statusClassname}>{status}</p>
      </TableCell>

      <TableCell className="font-semibold md:table-cell">
        {formatCurrency(totalPrice)}
      </TableCell>
    </TableRow>
  );
}

export default BookingRow;
