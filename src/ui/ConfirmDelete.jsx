import { Button } from "./shadcn/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./shadcn/ui/card";

function ConfirmDelete({ resourceName, disabled = false, onClose, onConfirm }) {
  const isConfirmCheckOut = resourceName == "Check Out";
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pt-0">
        <CardTitle>
          {isConfirmCheckOut ? "Check Out" : `Delete ${resourceName}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="w-[500px] text-lg">
          {isConfirmCheckOut
            ? "Are you sure you want to check out this booking? This action cannot be undone."
            : `Are you sure you want to delete this ${resourceName} permanently? This
          action cannot be undone.`}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4">
        <Button
          variant="outline"
          size="lg"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          variant="destructive"
          size="lg"
          onClick={onConfirm}
          disabled={disabled}
        >
          {isConfirmCheckOut ? "Check Out" : "Delete"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ConfirmDelete;
