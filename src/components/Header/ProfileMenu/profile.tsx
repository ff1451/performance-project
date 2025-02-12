import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import styles from "./profile.module.css";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface ProfileProps {
  logout: () => void;
}

export default function Profile({ logout }: ProfileProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement) {
        if (!event.target.closest(`.${styles.profile}`)) {
          setDropdownOpen(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className={styles["profile__container"]}>
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
          <Link to="/mypage" className={styles["profile__dropdown-item"]}>
            마이페이지
          </Link>

          <button
            onClick={() => {
              logout();
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
