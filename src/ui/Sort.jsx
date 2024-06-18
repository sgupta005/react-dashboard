import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shadcn/ui/select";

function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleSort(value) {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  }
  const defaultValue = searchParams.get("sortBy") || "";
  return (
    <Select
      onValueChange={(value) => handleSort(value)}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default Sort;
