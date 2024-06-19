import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./shadcn/ui/button";
import { CardFooter } from "./shadcn/ui/card";
import { PAGE_COUNT } from "@/utils/constants";
import { useSearchParams } from "react-router-dom";

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  function handlePrevious() {
    if (page === 1) return;
    searchParams.set("page", page - 1);
    setSearchParams(searchParams);
  }
  function handleNext() {
    if (page === Math.ceil(count / PAGE_COUNT)) return;
    searchParams.set("page", page + 1);
    setSearchParams(searchParams);
  }
  return (
    <CardFooter>
      <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing{" "}
          <strong>
            {(page - 1) * PAGE_COUNT + 1}-
            {page === Math.ceil(count / PAGE_COUNT) ? count : page * PAGE_COUNT}
          </strong>{" "}
          of <strong>{count}</strong> results
        </span>
        <div className="flex space-x-6">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={page === 1}
          >
            <ChevronLeft />
            <span>Previous</span>
          </Button>
          <Button
            variant="ghost"
            onClick={handleNext}
            disabled={page === Math.ceil(count / PAGE_COUNT)}
          >
            <span>Next</span>
            <ChevronRight />
          </Button>
        </div>
      </div>
    </CardFooter>
  );
}

export default Pagination;
