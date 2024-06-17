import { DropdownMenuItem } from "./shadcn/ui/dropdown-menu";

function MenuItem({ children, onClick }) {
  return (
    <DropdownMenuItem className="text-md space-x-4 px-4 py-3" onClick={onClick}>
      {children}
    </DropdownMenuItem>
  );
}

export default MenuItem;
