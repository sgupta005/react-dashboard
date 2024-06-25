import { LogOut } from "lucide-react";
import { useLogout } from "./useLogout";
import { Button } from "@/ui/shadcn/ui/button";
import SpinnerMini from "@/ui/SpinnerMini";

function LogoutIcon() {
  const { logout, isLoading } = useLogout();
  return (
    <Button onClick={logout} disabled={isLoading} variant="outline" size="icon">
      {isLoading ? <SpinnerMini /> : <LogOut />}
    </Button>
  );
}

export default LogoutIcon;
