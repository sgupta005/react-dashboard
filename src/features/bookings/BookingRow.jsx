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
import { Eye, LogIn, LogOut, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { LoadingSpinner } from "@/ui/Spinner";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

function BookingRow({ booking }) {
  const navigate = useNavigate();
  const { checkOutBooking, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

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

  if (isCheckingOut) return <LoadingSpinner />;
  return (
    <Modal>
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
                  <LogIn /> <span>Check In</span>
                </MenuItem>
              )}
              {status === "checked-in" && (
                <MenuItem onClick={() => checkOutBooking(id)}>
                  <LogOut /> <span>Check Out</span>
                </MenuItem>
              )}
              <Modal.Open opens="delete">
                <MenuItem>
                  <Trash />
                  <span>Delete</span>
                </MenuItem>
              </Modal.Open>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Modal.Window name="delete">
        <ConfirmDelete
          disabled={isDeletingBooking}
          resourceName="booking"
          onConfirm={() => {
            deleteBooking(id);
          }}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingRow;
