import { Label } from '@radix-ui/react-label';

function FormRow({ children, label, error }) {
  return (
    <div className="pl-6 grid grid-cols-4  items-center">
      <Label
        htmlFor={children.props.id}
        className={error ? 'text-red-600' : ''}
      >
        {label}
      </Label>
      {children}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}

export default FormRow;
