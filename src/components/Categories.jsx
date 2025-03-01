import React from 'react';

const Categories = ({ data, setFilter, filterProduct }) => {
  const categories = [
    { name: 'All', filter: () => setFilter(data) },
    { name: "Men's Clothing", filter: () => filterProduct("men's clothing") },
    { name: "Women's Clothing", filter: () => filterProduct("women's clothing") },
    { name: 'Jewelery', filter: () => filterProduct('jewelery') },
    { name: 'Electronics', filter: () => filterProduct('electronics') }
  ];

  return (
    <div className="categories-container">
      <div className="buttons text-center py-5">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className="btn btn-outline-dark btn-sm m-2" 
            onClick={category.filter}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
