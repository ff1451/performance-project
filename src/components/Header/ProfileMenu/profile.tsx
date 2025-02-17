import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styles from "./profile.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Profile() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuthStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      logout();
      console.log("로그아웃 성공");
    }
  };

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles["profile__container"]} ref={dropdownRef}>
      <button className={styles["profile__button"]} onClick={toggleDropdown}>
        <FaUserCircle />
      </button>
      {dropdownOpen && (
        <div
          className={classNames(
            styles["profile__dropdown"],
            styles["profile__dropdown--visible"]
          )}
        >
          <div className={styles["profile__dropdown-nickname"]}>
            {user?.nickname} 님
          </div>
          <Link to="/mypage" className={styles["profile__dropdown-item"]}>
            마이페이지
          </Link>

          <button
            onClick={() => {
              handleAuthClick();
              setDropdownOpen(false);
            }}
            className={classNames(
              styles["profile__dropdown-item"],
              styles["profile__dropdown-item--logout"]
            )}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
