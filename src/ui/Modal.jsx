import { createPortal } from "react-dom";
import { Button } from "./shadcn/ui/button";
import { X } from "lucide-react";
import { cloneElement, createContext, useContext, useState } from "react";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="h-[60%] w-[80%] space-y-4 bg-background shadow-2xl">
        <Button
          className="ml-auto mr-4 mt-4 block"
          variant="outline"
          onClick={close}
        >
          <X />
        </Button>
        {cloneElement(children, { onClose: close })}
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
