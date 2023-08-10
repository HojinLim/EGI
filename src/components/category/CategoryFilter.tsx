import React, { useState } from 'react';

interface Categorylist {
  value: string;
  label: string;
}

const CategoryFilter = () => {
  const categorylist: Categorylist[] = [
    { value: '컴퓨터', label: '컴퓨터' },
    { value: '노트북', label: '노트북' },
    { value: '콘솔', label: '콘솔' },
    { value: '핸드폰', label: '핸드폰' },
    { value: '주변기기', label: '주변기기' },
    { value: '모니터', label: '모니터' }
  ];

  const [categoryItem, setCategoryItem] = useState<Categorylist>(categorylist[0]);
  const [toggle, setToggle] = useState<boolean>(false);

  const handleCategoryClick = (cate: Categorylist) => {
    setCategoryItem(cate);
    setToggle(false);
  };

  return (
    <>
      <div>원하는 제품을 찾아보세요</div>
      <div className={`select-box ${toggle ? 'open' : ''}`} onClick={() => setToggle(!toggle)}>
        {categoryItem.value} ▼
      </div>
      {toggle && (
        <div className="select-dropdown">
          {categorylist.map((cate, index) => (
            <div className="select-item" key={index} onClick={() => handleCategoryClick(cate)}>
              {cate.value}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryFilter;
