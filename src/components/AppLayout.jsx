import { Outlet } from 'react-router-dom';
import { Button } from './ui/button';

function AppLayout() {
  return (
    <div>
      <Button>Button</Button>
      App Layout
      <Outlet />
    </div>
  );
}

export default AppLayout;
