import CabinTable from '@/features/cabins/CabinTable';
import { Button } from '@/ui/shadcn/ui/button';

function Cabins() {
  return (
    <>
      <CabinTable />
      <Button className={' w-full'}>Add new Cabin</Button>
    </>
  );
}

export default Cabins;
