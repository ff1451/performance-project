import styles from "./Input.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  error?: string;
  onBlur?: () => void;
}

export function Input({
  type,
  placeholder,
  value,
  onChange,
  label,
  error,
  onBlur,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}
