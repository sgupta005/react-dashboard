import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./shadcn/ui/avatar";
import { Button } from "./shadcn/ui/button";
import LogoutIcon from "@/features/authentication/LogoutIcon";
import { useUser } from "@/features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/features/theme/ThemeToggle";

function HeaderMenu() {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div className="flex w-full items-center justify-end gap-8 pr-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={user.user_metadata.avatar}
            alt="avatar image of user"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{user.user_metadata.fullName}</p>
      </div>
      <div className="flex gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/account")}
        >
          <User />
        </Button>
        <ThemeToggle />
        <LogoutIcon />
      </div>
    </div>
  );
}

export default HeaderMenu;
