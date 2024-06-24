import { editCabin as editCabinApi } from "@/services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => editCabinApi(cabin, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
  return { isEditing, editCabin };
}
