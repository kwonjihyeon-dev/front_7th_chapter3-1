import { postService } from "@/services/postService";
import { useEntityStore } from "@/stores/store";
import type { Post } from "@/services/postService";
import { useCallback, useState } from "react";

export const useLoadPostData = () => {
  const setData = useEntityStore((state) => state.setData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result: Post[] = await postService.getAll();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [setData]);

  return { loadData, isLoading, error, isError: !!error };
};

