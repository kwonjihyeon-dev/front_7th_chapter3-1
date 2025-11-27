import { Button } from "@/components/atoms";
import { FormInput, FormSelect } from "@/components/molecules";
import { Alert, Modal } from "@/components/organisms";
import { useLoadUserData } from "@/hooks";
import { userService, type User } from "@/services/userService";
import type { ManagementMode } from "@/types";
import React, { useEffect, useState } from "react";

interface UserManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ManagementMode;
  selectedUser: User | null;
}

export const UserManagementModal: React.FC<UserManagementModalProps> = ({ isOpen, onClose, mode, selectedUser }) => {
  const [formData, setFormData] = useState<Omit<User, "id" | "createdAt">>({
    username: "",
    email: "",
    role: "user",
    status: "active",
  });

  const { loadData } = useLoadUserData();

  useEffect(() => {
    if (mode === "edit" && selectedUser) {
      setFormData({
        username: selectedUser.username,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      });
    } else {
      setFormData({
        username: "",
        email: "",
        role: "user",
        status: "active",
      });
    }
  }, [mode, selectedUser, isOpen]);

  const handleSubmit = async () => {
    try {
      await userService.create({
        username: formData.username,
        email: formData.email,
        role: formData.role || "user",
        status: formData.status || "active",
      });
      await loadData();
      onClose();
    } catch (error) {
      // TODO: 에러 처리
      // showAlert("error", "사용자 생성에 실패했습니다");
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedUser) return;
      await userService.update(selectedUser.id, formData);
      await loadData();
      onClose();
    } catch (error) {
      // TODO: 에러 처리
      // showAlert("error", "사용자 수정에 실패했습니다");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <Modal.Header>
        <Modal.Title>{mode === "create" ? "새 사용자 만들기" : "사용자 수정"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          {mode === "edit" && selectedUser && (
            <Alert variant="info">
              ID: {selectedUser.id} | 생성일: {selectedUser.createdAt}
            </Alert>
          )}

          <FormInput
            name="username"
            value={formData.username}
            onChange={(value) => setFormData({ ...formData, username: value })}
            label="사용자명"
            placeholder="사용자명을 입력하세요"
            required
            width="full"
            fieldType="username"
          />
          <FormInput
            name="email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
            label="이메일"
            placeholder="이메일을 입력하세요"
            type="email"
            required
            width="full"
            fieldType="email"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <FormSelect
              name="role"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value as "admin" | "moderator" | "user" })}
              options={[
                { value: "user", label: "사용자" },
                { value: "moderator", label: "운영자" },
                { value: "admin", label: "관리자" },
              ]}
              label="역할"
              size="md"
            />
            <FormSelect
              name="status"
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" | "suspended" })}
              options={[
                { value: "active", label: "활성" },
                { value: "inactive", label: "비활성" },
                { value: "suspended", label: "정지" },
              ]}
              label="상태"
              size="md"
            />
          </div>
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
