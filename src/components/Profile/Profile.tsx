import { Input } from "@/components/UI/Input/Input";
import styles from "./Profile.module.css";
import classNames from "classnames";

interface ProfileProps {
  user: { email: string; nickname: string };
  editMode: boolean;
  nickname: string;
  currentPassword: string;
  newPassword: string;
  nicknameError: string;
  passwordError: string;
  onNicknameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCurrentPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNicknameBlur: () => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function Profile({
  user,
  editMode,
  nickname,
  currentPassword,
  newPassword,
  nicknameError,
  passwordError,
  onNicknameChange,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onNicknameBlur,
  onEdit,
  onSave,
  onCancel,
}: ProfileProps) {
  return (
    <>
      {editMode ? (
        <div className={styles["profile__edit"]}>
          <Input
            type="text"
            label="닉네임(수정 시 변경)"
            placeholder="닉네임"
            value={nickname}
            onChange={onNicknameChange}
            onBlur={onNicknameBlur}
            error={nicknameError}
          />
          <Input
            type="password"
            value={currentPassword}
            onChange={onCurrentPasswordChange}
            placeholder="현재 비밀번호 입력"
            error={passwordError}
          />
          <Input
            type="password"
            value={newPassword}
            onChange={onNewPasswordChange}
            placeholder="새 비밀번호 입력 (선택 사항)"
          />
          <div className={styles["profile__buttons"]}>
            <button className={styles["button"]} onClick={onSave}>
              저장
            </button>
            <button
              className={classNames(
                styles["button"],
                styles["button--secondary"]
              )}
              onClick={onCancel}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className={styles["profile__info"]}>
          <p className={styles["profile__email"]}>
            <strong>이메일:</strong> {user.email}
          </p>
          <p className={styles["profile__nickname"]}>
            <strong>닉네임:</strong> {user.nickname}
          </p>
          <button className={styles["button"]} onClick={onEdit}>
            수정
          </button>
        </div>
      )}
    </>
  );
}
