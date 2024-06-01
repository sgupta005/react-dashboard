import { deleteCabin } from '@/services/apiCabins';
import { Button } from '@/ui/shadcn/ui/button';
import { TableCell, TableRow } from '@/ui/shadcn/ui/table';
import { formatCurrency } from '@/utils/helpers';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
  } = cabin;

  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success('Cabin deleted successully.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return (
    <TableRow className>
      <TableCell className="hidden sm:table-cell">
        <img
          alt="Cabin image"
          className="aspect-rectangle object-cover"
          height="64"
          src={image}
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className=" md:table-cell">Fits up to {maxCapacity}</TableCell>
      <TableCell className=" md:table-cell">
        {formatCurrency(regularPrice)}
      </TableCell>
      <TableCell className=" md:table-cell">
        {formatCurrency(discount)}
      </TableCell>

      <TableCell>
        <Button
          variant="outline"
          onClick={() => mutate(cabinId)}
          disabled={isDeleting}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default CabinRow;
