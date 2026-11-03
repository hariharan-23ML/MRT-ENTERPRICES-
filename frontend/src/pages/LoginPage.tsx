import React from "react";
import { LoginForm } from "../components/forms/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <LoginForm />
    </div>
  );
};
