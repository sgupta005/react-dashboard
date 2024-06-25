import FormRow from "@/ui/FormRow";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/ui/card";
import { useForm } from "react-hook-form";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";
import { LoadingSpinner } from "@/ui/Spinner";
import { Input } from "@/ui/shadcn/ui/input";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { register } = useForm();
  const { isUpdating, updateSetting } = useUpdateSetting();
  function handleSubmit(value, field) {
    if (settings[field] === +value || !value) return;
    updateSetting({ [field]: +value });
  }
  if (isLoading) return <LoadingSpinner />;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="mt-2 space-y-6">
          <FormRow label="Minimum nights/booking">
            <Input
              onBlurCapture={(e) =>
                handleSubmit(e.target.value, "minBookingLength")
              }
              disabled={isUpdating}
              defaultValue={settings?.minBookingLength}
              {...register("minBookingLength")}
              type="number"
              id="minBookingLenth"
              className="w-52 rounded-sm p-1 shadow-sm"
            />
          </FormRow>
          <FormRow label="Maximum nights/booking">
            <Input
              onBlurCapture={(e) =>
                handleSubmit(e.target.value, "maxBookingLength")
              }
              disabled={isUpdating}
              defaultValue={settings?.maxBookingLength}
              {...register("maxBookingLength")}
              type="number"
              id="maxBookingLenth"
              className="w-52 rounded-sm p-1 shadow-sm"
            />
          </FormRow>
          <FormRow label="Maximum guests/booking">
            <Input
              onBlurCapture={(e) =>
                handleSubmit(e.target.value, "minGuestsPerBooking")
              }
              disabled={isUpdating}
              defaultValue={settings?.maxGuestsPerBooking}
              {...register("minGuestsPerBooking")}
              type="number"
              id="minGuestsPerBooking"
              className="w-52 rounded-sm p-1 shadow-sm"
            />
          </FormRow>
          <FormRow label="Breakfast price">
            <Input
              onBlurCapture={(e) =>
                handleSubmit(e.target.value, "breakfastPrice")
              }
              disabled={isUpdating}
              defaultValue={settings?.breakfastPrice}
              {...register("breakfastPrice")}
              type="number"
              id="breakfastPrice"
              className="w-52 rounded-sm p-1 shadow-sm"
            />
          </FormRow>
        </form>
      </CardContent>
    </Card>
  );
}

export default UpdateSettingsForm;
