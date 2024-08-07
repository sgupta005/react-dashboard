import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import { LoadingSpinner } from "@/ui/Spinner";
import BookingsOperations from "./BookingsOperations";
import Pagination from "@/ui/Pagination";
import { PAGE_COUNT } from "@/utils/constants";
import EmptyTable from "@/ui/EmptyTable";

function BookingsTable() {
  const { isLoading, bookings, count, totalCount } = useBookings();

  if (isLoading) return <LoadingSpinner />;
  return (
    <main className="grid flex-1 items-start">
      {totalCount === 0 ? (
        <p className="text-lg font-medium">No bookings could be found.</p>
      ) : (
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>All Bookings</CardTitle>
              <BookingsOperations />
            </div>
            <CardDescription>Manage all bookings.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[150px] md:table-cell">
                    CABIN
                  </TableHead>
                  <TableHead className="">GUEST</TableHead>
                  <TableHead className="md:w-[275px]">DATES</TableHead>
                  <TableHead className="md:table-cell">STATUS</TableHead>
                  <TableHead className="md:table-cell">AMOUNT</TableHead>

                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings?.map((booking) => (
                  <BookingRow key={booking.id} booking={booking} />
                ))}
              </TableBody>
            </Table>
            {count === 0 && <EmptyTable />}
          </CardContent>
          {count / PAGE_COUNT > 1 && <Pagination count={count} />}
        </Card>
      )}
    </main>
  );
}

export default BookingsTable;
