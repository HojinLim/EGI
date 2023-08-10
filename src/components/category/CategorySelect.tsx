import React from 'react';

interface CategoryOption {
  value: string;
  label: string;
}

interface CategorySelectProps {
  value: string;
  options: CategoryOption[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CategorySelect = ({ value, options, onChange }: CategorySelectProps) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">선택하세요</option>
      {options.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
