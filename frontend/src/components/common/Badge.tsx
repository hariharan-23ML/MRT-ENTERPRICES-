import React, { ReactNode } from "react";

export interface BadgeProps {
  variant?: "purple" | "blue" | "green" | "amber" | "gray";
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "purple",
  icon,
  children,
  className = "",
}) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {icon && <span style={{ display: "inline-flex" }}>{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
