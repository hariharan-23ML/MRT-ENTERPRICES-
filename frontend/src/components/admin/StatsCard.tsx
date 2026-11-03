import React, { ReactNode } from "react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  change?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon,
  color = "var(--primary-600)",
  change,
}) => {
  return (
    <div className="stat-card">
      <div
        className="stat-icon-wrap"
        style={{
          backgroundColor: `${color}15`,
          color: color,
        }}
      >
        {icon}
      </div>

      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
        {change && (
          <span style={{ fontSize: "0.6875rem", color: "var(--emerald-600)", marginTop: "2px" }}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
};
