import { useAuthStore } from "@/stores/useAuthStore";
import { useReviewStore } from "@/stores/useReviewStore";
import { validateNickname } from "@/utils/validate";
import { useState } from "react";

export default function useUserProfile() {
  const { user } = useAuthStore();
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleNicknameBlur = () => {
    if (!nickname) return;

    if (user && user.nickname === nickname) {
      setNicknameError("");
      return;
    }

    setNicknameError(validateNickname(nickname));
  };

  const handleUpdateProfile = () => {
    if (!user) return;

    const storedUserData = localStorage.getItem(user.email);
    if (!storedUserData) return;

    const parsedUser = JSON.parse(storedUserData);

    if (newPassword && parsedUser.password !== currentPassword) {
      setPasswordError("기존 비밀번호가 일치하지 않습니다.");
      return;
    }

    const updatedUser = {
      ...parsedUser,
      nickname,
      ...(newPassword && { password: newPassword }),
    };

    localStorage.setItem(user.email, JSON.stringify(updatedUser));
    useAuthStore.setState({ user: { email: user.email, nickname } });
    useReviewStore.getState().updateNicknameInReviews(user.email, nickname);

    alert("프로필이 업데이트되었습니다!");
    setEditMode(false);
    setCurrentPassword("");
    setNewPassword("");
    setPasswordError("");
  };

  return {
    nickname,
    setNickname,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    nicknameError,
    passwordError,
    editMode,
    setEditMode,
    handleNicknameBlur,
    handleUpdateProfile,
  };
}
