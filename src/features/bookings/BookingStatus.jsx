function BookingStatus({ status }) {
  let statusClassname;
  if (status === "unconfirmed")
    statusClassname =
      "w-max flex justify-center rounded-2xl bg-blue-100 py-1 px-2 font-medium uppercase text-blue-500";
  if (status === "checked-in")
    statusClassname =
      "w-max flex justify-center rounded-2xl bg-green-100 py-1 px-2 font-medium uppercase text-emerald-700";
  if (status === "checked-out")
    statusClassname =
      "w-max flex justify-center rounded-2xl bg-gray-200 py-1 px-2 font-medium uppercase text-gray-500";
  return <p className={statusClassname}>{status}</p>;
}

export default BookingStatus;
