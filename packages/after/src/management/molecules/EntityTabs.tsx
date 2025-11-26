import { Button } from "@/components/atoms";
import { useEntityStore } from "@/stores/store";

export const EntityTabs = () => {
  const entityType = useEntityStore((state) => state.entityType);
  const setEntityType = useEntityStore((state) => state.setEntityType);

  return (
    <div className="mb-[15px] flex gap-1 border-b-2 border-gray-300 pb-1.5">
      <Button
        onClick={() => setEntityType("post")}
        variant={entityType === "post" ? "primary" : "outline"}
        size="md"
        className={entityType === "post" ? "font-bold" : "font-normal"}
      >
        게시글
      </Button>
      <Button
        onClick={() => setEntityType("user")}
        variant={entityType === "user" ? "primary" : "outline"}
        size="md"
        className={entityType === "user" ? "font-bold" : "font-normal"}
      >
        사용자
      </Button>
    </div>
  );
};
