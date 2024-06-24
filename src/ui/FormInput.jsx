function FormInput({
  register,
  disabled = false,
  type = "text",
  id,
  error,
  defaultValue,
}) {
  return (
    <input
      {...register}
      id={id}
      disabled={disabled}
      type={type}
      defaultValue={defaultValue}
      className={
        error
          ? "w-52 rounded-sm border-2 border-red-600 p-1 shadow-sm outline-red-600"
          : "w-52 rounded-sm border border-gray-300 p-1 shadow-sm"
      }
    />
  );
}

export default FormInput;
