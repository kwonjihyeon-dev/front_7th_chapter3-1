import type { EntityType } from "@/types";
import { create } from "zustand";

interface EntityStore {
  entityType: EntityType;
  setEntityType: (type: EntityType) => void;
}

export const useEntityStore = create<EntityStore>((set) => ({
  entityType: "post",
  setEntityType: (type) => set({ entityType: type }),
}));
