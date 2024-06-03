import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <div className="h-screen grid [grid-template-rows:60px_1fr] [grid-template-columns:300px_1fr]">
      <Sidebar />
      <Header />
      <main className="[grid-column:2/3] [grid-row:2/3] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
