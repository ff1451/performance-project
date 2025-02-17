import { useAuthStore } from "@/stores/useAuthStore";
import { useState } from "react";
import { Input } from "../UI/Input/Input";
import styles from "./LoginModal.module.css";
import Modal from "../UI/Modal/Modal";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
    <Modal onClose={onClose} width="400px" height="350px">
      <div className={styles["login-modal__header"]}>
        <h2 className={styles["login-modal__title"]}>로그인</h2>
      </div>
      <form className={styles["login-modal__body"]}>
        <div className={styles["login-modal__input-container"]}>
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

        {error && (
          <p className={styles["login-modal__error-message"]}>{error}</p>
        )}
        <button onClick={handleLogin} className={styles["login-modal__button"]}>
          로그인
        </button>
      </form>
    </Modal>
  );
}
