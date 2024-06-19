import { Button } from "@/ui/shadcn/ui/button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "@/ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button size="lg" className="ml-auto mr-0 block">
          Add new Cabin
        </Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
