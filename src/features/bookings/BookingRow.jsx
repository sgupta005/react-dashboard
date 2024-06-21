import BookingStatus from "./BookingStatus";
import MenuItem from "@/ui/MenuItem";
import { Button } from "@/ui/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/ui/shadcn/ui/dropdown-menu";
import { TableCell, TableRow } from "@/ui/shadcn/ui/table";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";

import { format, isToday } from "date-fns";
import { Eye, MoreHorizontal, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BookingRow({ booking }) {
  const navigate = useNavigate();

  const {
    // created_at,
    id,
    startDate,
    endDate,
    numNights,
    status,
    totalPrice,
    cabins: { name: cabinName },
    guests: { fullName: guestName, email },
  } = booking;

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
        <BookingStatus status={status} />
      </TableCell>

      <TableCell className="font-semibold md:table-cell">
        {formatCurrency(totalPrice)}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              className="hover:bg-muted-foreground/5"
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <MenuItem onClick={() => navigate(`/bookings/${id}`)}>
              <Eye /> <span>See Details</span>
            </MenuItem>
            {status === "unconfirmed" && (
              <MenuItem onClick={() => navigate(`/check-in/${id}`)}>
                <Vote /> <span>Check In</span>
              </MenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}

export default BookingRow;
