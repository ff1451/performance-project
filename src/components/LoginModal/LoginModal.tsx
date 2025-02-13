import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { Input } from "../UI/Input/Input";
import styles from "./LoginModal.module.css";
import { X } from "lucide-react";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요.");
      return;
    }

    const storedUser = localStorage.getItem(email);
    if (!storedUser) {
      setError("가입되지 않은 이메일입니다.");
      return;
    }

    const userData = JSON.parse(storedUser);
    if (userData.password !== password) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    login(userData.email, userData.nickname);
    alert(`${userData.nickname}님, 환영합니다!`);
    onClose();
  };

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal__header"]}>
          <h2 className={styles["modal__title"]}>로그인</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <X />
          </button>
        </div>
        <form className={styles["modal__body"]}>
          <div className={styles["input__container"]}>
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}
          <button onClick={handleLogin} className={styles["login-button"]}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
