import Filter from "@/ui/Filter";

function CabinOperations() {
  return (
    // <div className="flex items-center">
    <Filter
      filterField="discount"
      options={[
        { value: "all", label: "All" },
        { value: "no-discount", label: "No Discount" },
        { value: "with-discount", label: "With Discount" },
      ]}
    />
    // </div>
  );
}

export default CabinOperations;
