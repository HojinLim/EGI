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

interface CategoryRadioProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CategorySelect = ({ value, options, onChange }: CategorySelectProps) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="" disabled hidden>
        선택하세요
      </option>
      {options.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  );
};

const CategoryRadio = ({ value, label, checked, onChange }: CategoryRadioProps) => (
  <label>
    <input type="radio" value={value} checked={checked} onChange={onChange} />
    {label}
  </label>
);

export { CategorySelect, CategoryRadio };
