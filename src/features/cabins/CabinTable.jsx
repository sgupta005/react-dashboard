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
import { Tabs, TabsContent } from "@radix-ui/react-tabs";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading)
    return (
      <LoadingSpinner className="mx-auto my-20 flex h-32 w-32 items-center justify-center" />
    );
  return (
    <main className="grid flex-1 items-start">
      <Tabs defaultValue="all">
        <TabsContent value="all">
          <Card x-chunk="dashboard-06-chunk-0" className="bg-muted/40">
            <CardHeader>
              <div className="flex justify-between">
                <CardTitle>All Cabins</CardTitle>
                <CardTitle className="text-xl font-normal">
                  Filter / Sort
                </CardTitle>
              </div>
              <CardDescription>
                Manage all Cabins and add new ones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>CABIN</TableHead>
                    <TableHead>CAPACITY</TableHead>
                    <TableHead className="md:table-cell">PRICE</TableHead>
                    <TableHead className="md:table-cell">DISCOUNT</TableHead>

                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cabins.map((cabin) => (
                    <CabinRow cabin={cabin} key={cabin.id} />
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default CabinTable;
