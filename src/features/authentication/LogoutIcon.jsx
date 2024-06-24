import { LogOut } from "lucide-react";
import { useLogout } from "./useLogout";
import { Button } from "@/ui/shadcn/ui/button";
import SpinnerMini from "@/ui/SpinnerMini";

function LogoutIcon() {
  const { logout, isLoading } = useLogout();
  return (
    <Button size="icon" onClick={logout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <LogOut />}
    </Button>
  );
}

export default LogoutIcon;
