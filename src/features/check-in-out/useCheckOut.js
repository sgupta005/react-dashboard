import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkOutBooking, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully.`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
  return { checkOutBooking, isCheckingOut };
}
