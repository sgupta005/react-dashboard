import { getBookings } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useBookings() {
  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });
  return { isLoading, bookings };
}