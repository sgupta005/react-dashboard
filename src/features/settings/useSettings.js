import { getSettings } from "@/services/apiSettings";
import { useQuery } from "@tanstack/react-query";

export function useSettings() {
  const { isLoading, data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, settings };
}
