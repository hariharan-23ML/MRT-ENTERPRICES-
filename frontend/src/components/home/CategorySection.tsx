import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "../../data/catalogue/categories";
import { CategoryCard } from "./CategoryCard";

interface CategorySectionProps {
  activeCategoryId?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ activeCategoryId }) => {
  return (
    <section className="category-section-strip" aria-labelledby="categories-heading">
      <div className="container">
        <div className="category-strip-header">
          <h2 id="categories-heading">Medical Equipment Categories</h2>
          <Link to="/products" className="view-all-cats-link">
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="categories-horizontal-container">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              isActive={cat.id === activeCategoryId}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
