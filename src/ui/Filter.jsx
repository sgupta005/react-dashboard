import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./shadcn/ui/tabs";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultValue = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="border border-input bg-background text-primary">
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

export default Filter;
