import styles from "./LoadingUI.module.css";

export default function LoadingUI() {
  return (
    <div className={styles["loading-ui"]}>
      <div className={styles["loading-ui__spinner"]}></div>
      <span className={styles["loading-ui_text"]}>
        추가 데이터를 불러오는 중...
      </span>
    </div>
  );
}
