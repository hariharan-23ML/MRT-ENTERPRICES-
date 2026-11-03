import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      leftIcon,
      rightIcon,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name || Math.random().toString(36).substring(7);

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
            {required && <span className="required">*</span>}
          </label>
        )}
        <div className="form-input-wrapper">
          {leftIcon && <span style={{ position: "absolute", left: "12px", color: "var(--navy-400)" }}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={`form-input ${error ? "has-error" : ""} ${className}`}
            style={{
              paddingLeft: leftIcon ? "38px" : undefined,
              paddingRight: rightIcon ? "38px" : undefined,
            }}
            {...props}
          />
          {rightIcon && <span style={{ position: "absolute", right: "12px" }}>{rightIcon}</span>}
        </div>
        {error && <span className="form-error">{error}</span>}
        {helperText && !error && <span className="form-helper">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
