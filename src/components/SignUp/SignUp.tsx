import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/UI/Input/Input";
import styles from "./Signup.module.css";
import { validateEmail } from "@/utils/validate";

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!email || !nickname || !password) {
      setError("모든 필드를 입력하세요.");
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      setError("이미 가입된 이메일입니다.");
      return;
    }

    const userData = { email, nickname, password };
    localStorage.setItem(email, JSON.stringify(userData));

    alert("회원가입 완료!");
    navigate("/");
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setError("이메일 형식이 올바르지 않습니다.");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles["signUp__container"]}>
      <h2 className={styles["signUp__Title"]}>회원가입</h2>
      <div className={styles["signUp__input-container"]}>
        <Input
          label="이메일"
          type="email"
          placeholder="xxx@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
        />
        <Input
          label="닉네임"
          type="text"
          placeholder="닉네임 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <p className={styles["signUp__error-message"]}>{error}</p>}
      <button
        className={styles["signup__button"]}
        onClick={handleSignup}
        disabled={!!error}
      >
        가입하기
      </button>
    </div>
  );
}
