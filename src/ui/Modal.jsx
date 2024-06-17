import { createPortal } from "react-dom";
import { Button } from "./shadcn/ui/button";
import { X } from "lucide-react";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";

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
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div
        className="h-max w-max space-y-4 rounded-md bg-background pb-6 shadow-2xl"
        ref={ref}
      >
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
