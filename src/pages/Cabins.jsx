import CabinTable from '@/features/cabins/CabinTable';
import CreateCabinForm from '@/features/cabins/CreateCabinForm';
import { Button } from '@/ui/shadcn/ui/button';
import { useState } from 'react';

function Cabins() {
  const [showCreateCabinForm, setShowCreateCabinForm] = useState(false);
  return (
    <div className="mx-8 space-y-6 mt-6">
      <CabinTable />
      <Button
        className={' w-full'}
        onClick={() => setShowCreateCabinForm((show) => !show)}
      >
        Add new Cabin
      </Button>
      {showCreateCabinForm && <CreateCabinForm />}
    </div>
  );
}

export default Cabins;
