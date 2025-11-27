import { Badge, Button, Search } from "@/components/atoms";
import { Pagination } from "@/components/molecules";
import { Alert, Table } from "@/components/organisms";
import { useLoadPostData, useLoadUserData, useModal, useTableData } from "@/hooks";
import { EntityTabs, ManagementStatsGrid } from "@/management/molecules";
import { PostManagementModal, UserManagementModal } from "@/management/organisms";
import type { Post } from "@/services/postService";
import { postService } from "@/services/postService";
import type { User } from "@/services/userService";
import { userService } from "@/services/userService";
import { useEntityStore } from "@/stores/store";
import type { Column } from "@/types";
import React, { useEffect, useState } from "react";

type Entity = User | Post;

export const ManagementPage: React.FC = () => {
  const entityType = useEntityStore((state) => state.entityType);
  const data = useEntityStore((state) => state.data);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error" | null; message: string; title: string }>({
    type: null,
    message: "",
    title: "",
  });
  const [searchable] = useState(false);

  const { isOpen, mode, openModal, closeModal } = useModal();
  const { paginatedData, totalPages, currentPage, setCurrentPage, searchTerm, setSearchTerm } = useTableData({
    data,
    pageSize: 10,
    searchable,
  });

  const { loadData: loadPostData } = useLoadPostData();
  const { loadData: loadUserData } = useLoadUserData();

  useEffect(() => {
    if (entityType === "user") {
      loadUserData();
    } else {
      loadPostData();
    }
    closeModal();
    setSelectedItem(null);
  }, [entityType]);

  const showAlert = (type: "success" | "error", message: string, title?: string) => {
    setAlert({
      type,
      message,
      title: title || (type === "success" ? "성공" : "오류"),
    });
  };

  const closeAlert = () => {
    setAlert({ type: null, message: "", title: "" });
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);
    openModal("edit");
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
        await loadUserData();
      } else {
        await postService.delete(id);
        await loadPostData();
      }

      showAlert("success", "삭제되었습니다");
    } catch (error: any) {
      showAlert("error", error.message || "삭제에 실패했습니다");
    }
  };

  const handleStatusAction = async (id: number, action: "publish" | "archive" | "restore") => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadPostData();
      const message = action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      showAlert("success", `${message}되었습니다`);
    } catch (error: any) {
      showAlert("error", error.message || "작업에 실패했습니다");
    }
  };

  const renderTableColumns = (): Column<Entity>[] => {
    if (entityType === "user") {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "username", header: "사용자명", width: "150px" },
        { key: "email", header: "이메일" },
        {
          key: "role",
          header: "역할",
          width: "120px",
          render: (value: any) => <Badge userRole={value} showIcon />,
        },
        {
          key: "status",
          header: "상태",
          width: "120px",
          render: (value: any) => {
            const badgeStatus = value === "active" ? "published" : value === "inactive" ? "draft" : "rejected";
            return <Badge status={badgeStatus} showIcon />;
          },
        },
        { key: "createdAt", header: "생성일", width: "120px" },
        {
          key: "lastLogin",
          header: "마지막 로그인",
          width: "140px",
          render: (value: any) => value || "-",
        },
        {
          key: "actions",
          header: "관리",
          width: "200px",
          render: (_: any, row: Entity) => (
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEdit(row)}>
                수정
              </Button>
              <Button size="sm" variant="danger" onClick={() => handleDelete(row.id)}>
                삭제
              </Button>
            </div>
          ),
        },
      ];
    } else {
      return [
        { key: "id", header: "ID", width: "60px" },
        { key: "title", header: "제목" },
        { key: "author", header: "작성자", width: "120px" },
        {
          key: "category",
          header: "카테고리",
          width: "140px",
          render: (value: any) => {
            const type =
              value === "development"
                ? "primary"
                : value === "design"
                  ? "info"
                  : value === "accessibility"
                    ? "danger"
                    : "secondary";
            return (
              <Badge type={type} pill>
                {value}
              </Badge>
            );
          },
        },
        {
          key: "status",
          header: "상태",
          width: "120px",
          render: (value: any) => <Badge status={value} showIcon />,
        },
        {
          key: "views",
          header: "조회수",
          width: "100px",
          render: (value: any) => value?.toLocaleString() || "0",
        },
        { key: "createdAt", header: "작성일", width: "120px" },
        {
          key: "actions",
          header: "관리",
          width: "250px",
          render: (_: any, row: Entity) => {
            const post = row as Post;
            return (
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="primary" onClick={() => handleEdit(row)}>
                  수정
                </Button>
                {post.status === "draft" && (
                  <Button size="sm" variant="success" onClick={() => handleStatusAction(post.id, "publish")}>
                    게시
                  </Button>
                )}
                {post.status === "published" && (
                  <Button size="sm" variant="secondary" onClick={() => handleStatusAction(post.id, "archive")}>
                    보관
                  </Button>
                )}
                {post.status === "archived" && (
                  <Button size="sm" variant="primary" onClick={() => handleStatusAction(post.id, "restore")}>
                    복원
                  </Button>
                )}
                <Button size="sm" variant="danger" onClick={() => handleDelete(post.id)}>
                  삭제
                </Button>
              </div>
            );
          },
        },
      ];
    }
  };

  return (
    <div className="min-h-[100vh] bg-[#f0f0f0]">
      <div className="mx-auto max-w-[1200px] p-[20px]">
        <div className="mb-[20px]">
          <h1 className="mb-[5px] text-[24px] font-bold text-[var(--color-gray-900)]">관리 시스템</h1>
          <p className="text-[14px] text-[var(--color-gray-600)]">사용자와 게시글을 관리하세요</p>
        </div>
        <div className="border border-gray-300 bg-white p-2.5">
          <EntityTabs />

          <div>
            <div className="mb-[15px] text-right">
              <Button variant="primary" size="md" onClick={() => openModal("create")}>
                새로 만들기
              </Button>
            </div>

            {alert.type && (
              <div className="mb-[10px]">
                <Alert variant={alert.type} title={alert.title} onClose={closeAlert}>
                  {alert.message}
                </Alert>
              </div>
            )}

            <ManagementStatsGrid />

            <div className="overflow-auto border border-[var(--color-gray-400)] bg-white">
              {searchable && <Search value={searchTerm} onChange={setSearchTerm} />}
              <Table columns={renderTableColumns()} data={paginatedData} striped hover />
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </div>
        </div>
      </div>
      {entityType === "user" ? (
        <UserManagementModal
          isOpen={isOpen}
          onClose={closeModal}
          mode={mode}
          selectedUser={selectedItem as User | null}
        />
      ) : (
        <PostManagementModal
          isOpen={isOpen}
          onClose={closeModal}
          mode={mode}
          selectedPost={selectedItem as Post | null}
        />
      )}
    </div>
  );
};
