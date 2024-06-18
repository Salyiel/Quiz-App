import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          React Quiz App
        </div>
        <div>
          <a href="/" className="text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">Home</a>
          <a href="/about" className="text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
