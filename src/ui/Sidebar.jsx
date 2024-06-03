import { NavLink } from 'react-router-dom';
import { Calendar, Home, School, Settings, Users } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="border-r bg-muted/40 [grid-column:1/2] [grid-row:1/3]">
      <div className="flex flex-col gap-2">
        <img
          src="/logo-light.png"
          alt="logo"
          className="flex items-center px-8 py-8"
        />

        <div className="flex-1">
          <nav className="grid items-start px-2 text-lg font-medium lg:px-4 space-y-4">
            <NavLink
              to={'dashboard'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary'
                  : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              }
            >
              <Home className="h-5 w-5" />
              Home
            </NavLink>
            <NavLink
              to={'bookings'}
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary'
                  : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              }
            >
              <Calendar className="h-5 w-5" />
              Bookings
            </NavLink>
            <NavLink
              to="cabins"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary'
                  : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              }
            >
              <School className="h-5 w-5" />
              Cabins
            </NavLink>
            <NavLink
              to="users"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary'
                  : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              }
            >
              <Users className="h-5 w-5" />
              Users
            </NavLink>
            <NavLink
              to="Settings"
              className={({ isActive }) =>
                isActive
                  ? 'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary bg-muted text-primary'
                  : 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary'
              }
            >
              <Settings className="h-5 w-5" />
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}
