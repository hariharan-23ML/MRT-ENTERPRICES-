import React from "react";

export interface LoaderProps {
  size?: "small" | "medium" | "large";
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "medium", text }) => {
  const sizePx = size === "small" ? "20px" : size === "large" ? "44px" : "32px";
  return (
    <div className="loader-container">
      <div
        className="loader-spinner"
        style={{ width: sizePx, height: sizePx }}
      />
      {text && <span>{text}</span>}
    </div>
  );
};
