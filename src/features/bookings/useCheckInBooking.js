import { updateBooking } from "@/services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckInBooking() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isPending: isCheckingIn, mutate: checkInBooking } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully.`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });
  return { isCheckingIn, checkInBooking };
}
