import styles from "./CalendarHeader.module.css";

export function CalendarHeader() {
  return (
    <div className={styles["calendarHeader"]}>
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
        <div key={idx} className={styles["calendarHeader__day"]}>
          {day}
        </div>
      ))}
    </div>
  );
}
