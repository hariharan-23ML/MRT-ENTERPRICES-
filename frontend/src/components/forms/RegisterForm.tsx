import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import { Lock, Mail, User, Building, Phone, AlertCircle } from "lucide-react";
import { isValidEmail, isValidPassword } from "../../utils/validators";

export const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid business email.");
      return;
    }
    const passCheck = isValidPassword(password);
    if (!passCheck.isValid) {
      setError(passCheck.message || "Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);
      await register({
        name,
        email,
        password,
        organization,
        phone,
      });
      navigate("/");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Registration failed. An account with this email may already exist."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <h2>Register Facility Account</h2>
        <p className="auth-subtitle">
          Create an institutional buyer profile for verified quotation and bulk procurement.
        </p>
      </div>

      {error && (
        <div className="auth-alert-box auth-alert-error" role="alert">
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <Input
          label="Full Contact Name"
          type="text"
          placeholder="Dr. Rajesh Kumar"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User size={16} />}
        />

        <Input
          label="Healthcare Organization / Facility Name"
          type="text"
          placeholder="City Multispeciality Hospital"
          required
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          leftIcon={<Building size={16} />}
        />

        <div className="form-grid-2">
          <Input
            label="Corporate Email"
            type="email"
            placeholder="purchase@hospital.org"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail size={16} />}
          />

          <Input
            label="Contact Phone"
            type="tel"
            placeholder="+91 98765 43210"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone size={16} />}
          />
        </div>

        <div className="form-grid-2">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            leftIcon={<Lock size={16} />}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          isFullWidth
          isLoading={isSubmitting}
          style={{ marginTop: "16px" }}
        >
          Create Institutional Account
        </Button>
      </form>

      <div className="auth-footer">
        Already registered? <Link to="/login">Sign in here</Link>
      </div>
    </div>
  );
};
