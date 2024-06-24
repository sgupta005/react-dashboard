import { deleteBooking as deleteBookingApi } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success(`Booking Deleted successfully`);
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
  return { deleteBooking, isDeletingBooking };
}
