import { Button } from "@/ui/shadcn/ui/button";
import { TableCell, TableRow } from "@/ui/shadcn/ui/table";
import { formatCurrency } from "@/utils/helpers";
import { useDeleteCabin } from "./useDeleteCabins";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/ui/shadcn/ui/dropdown-menu";
import { Copy, MoreHorizontal, Pencil, Trash } from "lucide-react";
import MenuItem from "@/ui/MenuItem";

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
        <TableCell className="hidden md:table-cell">
          <img
            alt="Cabin image"
            className="aspect-rectangle h-[64px] object-cover"
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
          <Modal>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-haspopup="true"
                  size="icon"
                  variant="ghost"
                  className="hover:bg-muted-foreground/5"
                >
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <MenuItem onClick={() => handleDuplicate()}>
                  <Copy />
                  <span>Duplicate</span>
                </MenuItem>

                <Modal.Open opens="edit">
                  <MenuItem>
                    <Pencil />
                    <span>Edit</span>
                  </MenuItem>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <MenuItem>
                    <Trash />
                    <span>Delete</span>
                  </MenuItem>
                </Modal.Open>
              </DropdownMenuContent>
            </DropdownMenu>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
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
