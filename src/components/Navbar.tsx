'use client'
import { useTheme } from '@/context/ThemeContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-200 dark:bg-gray-800">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Codeserver Admin</h1>
      <button
        onClick={toggleTheme}
        className="flex items-center justify-center w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full"
      >
        {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
      </button>
    </nav>
  );
};

export default Navbar;
