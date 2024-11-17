'use client';

import { useTheme } from '@/context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('Home');

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Create New', href: '/create-new' },
  ];

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">
        Codeserver Admin
      </h1>

      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`relative px-4 py-2 text-sm font-semibold rounded transition-colors duration-300 ${
                activeTab === item.label
                  ? 'bg-yellow-500 text-white'
                  : 'text-gray-900 dark:text-gray-300 hover:bg-yellow-500 hover:text-white'
              }`}
              onClick={() => setActiveTab(item.label)}
            >
              {item.label}
              {activeTab === item.label && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-600"></span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full transition-colors duration-300 hover:bg-gray-400 dark:hover:bg-gray-600"
      >
        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
