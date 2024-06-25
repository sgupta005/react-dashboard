import FormRow from "@/ui/FormRow";
import { Button } from "@/ui/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import { useUser } from "../authentication/useUser";
import { useState } from "react";
import { Input } from "@/ui/shadcn/ui/input";

function UpdateAccount() {
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName, avatar: currentAvatar },
  } = user;
  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(currentAvatar);
  function handleSubmit() {}
  return (
    <Card className="bg-muted/40">
      <CardHeader>
        <CardTitle>Update user data</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              value={avatar}
              onChange={(e) => setAvatar(console.log(e.target.files[0]))}
              id="avatar  "
              type="file"
              className="file:boder-none file:mr-4 file:rounded-md file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground file:hover:cursor-pointer file:hover:bg-primary/90"
            />
          </FormRow>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-4 pr-20">
        <Button variant="secondary" type="reset">
          Cancel
        </Button>
        <Button>Update account</Button>
      </CardFooter>
    </Card>
  );
}

export default UpdateAccount;
