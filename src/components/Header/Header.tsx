import { Link } from "react-router-dom";
import styles from "./Header.module.css";
export function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.header__link} to="">
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
              리뷰
            </Link>
          </li>
          <li>
            <Link to="/schedule" className={styles.nav__item}>
              일정
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
          검색
        </button>
      </form>
    </header>
  );
}
