import FormRow from "@/ui/FormRow";
import SpinnerMini from "@/ui/SpinnerMini";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { useUpdateUser } from "./useUpdateUser";
import { useForm } from "react-hook-form";
import FormInput from "@/ui/FormInput";

function UpdatePassword() {
  const { updateUser, isUpdating } = useUpdateUser();
  const {
    reset,
    register,
    handleSubmit,
    getValues,
    formState: { errors } = {},
  } = useForm();
  function handleCancel() {
    reset();
  }
  function onSubmit({ password }) {
    updateUser({ password });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update password</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <FormRow
            label="New password (min 8 chars)"
            error={errors?.password?.message}
          >
            <FormInput
              register={register("password", {
                required: "This field is required.",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters.",
                },
              })}
              id="password"
              type="password"
              error={errors?.password?.message}
              className="w-52 rounded-sm p-1 shadow-sm"
            />
          </FormRow>
          <FormRow
            label="Repeat password"
            error={errors?.repeatPassword?.message}
          >
            <FormInput
              register={register("repeatPassword", {
                required: "This field is required.",

                validate: (value) =>
                  value === getValues().password || "Passwords must match.",
              })}
              type="password"
              id="repeatPassword"
              error={errors?.repeatPassword?.message}
              className="w-52 rounded-sm p-1 shadow-sm"
            />
          </FormRow>
        </CardContent>
        <CardFooter className="flex justify-end gap-4 pr-20">
          <Button variant="secondary" type="reset" onClick={handleCancel}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>
            {isUpdating ? <SpinnerMini /> : "Update password"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default UpdatePassword;
