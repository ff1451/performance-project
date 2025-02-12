import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import styles from "./Header.module.css";
import logo from "@/assets/logo.png";
import AuthButton from "./AuthButton/AuthButton";
import { useState } from "react";
import LoginModal from "../LoginModal/LoginModal";

export function Header() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const modalOpenHandler = () => {
    setShowLoginModal(true);
  };

  const modalCloseHandler = () => {
    setShowLoginModal(false);
  };

  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to="">
        <img src={logo} alt="로고" className={styles.header__logoImage} />
        <h1 className={styles.header__logo}>공연 정보 알리미</h1>
      </Link>

      <nav>
        <ul className={styles.nav__list}>
          <li>
            <Link to="/performances" className={styles.nav__item}>
              공연 목록
            </Link>
          </li>
          <li>
            <Link to="/reviews" className={styles.nav__item}>
              임시
            </Link>
          </li>
          <li>
            <Link to="/schedule" className={styles.nav__item}>
              임시
            </Link>
          </li>
        </ul>
      </nav>

      <form className={styles.search}>
        <input
          className={styles.search__input}
          type="text"
          placeholder="검색"
        />
        <button className={styles.search__button} type="submit">
          <Search />
        </button>
      </form>

      <AuthButton onOpen={modalOpenHandler} />

      {showLoginModal && <LoginModal onClose={modalCloseHandler} />}
    </header>
  );
}
