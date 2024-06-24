import { login as loginApi } from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Logged In successfully.");
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });
  return { login, isLoading };
}
