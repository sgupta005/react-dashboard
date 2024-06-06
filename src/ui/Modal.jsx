import { createPortal } from "react-dom";
import { Button } from "./shadcn/ui/button";
import { X } from "lucide-react";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
      <div className="h-[60%] w-[80%] space-y-4 bg-white shadow-2xl">
        <Button
          className="ml-auto mr-4 mt-4 block"
          variant="outline"
          onClick={() => onClose(false)}
        >
          <X />
        </Button>
        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
