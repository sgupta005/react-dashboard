import BookingStatus from "./BookingStatus";

import { Button } from "@/ui/shadcn/ui/button";
import { ChevronLeft } from "lucide-react";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/ui/Spinner";
import BookingDataBox from "./BookingDataBox";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

function BookingDetails() {
  const navigate = useNavigate();
  const { checkOutBooking, isCheckingOut } = useCheckOut();
  const { isLoading, booking } = useBooking();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  const { id, status } = booking || {};

  if (isLoading) return <LoadingSpinner />;
  return (
    <>
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="mr-2 h-7 w-7"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Button>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-2xl font-bold uppercase tracking-tight sm:grow-0">
          Booking #{id}
        </h1>
        <BookingStatus status={status} />
      </div>
      <BookingDataBox booking={booking} />
      <div className="ml-auto mr-0 w-max space-x-6">
        {status === "unconfirmed" && (
          <Button size="lg" onClick={() => navigate(`/check-in/${id}`)}>
            Check In
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            size="lg"
            onClick={() => {
              checkOutBooking(id);
              navigate(-1);
            }}
          >
            Check Out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => {}}
              disabled={isDeletingBooking}
            >
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              disabled={isDeletingBooking}
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(id);
                navigate(-1);
              }}
            />
          </Modal.Window>
        </Modal>
        <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
}

export default BookingDetails;
