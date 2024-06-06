import { Label } from "@radix-ui/react-label";

function FormRow({ children, label, error }) {
  return (
    <div className="grid grid-cols-4 items-center pl-6">
      <Label
        htmlFor={children.props.id}
        className={error ? "text-red-600" : ""}
      >
        {label}
      </Label>
      {children}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default FormRow;
