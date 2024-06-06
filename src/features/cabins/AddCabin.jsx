import { Button } from "@/ui/shadcn/ui/button";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import Modal from "@/ui/Modal";

function AddCabin() {
  const [showCreateCabinForm, setShowCreateCabinForm] = useState(false);

  return (
    <>
      <Button
        className={"w-full"}
        onClick={() => setShowCreateCabinForm((show) => !show)}
      >
        Add new Cabin
      </Button>
      {showCreateCabinForm && (
        <Modal onClose={setShowCreateCabinForm}>
          <CreateCabinForm />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
