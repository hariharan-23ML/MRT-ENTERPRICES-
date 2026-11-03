import React from "react";
import { User } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, action }) => {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <div>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--navy-900)" }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: "0.75rem", color: "var(--navy-500)" }}>{subtitle}</p>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {action}

        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderLeft: "1px solid var(--navy-200)", paddingLeft: "16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--primary-100)", color: "var(--primary-700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User size={16} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--navy-900)" }}>
              {user?.name || "Administrator"}
            </span>
            <span style={{ fontSize: "0.6875rem", color: "var(--navy-500)" }}>
              {user?.email || "admin@medisource.test"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
