import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/shadcn/ui/card";
import { useForm } from "react-hook-form";

import { useEditCabin } from "./useEditCabin";
import { useCreateCabin } from "./useCreateCabin";
import FormRow from "@/ui/FormRow";
import FormInput from "@/ui/FormInput";

export default function CreateCabinForm({ cabinToEdit = {}, onClose }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession)
      editCabin(
        { cabin: data, id: editId },
        {
          onSuccess: () => reset(),
        },
      );
    else
      createCabin(
        { ...data, image: data.image[0] },
        {
          onSuccess: () => reset(),
        },
      );
    onClose?.();
  }
  return (
    <Card className="flex w-full items-center justify-center border-none pl-[5%] pr-[10%] shadow-none">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4">
          <FormRow label="Cabin Name" error={errors?.name?.message}>
            <FormInput
              register={register("name", {
                required: "This field is required",
              })}
              id="name"
              disabled={isWorking}
              error={errors?.name?.message}
            />
          </FormRow>
          <FormRow
            label="Maximum Capacity"
            error={errors?.maxCapacity?.message}
          >
            <FormInput
              register={register("maxCapacity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity can't be less than 1",
                },
              })}
              disabled={isWorking}
              type="number"
              id="maxCapacity"
              error={errors?.maxCapacity?.message}
            />
          </FormRow>
          <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
            <FormInput
              register={register("regularPrice", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Price can't be less than 0",
                },
              })}
              id="regularPrice"
              type="number"
              disabled={isWorking}
              error={errors?.regularPrice?.message}
            />
          </FormRow>
          <FormRow label="Discount" error={errors?.discount?.message}>
            <FormInput
              register={register("discount", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Discount can't be less than 0",
                },
                validate: (discount) =>
                  +discount <= +getValues().regularPrice ||
                  "Discount must be less than Price",
              })}
              id="discount"
              defaultValue={0}
              disabled={isWorking}
              type="number"
              error={errors?.discount?.message}
            />
          </FormRow>
          <FormRow label="Description" error={errors?.description?.message}>
            <textarea
              {...register("description", {
                required: "This field is required",
              })}
              id="description"
              disabled={isWorking}
              className={
                errors?.description?.message
                  ? "w-52 rounded-sm border-2 border-red-600 p-1 shadow-sm outline-red-600"
                  : "w-52 rounded-sm border border-gray-300 p-1 shadow-sm"
              }
            />
          </FormRow>
          <FormRow label="Cabin Image" error={errors?.image?.message}>
            <input
              type="file"
              id="image"
              accept="image/jpg"
              {...register("image", {
                required: isEditSession ? false : "This field is required",
              })}
              className="file:boder-none file:mr-4 file:rounded-md file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground file:hover:bg-primary/90"
            />
          </FormRow>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button
            variant="outline"
            size="lg"
            type="reset"
            onClick={() => onClose?.()}
          >
            Cancel
          </Button>
          <Button disabled={isWorking} size="lg">
            {isEditSession ? "Edit Cabin" : "Add Cabin"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
