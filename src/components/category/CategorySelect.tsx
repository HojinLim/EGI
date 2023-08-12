import React from 'react';
import { styled } from 'styled-components';

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
  <ChoiceCategory>
    <ChoiceCategoryInput type="radio" value={value} checked={checked} onChange={onChange} />
    {label}
  </ChoiceCategory>
);

export { CategorySelect, CategoryRadio };

export const BooleanCategory = styled.div``;

export const ChoiceCategory = styled.label`
  margin-right: 45px;
`;

export const ChoiceCategoryInput = styled.input`
  margin-right: 5px;
`;
