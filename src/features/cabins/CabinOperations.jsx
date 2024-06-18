import Filter from "@/ui/Filter";
import Sort from "@/ui/Sort";

function CabinOperations() {
  return (
    <div className="flex items-center space-x-4">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <Sort
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort By name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort By Price (low first)" },
          { value: "regularPrice-desc", label: "Sort By Price (high first)" },
          { value: "maxCapacity-asc", label: "Sort By Capacity (low first)" },
          { value: "maxCapacity-desc", label: "Sort By Capacity (high first)" },
        ]}
      />
    </div>
  );
}

export default CabinOperations;
