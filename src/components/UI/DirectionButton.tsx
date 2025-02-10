import styles from "./DirectionButton.module.css";

interface DirectionButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
}

export const DirectionButton = ({
  direction,
  onClick,
}: DirectionButtonProps) => {
  return (
    <button className={styles["direction-button"]} onClick={onClick}>
      {direction === "prev" ? "◀" : "▶"}
    </button>
  );
};
