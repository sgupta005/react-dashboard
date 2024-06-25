import { Calendar, Home, School, Settings, Users } from "lucide-react";
import SidebarLink from "./SidebarLink";
import Uploader from "@/data/Uploader";

export default function Sidebar() {
  return (
    <div className="w-0 border-r [grid-column:1/2] [grid-row:1/3] md:w-[300px]">
      <div className="flex flex-col gap-2">
        <img
          src="/logo-light.png"
          alt="logo"
          className="flex items-center px-8 py-8"
        />

        <div className="flex-1">
          <nav className="grid items-start space-y-4 px-2 text-lg font-medium lg:px-4">
            <SidebarLink to="dashboard">
              <Home className="h-5 w-5" />
              Home
            </SidebarLink>
            <SidebarLink to="bookings">
              <Calendar className="h-5 w-5" />
              Bookings
            </SidebarLink>
            <SidebarLink to="cabins">
              <School className="h-5 w-5" />
              Cabins
            </SidebarLink>
            <SidebarLink to="users">
              <Users className="h-5 w-5" />
              Users
            </SidebarLink>
            <SidebarLink to="settings">
              <Settings className="h-5 w-5" />
              Settings
            </SidebarLink>
          </nav>
        </div>
        <Uploader />
      </div>
    </div>
  );
}
