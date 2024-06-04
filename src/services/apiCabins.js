import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    "",
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  //https://hnotsviummtwoctipqjq.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg

  //1.Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be added");
  }

  //2.Add Image to Bucket
  const storageError = await addImageToBucket(imageName, newCabin.image);

  //3.If error in adding image then delete cabin
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and cabin was not created.",
    );
  }
}

async function addImageToBucket(imageName, image) {
  const { error } = await supabase.storage
    .from("cabins")
    .upload(imageName, image);
  return error;
}

export async function editCabin(cabinAfterEdit, id) {
  const image = cabinAfterEdit.image;
  let imagePath = "";

  //If image is unchanged
  if (image?.startsWith?.(supabaseUrl)) {
    imagePath = image;
  }
  //If image has been changed
  else {
    const imageName = `${Math.random()}-${image[0].name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
    const storageError = await addImageToBucket(imageName, image[0]);
    if (storageError) {
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded due to which cabin could not be edited.",
      );
    }
  }

  //Editing the cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabinAfterEdit, image: imagePath })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be edited");
  }
  return data;
}

export async function deleteCabin(id) {
  let { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
