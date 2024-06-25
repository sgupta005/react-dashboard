import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <div className="flex border bg-muted/40 px-8 py-4 shadow-sm [grid-column:2/3] [grid-row:1/2]">
      <HeaderMenu />
    </div>
  );
}

export default Header;
