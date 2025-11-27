import { userService } from "@/services/userService";
import { useEntityStore } from "@/stores/store";
import type { User } from "@/services/userService";
import { useCallback, useState } from "react";

export const useLoadUserData = () => {
  const setData = useEntityStore((state) => state.setData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result: User[] = await userService.getAll();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

  return { loadData, isLoading, error, isError: !!error };
};

