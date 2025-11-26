import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";

export interface Column<T = any> {
  key: string;
  header: string;
  width?: string;
  render?: (value: any, row: T, columnKey: string) => React.ReactNode;
}

export type EntityType = "user" | "post";
export type Entity = User | Post;
