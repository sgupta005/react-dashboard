import { NavLink } from "react-router-dom";

function SidebarLink({ children, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? "hidden items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary md:flex"
          : "hidden items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary md:flex"
      }
    >
      {children}
    </NavLink>
  );
}

export default SidebarLink;
