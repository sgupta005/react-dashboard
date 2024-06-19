import { LoadingSpinner } from "@/ui/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/ui/table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import CabinOperations from "./CabinOperations";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "";

  let filteredCabins = [];

  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  if (sortValue === "name-asc")
    filteredCabins?.sort((a, b) => Number(a.name) - Number(b.name));
  if (sortValue === "name-desc")
    filteredCabins?.sort((a, b) => Number(b.name) - Number(a.name));
  if (sortValue === "regularPrice-asc")
    filteredCabins?.sort(
      (a, b) => Number(a.regularPrice) - Number(b.regularPrice),
    );
  if (sortValue === "regularPrice-desc")
    filteredCabins?.sort(
      (a, b) => Number(b.regularPrice) - Number(a.regularPrice),
    );
  if (sortValue === "maxCapacity-asc")
    filteredCabins?.sort((a, b) => a.maxCapacity - b.maxCapacity);
  if (sortValue === "maxCapacity-desc")
    filteredCabins?.sort((a, b) => b.maxCapacity - a.maxCapacity);

  if (isLoading) return <LoadingSpinner />;
  return (
    <main className="grid flex-1 items-start">
      <Card x-chunk="dashboard-06-chunk-0" className="bg-muted/40">
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>All Cabins</CardTitle>
            <CabinOperations />
          </div>
          <CardDescription>Manage all Cabins and add new ones.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[150px] md:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead className="">CABIN</TableHead>
                <TableHead className="md:w-[275px]">CAPACITY</TableHead>
                <TableHead className="md:table-cell">PRICE</TableHead>
                <TableHead className="md:table-cell">DISCOUNT</TableHead>

                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCabins.map((cabin) => (
                <CabinRow cabin={cabin} key={cabin.id} />
              ))}
            </TableBody>
          </Table>
          {cabins.length === 0 &&
            (isLoading ? (
              <LoadingSpinner />
            ) : (
              <p className="mx-auto mt-6 w-max text-lg font-medium">
                No data to show at the moment.
              </p>
            ))}
        </CardContent>
      </Card>
    </main>
  );
}

export default CabinTable;
