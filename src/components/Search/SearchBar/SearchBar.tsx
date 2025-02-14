import { useState } from "react";
import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.search__input}
        type="text"
        placeholder="검색"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.search__button} type="submit">
        <Search />
      </button>
    </form>
  );
}
