import styles from "./style.module.scss";

type ColorfulHeaderProps = { children: React.ReactNode; className?: string };

export function ColorfulHeader({ children, className }: ColorfulHeaderProps) {
  return (
    <h1 className={`${styles.colorful} ${className ?? ""}`}> {children}</h1>
  );
}
