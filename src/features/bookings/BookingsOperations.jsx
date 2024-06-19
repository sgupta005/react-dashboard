import Filter from "@/ui/Filter";
import Sort from "@/ui/Sort";

function BookingsOperations() {
  return (
    <div className="flex items-center space-x-4">
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-in", label: "Checked In" },
          { value: "checked-out", label: "Checked Out" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <Sort
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort By date (oldest first)" },
          { value: "totalPrice-desc", label: "Sort By Amount (high first)" },
          { value: "totalPrice-asc", label: "Sort By Amount (low first)" },
        ]}
      />
    </div>
  );
}

export default BookingsOperations;
