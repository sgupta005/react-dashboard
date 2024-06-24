import { createCabin as createCabinApi } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("New cabin created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
  return { isCreating, createCabin };
}
