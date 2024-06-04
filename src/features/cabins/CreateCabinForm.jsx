import {
  createCabin as createCabinApi,
  editCabin as editCabinApi,
} from "@/services/apiCabins";
import { Button } from "@/ui/shadcn/ui/button";
import { Card, CardContent, CardFooter } from "@/ui/shadcn/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import FormRow from "@/ui/FormRow";

export default function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("New cabin created successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ cabin, id }) => editCabinApi(cabin, id),
    onSuccess: () => {
      toast.success("Cabin edited successfully.");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession) editCabin({ cabin: data, id: editId });
    else createCabin({ ...data, image: data.image[0] });
  }
  return (
    <Card className="w-full bg-muted/40">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="mt-6 grid gap-4">
          <FormRow label="Cabin Name" error={errors?.name?.message}>
            <input
              {...register("name", {
                required: "This field is required",
              })}
              id="name"
              disabled={isWorking}
              className={
                errors?.name?.message
                  ? "w-52 rounded-sm border-2 border-red-600 p-1 shadow-sm outline-red-600"
                  : "w-52 rounded-sm border p-1 shadow-sm"
              }
            />
          </FormRow>
          <FormRow
            label="Maximum Capacity"
            error={errors?.maxCapacity?.message}
          >
            <input
              {...register("maxCapacity", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Capacity can't be less than 1",
                },
              })}
              disabled={isWorking}
              type="number"
              id="maxCapacity"
              className={
                errors?.maxCapacity?.message
                  ? "w-52 rounded-sm border-2 border-red-600 p-1 shadow-sm outline-red-600"
                  : "w-52 rounded-sm border p-1 shadow-sm"
              }
            />
          </FormRow>
          <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
            <input
              {...register("regularPrice", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Price can't be less than 0",
                },
              })}
              disabled={isWorking}
              type="number"
              id="regularPrice"
              className={
                errors?.regularPrice?.message
                  ? "w-52 rounded-sm border-2 border-red-600 p-1 shadow-sm outline-red-600"
                  : "w-52 rounded-sm border p-1 shadow-sm"
              }
            />
          </FormRow>
          <FormRow label="Discount" error={errors?.discount?.message}>
            <input
              {...register("discount", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Discount can't be less than 0",
                },
                validate: (discount) =>
                  +discount <= +getValues().regularPrice ||
                  "Discount must be less than Price",
              })}
              defaultValue={0}
              disabled={isWorking}
              type="number"
              id="discount"
              className={
                errors?.discount?.message
                  ? "w-52 rounded-sm border-2 border-red-600 p-1 shadow-sm outline-red-600"
                  : "w-52 rounded-sm border p-1 shadow-sm"
              }
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
                  : "w-52 rounded-sm border p-1 shadow-sm"
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
            />
          </FormRow>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" type="reset">
            Cancel
          </Button>
          <Button disabled={isWorking}>
            {isEditSession ? "Edit Cabin" : "Add Cabin"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
