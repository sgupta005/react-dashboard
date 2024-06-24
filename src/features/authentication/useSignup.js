import { signup as signupApi } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success("New user created successfully.");
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
  return { signup, isLoading };
}
