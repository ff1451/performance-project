import { usePerformanceListStore } from "@/stores/usePerformanceListStore";
import styles from "./PerformanceCategoryNav.module.css";
import { categories } from "@/constants";

export default function PerformanceCategoryNav() {
  const { selectedCategory, setSelectedCategory } = usePerformanceListStore();

  return (
    <ul className={styles["performance__genre-nav"]}>
      {categories.map((category, index) => (
        <li
          key={category.category}
          className={`${styles["performance__genre-item"]} ${
            index === categories.length - 1
              ? styles["performance__genre-item--last"]
              : ""
          } ${
            selectedCategory === category.category
              ? styles["performance__genre-item--active"]
              : ""
          }`}
          onClick={() => setSelectedCategory(category.category)}
        >
          {category.category}
          {category.subCategory && (
            <p className={styles["performance__genre-text"]}>
              ({category.subCategory})
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
