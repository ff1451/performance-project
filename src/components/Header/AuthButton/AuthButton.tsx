import { useAuthStore } from "@/stores/useAuthStore";
import styles from "./AuthButton.module.css";
import { Link } from "react-router-dom";
import Profile from "../ProfileMenu/profile";
import classNames from "classnames";

interface AuthButtonProps {
  onOpen: () => void;
}

export default function AuthButton({ onOpen }: AuthButtonProps) {
  const { isLoggedIn } = useAuthStore();
  return (
    <div className={styles["auth-button__container"]}>
      {!isLoggedIn ? (
        <>
          <Link
            to="/signup"
            className={classNames(
              styles["auth-button__action"],
              styles["auth-button__action--signUp"]
            )}
          >
            회원가입
          </Link>

          <button
            onClick={onOpen}
            className={classNames(
              styles["auth-button__action"],
              styles["auth-button__action--login"]
            )}
          >
            로그인
          </button>
        </>
      ) : (
        <Profile />
      )}
    </div>
  );
}
