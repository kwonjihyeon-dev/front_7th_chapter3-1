import { Button } from "@/components/atoms";
import { FormInput, FormSelect, FormTextarea } from "@/components/molecules";
import { Alert, Modal } from "@/components/organisms";
import { useLoadUserData } from "@/hooks";
import { postService, type Post } from "@/services/postService";
import type { ManagementMode } from "@/types";
import React, { useState } from "react";

interface PostManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ManagementMode;
  selectedPost: Post | null;
}

export const PostManagementModal: React.FC<PostManagementModalProps> = ({ isOpen, onClose, mode, selectedPost }) => {
  const [formData, setFormData] = useState<Omit<Post, "id" | "createdAt" | "views">>({
    title: "",
    content: "",
    author: "",
    category: "",
    status: "draft",
  });

  const { loadData } = useLoadUserData();

  const handleSubmit = async () => {
    try {
      await postService.create({
        title: formData.title!,
        content: formData.content || "",
        author: formData.author!,
        category: formData.category!,
        status: (formData.status as "draft" | "published" | "archived") || "draft",
      });
      await loadData();
      onClose();
      // showAlert("success", "게시글이 생성되었습니다");
    } catch (error: any) {
      // showAlert("error", error.message || "생성에 실패했습니다");
      throw error;
    }
  };

  const handleUpdate = async () => {
    if (!selectedPost) return;

    try {
      await postService.update(selectedPost.id, selectedPost);
      await loadData();
      onClose();
      // showAlert("success", "게시글이 수정되었습니다");
    } catch (error: any) {
      // showAlert("error", error.message || "수정에 실패했습니다");
      throw error;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <Modal.Header>
        <Modal.Title>{mode === "create" ? "새 게시글 만들기" : "게시글 수정"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {mode === "edit" && selectedPost && (
            <Alert variant="info">
              ID: {selectedPost.id} | 생성일: {selectedPost.createdAt} | 조회수: {selectedPost.views}
            </Alert>
          )}

          <FormInput
            name="title"
            value={formData.title}
            onChange={(value) => setFormData({ ...formData, title: value })}
            label="제목"
            placeholder="게시글 제목을 입력하세요"
            required
            width="full"
            fieldType="postTitle"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <FormInput
              name="author"
              value={formData.author}
              onChange={(value) => setFormData({ ...formData, author: value })}
              label="작성자"
              placeholder="작성자명"
              required
              width="full"
            />
            <FormSelect
              name="category"
              value={formData.category}
              onChange={(value) => setFormData({ ...formData, category: value })}
              options={[
                { value: "development", label: "Development" },
                { value: "design", label: "Design" },
                { value: "accessibility", label: "Accessibility" },
              ]}
              label="카테고리"
              placeholder="카테고리 선택"
              size="md"
            />
          </div>
          <FormTextarea
            name="content"
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            label="내용"
            placeholder="게시글 내용을 입력하세요"
            rows={6}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="md" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" size="md" onClick={mode === "create" ? handleSubmit : handleUpdate}>
          {mode === "create" ? "생성" : "수정 완료"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
