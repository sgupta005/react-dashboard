import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import Header from './Header';

function AppLayout() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-grow w-full">
        <Header />
        <main className="mx-8 space-y-6 mt-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
