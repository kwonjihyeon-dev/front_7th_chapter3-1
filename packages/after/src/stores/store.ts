import type { Entity, EntityType } from "@/types";
import { create } from "zustand";

interface EntityStore {
  entityType: EntityType;
  setEntityType: (type: EntityType) => void;
  data: Entity[];
  setData: (data: Entity[]) => void;
}

export const useEntityStore = create<EntityStore>((set) => ({
  entityType: "post",
  setEntityType: (type) => set({ entityType: type }),
  data: [],
  setData: (data) => set({ data }),
}));
