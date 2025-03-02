
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CategoryOption {
  value: string;
  label: string;
}

const categories: CategoryOption[] = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'inspirasi', label: 'Inspirasi' },
  { value: 'pengembangan-diri', label: 'Pengembangan Diri' },
  { value: 'kebahagiaan', label: 'Kebahagiaan' },
  { value: 'motivasi', label: 'Motivasi' }
];

const CategoryFilter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentCategory = params.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(currentCategory);

  const handleCategoryChange = (categoryValue: string) => {
    setActiveCategory(categoryValue);
    
    if (categoryValue === 'all') {
      params.delete('category');
    } else {
      params.set('category', categoryValue);
    }
    
    navigate({
      pathname: location.pathname,
      search: params.toString()
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleCategoryChange(category.value)}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            activeCategory === category.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80 text-foreground'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
