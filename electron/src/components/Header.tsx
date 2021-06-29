import React from 'react';

const Header = ({title}: {title: string}) => {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
};

export default Header;
