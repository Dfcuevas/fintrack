import { useDebouncedSearch } from "@/lib/hooks/use-search-params-state";
import { SearchInput } from "../ui/SearchInput";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";

export default function TransactionSearch() {
  const {
    value: urlValue,
    setValue: setUrlValue,
    isPending,
  } = useDebouncedSearch("q");
  const [localValue, setLocalValue] = useState(urlValue);
  const debouncedValue = useDebounce(localValue, 400);

  useEffect(() => {
    setUrlValue(debouncedValue);
  }, [debouncedValue, setUrlValue]);

  return (
    <SearchInput
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      onClear={() => setLocalValue("")}
      placeholder="Buscar..."
      className={isPending ? "opacity-60" : ""}
    />
  );
}
