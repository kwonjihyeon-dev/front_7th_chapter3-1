import { StatsGrid } from "@/components/molecules";
import type { Post } from "@/services/postService";
import type { User } from "@/services/userService";
import { useEntityStore } from "@/stores/store";
import { useMemo } from "react";

export function ManagementStatsGrid() {
  const entityType = useEntityStore((state) => state.entityType);
  const data = useEntityStore((state) => state.data);

  const stats = useMemo(() => {
    switch (entityType) {
      case "user":
        const users = data as User[];
        const userStats = users.reduce(
          (acc, user) => {
            switch (user.status) {
              case "active":
                acc.active++;
                break;
              case "inactive":
                acc.inactive++;
                break;
              case "suspended":
                acc.suspended++;
                break;
            }

            if (user.role === "admin") {
              acc.admin++;
            }
            return acc;
          },
          { active: 0, inactive: 0, suspended: 0, admin: 0 },
        );

        return {
          total: users.length,
          stat1: { label: "활성", value: userStats.active, variant: "green" as const },
          stat2: { label: "비활성", value: userStats.inactive, variant: "orange" as const },
          stat3: { label: "정지", value: userStats.suspended, variant: "red" as const },
          stat4: { label: "관리자", value: userStats.admin, variant: "blue" as const },
        };
      case "post":
        const posts = data as Post[];
        const postStats = posts.reduce(
          (acc, post) => {
            switch (post.status) {
              case "published":
                acc.published++;
                break;
              case "draft":
                acc.draft++;
                break;
              case "archived":
                acc.archived++;
                break;
            }
            acc.totalViews += post.views;
            return acc;
          },
          { published: 0, draft: 0, archived: 0, totalViews: 0 },
        );

        return {
          total: posts.length,
          stat1: { label: "게시됨", value: postStats.published, variant: "green" as const },
          stat2: { label: "임시저장", value: postStats.draft, variant: "orange" as const },
          stat3: { label: "보관됨", value: postStats.archived, variant: "red" as const },
          stat4: { label: "총 조회수", value: postStats.totalViews, variant: "gray" as const },
        };
    }
  }, [entityType, data]);

  return <StatsGrid stats={stats} />;
}
