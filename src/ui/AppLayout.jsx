import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

function AppLayout() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <main className="flex-grow w-full mx-8 space-y-6 mt-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
