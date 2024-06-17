import { Button } from "@/ui/shadcn/ui/button";
import { TableCell, TableRow } from "@/ui/shadcn/ui/table";
import { formatCurrency } from "@/utils/helpers";
import { useDeleteCabin } from "./useDeleteCabins";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

function CabinRow({ cabin }) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    description,
    image,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();
  function handleDuplicate() {
    createCabin({
      name: `Copy of ${cabin.name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <>
      <TableRow>
        <TableCell className="hidden sm:table-cell">
          <img
            alt="Cabin image"
            className="aspect-rectangle object-cover"
            height="64"
            src={image}
          />
        </TableCell>
        <TableCell className="font-medium">{name}</TableCell>
        <TableCell className="md:table-cell">
          Fits up to {maxCapacity} guests
        </TableCell>
        <TableCell className="font-semibold md:table-cell">
          {formatCurrency(regularPrice)}
        </TableCell>
        <TableCell className="font-semibold md:table-cell">
          {discount ? (
            <span className="text-green-500">{formatCurrency(discount)}</span>
          ) : (
            <span className="text-orange-300">&mdash;</span>
          )}
        </TableCell>
        <TableCell className="space-x-4">
          <Button
            variant="outline"
            disabled={isCreating}
            onClick={() => handleDuplicate()}
          >
            Duplicate
          </Button>

          <Modal>
            <Modal.Open opens="edit">
              <Button variant="outline">Edit</Button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Open>
              <Button variant="outline">Delete</Button>
            </Modal.Open>
            <Modal.Window>
              <ConfirmDelete
                disabled={isDeleting}
                resourceName="Cabin"
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
        </TableCell>
      </TableRow>
    </>
  );
}

export default CabinRow;
