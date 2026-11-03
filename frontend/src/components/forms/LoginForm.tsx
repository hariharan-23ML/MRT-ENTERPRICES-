import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { isValidEmail } from "../../utils/validators";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid business email address.");
      return;
    }
    if (!password) {
      setError("Please enter your account password.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Authentication failed. Please check your credentials or use the test credentials below."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail("admin@medisource.test");
    setPassword("admin123");
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Institutional Sign In</h2>
        <p className="auth-subtitle">
          Access your MRT Enterprises procurement account, orders, and quotations.
        </p>
      </div>

      {error && (
        <div className="auth-alert-box auth-alert-error" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <div className="auth-alert-box auth-alert-info">
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, marginBottom: "2px" }}>Demo Credentials:</div>
          <div style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
            admin@medisource.test / admin123
          </div>
        </div>
        <button
          type="button"
          onClick={handleFillDemoAdmin}
          className="btn btn-sm btn-secondary"
          style={{ padding: "4px 8px", fontSize: "0.75rem" }}
        >
          Auto-fill
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Corporate Email"
          type="email"
          placeholder="procurement@hospital.org"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={16} />}
        />

        <div style={{ position: "relative" }}>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
            rightIcon={
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isFullWidth
          isLoading={isSubmitting}
          style={{ marginTop: "12px" }}
        >
          Sign In to MediSource
        </Button>
      </form>

      <div className="auth-footer">
        Don&apos;t have an institutional account?{" "}
        <Link to="/register">Register your facility</Link>
      </div>
    </div>
  );
};
