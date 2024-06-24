import FormInput from "@/ui/FormInput";
import FormRow from "@/ui/FormRow";
import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/shadcn/ui/card";
import { useForm } from "react-hook-form";

function CreateUser() {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data) {}
  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="mt-6 space-y-6">
          <FormRow label="Full Name" error={errors?.fullName?.message}>
            <FormInput
              id="fullName"
              register={register("fullName", {
                required: "This field is required",
              })}
              error={errors?.fullName?.message}
            />
          </FormRow>
          <FormRow label="Email address" error={errors?.email?.message}>
            <FormInput
              id="email"
              type="email"
              error={errors?.email?.message}
              register={register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Provide a valid email address.",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Password (min 8 characters)"
            error={errors?.password?.message}
          >
            <FormInput
              id="password"
              type="password"
              error={errors?.password?.message}
              register={register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password must be atleast 8 characters.",
                },
              })}
            />
          </FormRow>
          <FormRow
            label="Repeat password"
            error={errors?.passwordConfirm?.message}
          >
            <FormInput
              id="passwordConfirm"
              type="password"
              error={errors?.passwordConfirm?.message}
              register={register("passwordConfirm", {
                required: "This field is required",
                validate: (value) =>
                  value === getValues().password || "Passwords need to match.",
              })}
            />
          </FormRow>
        </CardContent>
        <CardFooter className="flex w-full justify-end gap-4 pr-20">
          <Button variant="secondary" size="lg" type="reset">
            Cancel
          </Button>
          <Button size="lg">Create User</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CreateUser;
