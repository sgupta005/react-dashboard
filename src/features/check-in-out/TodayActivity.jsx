import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { useTodayActivity } from "./useTodayActivity";
import { TableCell, TableRow } from "@/ui/shadcn/ui/table";
import BookingStatus from "../bookings/BookingStatus";
import { Button } from "@/ui/shadcn/ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "@/ui/Spinner";
import { useCheckOut } from "./useCheckOut";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

function TodayActivity() {
  const { isLoading, activities } = useTodayActivity();
  const navigate = useNavigate();
  const { checkOutBooking, isCheckingOut } = useCheckOut();
  if (isLoading) return <LoadingSpinner />;
  return (
    <Card className="[grid-column:1/3] [grid-row:2/3]">
      <CardHeader>
        <CardTitle>Today</CardTitle>
      </CardHeader>
      <CardContent className="h-[240px] overflow-y-scroll no-scrollbar">
        {activities?.map((activity) => (
          <TableRow key={activity.id}>
            <TableCell>
              <BookingStatus
                status={
                  activity.status === "unconfirmed" ? "arriving" : "departing"
                }
              />
            </TableCell>
            <TableCell className="w-[50px] p-0">
              <img src={activity.guests.countryFlag} className="w-24" />
            </TableCell>
            <TableCell>{activity.guests.fullName}</TableCell>
            <TableCell>
              {activity.status === "unconfirmed" && (
                <Button
                  className="w-20"
                  onClick={() => navigate(`/check-in/${activity.id}`)}
                >
                  Check In
                </Button>
              )}
              {activity.status === "checked-in" && (
                <Modal>
                  <Modal.Open opens="check-out">
                    <Button className="w-20" disabled={isCheckingOut}>
                      Check Out
                    </Button>
                  </Modal.Open>
                  <Modal.Window name="check-out">
                    <ConfirmDelete
                      resourceName="Check Out"
                      onConfirm={() => checkOutBooking(activity.id)}
                    />
                  </Modal.Window>
                </Modal>
              )}
            </TableCell>
          </TableRow>
        ))}
      </CardContent>
    </Card>
  );
}

export default TodayActivity;
