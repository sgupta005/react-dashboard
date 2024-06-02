import { getCabins } from '@/services/apiCabins';
import { LoadingSpinner } from '@/ui/Spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/ui/shadcn/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui/shadcn/ui/table';
import { Tabs, TabsContent } from '@radix-ui/react-tabs';
import { useQuery } from '@tanstack/react-query';
import CabinRow from './CabinRow';

function CabinTable() {
  const { isLoading, data: cabins } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  if (isLoading)
    return (
      <LoadingSpinner className="h-32 w-32 flex mx-auto justify-center items-center my-20" />
    );
  return (
    <main className="grid flex-1 items-start ">
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
                    <TableHead className=" md:table-cell">PRICE</TableHead>
                    <TableHead
                      className="
                     md:table-cell"
                    >
                      DISCOUNT
                    </TableHead>

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
