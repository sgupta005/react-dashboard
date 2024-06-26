import FormRow from "@/ui/FormRow";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { useUser } from "./useUser";
import { useState } from "react";
import { Input } from "@/ui/shadcn/ui/input";
import { useUpdateUser } from "./useUpdateUser";
import SpinnerMini from "@/ui/SpinnerMini";
import UpdatePassword from "./UpdatePassword";

function UpdateAccount() {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const { updateUser, isUpdating } = useUpdateUser();
  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;
    updateUser({ fullName, avatar });
  }
  function handleCancel() {
    setFullName(currentFullName);
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Update user data</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <FormRow label="Email address">
              <Input
                defaultValue={email}
                disabled
                id="email"
                className="w-52 rounded-sm p-1 shadow-sm hover:cursor-not-allowed"
              />
            </FormRow>
            <FormRow label="Full name">
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                id="fullName"
                className="w-52 rounded-sm p-1 shadow-sm"
              />
            </FormRow>
            <FormRow label="Avatar image">
              <input
                onChange={(e) => setAvatar(e.target.files[0])}
                id="avatar  "
                type="file"
                className="file:boder-none file:mr-4 file:rounded-md file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground file:hover:cursor-pointer file:hover:bg-primary/90"
              />
            </FormRow>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 pr-20">
            <Button variant="secondary" type="reset" onClick={handleCancel}>
              Cancel
            </Button>
            <Button disabled={isUpdating}>
              {isUpdating ? <SpinnerMini /> : "Update account"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <UpdatePassword />
    </>
  );
}

export default UpdateAccount;
