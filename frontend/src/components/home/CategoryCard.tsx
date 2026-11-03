import React from "react";
import { Link } from "react-router-dom";
import { Category } from "../../types/category.types";

interface CategoryCardProps {
  category: Category;
  isActive?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, isActive }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className={`category-card ${isActive ? "active" : ""}`}
      aria-label={`${category.name} category with ${category.productCount} products`}
    >
      <div className="category-img-box">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
        />
      </div>
      <h3 className="category-card-name" title={category.name}>
        {category.name}
      </h3>
      <span className="category-card-count">
        {category.productCount} {category.productCount === 1 ? "Product" : "Products"}
      </span>
    </Link>
  );
};
