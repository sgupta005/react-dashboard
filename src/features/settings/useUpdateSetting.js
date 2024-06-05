import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "@/services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });
  return { isUpdating, updateSetting };
}
