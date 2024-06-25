import {
  Ban,
  CircleCheck,
  CircleDollarSignIcon,
  NotepadText,
  School,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";

import { format, isToday } from "date-fns";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";

export default function BookingDataBox({ booking }) {
  const {
    created_at,
    numNights,
    numGuests,
    startDate,
    endDate,
    hasBreakfast,
    totalPrice,
    cabinPrice,
    extrasPrice,
    isPaid,
    observations,
    cabins: { name: cabinName } = {},
    guests: { fullName: guestName, email, nationalID, countryFlag } = {},
  } = booking || {};

  const priceClassname = isPaid
    ? "rounded-sm bg-green-100 text-green-700"
    : "rounded-sm bg-yellow-100 text-yellow-700";
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/40">
        <CardTitle className="flex items-center justify-between gap-4 text-xl">
          <span className="flex items-center gap-4">
            <School className="h-7 w-7" />
            {numNights} nights in Cabin {cabinName}
          </span>
          <span>
            {format(new Date(startDate), "EEE, MMM dd yyyy")} (
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}
            ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 px-12 py-10 text-lg">
        <p className="flex items-center space-x-4">
          <img src={countryFlag} className="w-[24px]" />
          <span className="font-bold">
            {guestName} + {numGuests - 1} guests
          </span>
          <span className="before:mr-4 before:text-black before:content-['•']">
            {email}
          </span>
          <span className="before:mr-4 before:text-black before:content-['•']">
            NATIONAL ID {nationalID}
          </span>
        </p>
        {observations && (
          <p className="flex items-center space-x-4">
            <span>
              <NotepadText />
            </span>
            <span className="font-bold">Observations </span>

            <span>{observations}</span>
          </p>
        )}
        <p className="flex items-center space-x-4">
          <span>{hasBreakfast ? <CircleCheck /> : <Ban />}</span>
          <span className="font-bold">Breakfast Included? </span>
          <span>{hasBreakfast ? "Yes" : "No"}</span>
        </p>
        <CardHeader className={priceClassname}>
          <CardTitle className="flex items-center justify-between gap-4 text-lg">
            <p className="flex items-center gap-4">
              <CircleDollarSignIcon />
              <span>Total Price {formatCurrency(totalPrice)}</span>
              <span>
                ({formatCurrency(cabinPrice)} cabin +{" "}
                {formatCurrency(extrasPrice)} breakfast)
              </span>
            </p>
            <p>{isPaid ? "PAID" : "WILL PAY AT PROPERTY"}</p>
          </CardTitle>
        </CardHeader>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-md space-x-4 text-muted-foreground">
          <span>Booked</span>
          <span>
            {format(new Date(created_at), "EEE, MMM dd yyyy, hh:mm a ")}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
