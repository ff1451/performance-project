import styles from "./Tab.module.css";

interface Props {
  activeTab: "info" | "review";
  setActiveTab: (tab: "info" | "review") => void;
}

export default function Tab({ activeTab, setActiveTab }: Props) {
  return (
    <ul className={styles["tab-container"]}>
      <li
        className={`${styles["tab"]} ${
          activeTab === "info" ? styles["active"] : ""
        }`}
        onClick={() => setActiveTab("info")}
      >
        소개
      </li>
      <li
        className={`${styles["tab"]} ${
          activeTab === "review" ? styles["active"] : ""
        }`}
        onClick={() => setActiveTab("review")}
      >
        리뷰
      </li>
    </ul>
  );
}
