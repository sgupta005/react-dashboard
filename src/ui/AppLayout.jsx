import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen [grid-template-columns:auto_1fr] [grid-template-rows:60px_1fr]">
      <Sidebar />
      <Header />
      <main className="no-scrollbar overflow-auto [grid-column:2/3] [grid-row:2/3]">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
