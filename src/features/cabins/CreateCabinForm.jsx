import { createCabin } from '@/services/apiCabins';
import FormRow from '@/ui/FormRow';
import { Button } from '@/ui/shadcn/ui/button';
import { Card, CardContent, CardFooter } from '@/ui/shadcn/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin created successfully.');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
      console.error(err);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  return (
    <Card className="w-full bg-muted/40">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="grid gap-4 mt-6">
          <FormRow label="Cabin Name" error={errors?.name?.message}>
            <input
              {...register('name', {
                required: 'This field is required',
              })}
              id="name"
              disabled={isCreating}
              className={
                errors?.name?.message
                  ? 'border-2 outline-red-600 border-red-600 shadow-sm rounded-sm p-1 w-52 '
                  : 'border shadow-sm rounded-sm p-1 w-52 '
              }
            />
          </FormRow>
          <FormRow
            label="Maximum Capacity"
            error={errors?.maxCapacity?.message}
          >
            <input
              {...register('maxCapacity', {
                required: 'This field is required',
                min: {
                  value: 1,
                  message: "Capacity can't be less than 1",
                },
              })}
              disabled={isCreating}
              type="number"
              id="maxCapacity"
              className={
                errors?.maxCapacity?.message
                  ? 'border-2 outline-red-600 border-red-600 shadow-sm rounded-sm p-1 w-52 '
                  : 'border shadow-sm rounded-sm p-1 w-52 '
              }
            />
          </FormRow>
          <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
            <input
              {...register('regularPrice', {
                required: 'This field is required',
                min: {
                  value: 0,
                  message: "Price can't be less than 0",
                },
              })}
              disabled={isCreating}
              type="number"
              id="regularPrice"
              className={
                errors?.regularPrice?.message
                  ? 'border-2 outline-red-600 border-red-600 shadow-sm rounded-sm p-1 w-52 '
                  : 'border shadow-sm rounded-sm p-1 w-52 '
              }
            />
          </FormRow>
          <FormRow label="Discount" error={errors?.discount?.message}>
            <input
              {...register('discount', {
                required: 'This field is required',
                min: {
                  value: 0,
                  message: "Discount can't be less than 0",
                },
                validate: (discount) =>
                  +discount <= +getValues().regularPrice ||
                  'Discount must be less than Price',
              })}
              defaultValue={0}
              disabled={isCreating}
              type="number"
              id="discount"
              className={
                errors?.discount?.message
                  ? 'border-2 outline-red-600 border-red-600 shadow-sm rounded-sm p-1 w-52 '
                  : 'border shadow-sm rounded-sm p-1 w-52 '
              }
            />
          </FormRow>
          <FormRow label="Description" error={errors?.description?.message}>
            <textarea
              {...register('description', {
                required: 'This field is required',
              })}
              id="description"
              disabled={isCreating}
              className={
                errors?.description?.message
                  ? 'border-2 outline-red-600 border-red-600 shadow-sm rounded-sm p-1 w-52 '
                  : 'border shadow-sm rounded-sm p-1 w-52 '
              }
            />
          </FormRow>
          <FormRow label="Cabin Image" error={errors?.image?.message}>
            <input
              type="file"
              id="image"
              accept="image/jpg"
              {...register('image', {
                required: 'This field is required',
              })}
            />
          </FormRow>
        </CardContent>
        <CardFooter className="flex gap-4 justify-end">
          <Button variant="outline" type="reset">
            Cancel
          </Button>
          <Button disabled={isCreating}>Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
