import AddCabin from "@/features/cabins/AddCabin";
import CabinTable from "@/features/cabins/CabinTable";

function Cabins() {
  return (
    <div className="mx-8 mt-6 space-y-6">
      <CabinTable />
      <AddCabin />
    </div>
  );
}

export default Cabins;
