import React from "react";
import { RegisterForm } from "../components/forms/RegisterForm";

export const RegisterPage: React.FC = () => {
  return (
    <div className="auth-page-container">
      <RegisterForm />
    </div>
  );
};
