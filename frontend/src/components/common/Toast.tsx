import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export interface ToastProps {
  id: string;
  type?: "success" | "error" | "info";
  message: string;
  onClose: (id: string) => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type = "success",
  message,
  onClose,
  duration = 4000,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div className={`toast toast-${type}`} role="alert">
      {type === "success" ? (
        <CheckCircle2 size={18} color="var(--emerald-500)" />
      ) : (
        <AlertCircle size={18} color="var(--rose-600)" />
      )}
      <span>{message}</span>
      <button
        onClick={() => onClose(id)}
        style={{ color: "var(--navy-400)", marginLeft: "auto", display: "flex" }}
      >
        <X size={14} />
      </button>
    </div>
  );
};
