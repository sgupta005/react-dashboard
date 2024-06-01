import { Button } from '@/ui/shadcn/ui/button';
import { TableCell, TableRow } from '@/ui/shadcn/ui/table';
import { formatCurrency } from '@/utils/helpers';

function CabinRow({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, description, image } =
    cabin;
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <img
          alt="Product image"
          className="aspect-rectangle object-cover"
          height="64"
          src={image}
        />
      </TableCell>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="hidden md:table-cell">
        Fits up to {maxCapacity}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatCurrency(regularPrice)}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {formatCurrency(discount)}
      </TableCell>

      <TableCell>
        <Button variant="outline">Delete</Button>
      </TableCell>
    </TableRow>
  );
}

export default CabinRow;
