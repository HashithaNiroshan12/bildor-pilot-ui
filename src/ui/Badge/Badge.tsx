import type { CSSProperties } from "react";
import { Tag } from "primereact/tag";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";
export type BadgeProps = {
  value: string;
  variant?: BadgeVariant;
  className?: string;
  style?: CSSProperties;
};

const SEVERITY: Record<BadgeVariant, "success" | "warning" | "danger" | "info" | undefined> = {
  default: undefined,
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
};

export function Badge({ value, variant = "default", className, style }: BadgeProps) {
  return (
    <Tag
      value={value}
      severity={SEVERITY[variant]}
      className={`my-ui-badge my-ui-badge--${variant} ${className ?? ""}`.trim()}
      style={style}
    />
  );
}
