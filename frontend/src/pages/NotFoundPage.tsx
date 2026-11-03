import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Stethoscope } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container" style={{ padding: "96px 20px", textAlign: "center" }}>
      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          backgroundColor: "var(--primary-100)",
          color: "var(--primary-700)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 20px",
        }}
      >
        <Stethoscope size={36} />
      </div>
      <h1 style={{ fontSize: "3rem", fontWeight: 800, color: "var(--navy-900)", marginBottom: "12px" }}>
        404
      </h1>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "12px" }}>
        Page Not Located
      </h2>
      <p style={{ color: "var(--navy-500)", maxWidth: "480px", margin: "0 auto 28px" }}>
        The medical portal page you requested may have moved or is unavailable. Please check the URL or return to our homepage.
      </p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={16} />
        <span>Return to MediSource Homepage</span>
      </Link>
    </div>
  );
};
