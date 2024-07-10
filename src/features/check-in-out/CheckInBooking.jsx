import { Button } from "@/ui/shadcn/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/ui/Spinner";
import { Card } from "@/ui/shadcn/ui/card";
import { Checkbox } from "@/ui/shadcn/ui/checkbox";
import { useEffect, useState } from "react";

import { formatCurrency } from "@/utils/helpers";
import { useCheckInBooking } from "./useCheckInBooking";
import { useSettings } from "../settings/useSettings";
import { useBooking } from "../bookings/useBooking";

import BookingStatus from "../bookings/BookingStatus";
import BookingDataBox from "../bookings/BookingDataBox";

function CheckInBooking() {
  const { isLoading, booking } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();
  const { isCheckingIn, checkInBooking } = useCheckInBooking();

  const navigate = useNavigate();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setaddBreakfast] = useState(false);

  const {
    id,
    status,
    isPaid,
    numNights,
    numGuests,
    hasBreakfast,
    totalPrice,
    guests: { fullName } = {},
  } = booking || {};

  const calculatedBreakfastPrice =
    settings?.breakfastPrice * numGuests * numNights;

  function handleCheckIn() {
    if (!confirmPaid) return;
    if (addBreakfast) {
      checkInBooking({
        bookingId: id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: calculatedBreakfastPrice,
        },
      });
    } else {
      checkInBooking({ bookingId: id, breakfast: {} });
    }
  }

  useEffect(
    function () {
      if (isPaid) setConfirmPaid(isPaid ?? false);
    },
    [isPaid],
  );
  if (isLoading || isLoadingSettings) return <LoadingSpinner />;
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
          Checking In Booking #{id}
        </h1>
        <BookingStatus status={status} />
      </div>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Card className="flex items-center gap-4 px-6 py-4 text-lg">
          <Checkbox
            id="addBreakfast"
            className="h-6 w-6"
            checked={addBreakfast}
            onCheckedChange={() => {
              setaddBreakfast((p) => !p);
              setConfirmPaid(false);
            }}
          />
          <label htmlFor="addBreakfast">
            Add Breakfast for {formatCurrency(calculatedBreakfastPrice)}
          </label>
        </Card>
      )}
      <Card className="flex items-center gap-4 px-6 py-4 text-lg">
        <Checkbox
          id="confirmPaid"
          className="h-6 w-6"
          checked={confirmPaid}
          onCheckedChange={() => setConfirmPaid((p) => !p)}
        />
        <label htmlFor="confirmPaid">
          I confirm that {fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(totalPrice + calculatedBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(calculatedBreakfastPrice)})`
            : formatCurrency(totalPrice)}
        </label>
      </Card>

      <div className="ml-auto mr-0 w-max space-x-6">
        <Button
          size="lg"
          disabled={!confirmPaid || isCheckingIn}
          onClick={handleCheckIn}
        >
          Check In booking #{id}
        </Button>
        <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
}

export default CheckInBooking;
