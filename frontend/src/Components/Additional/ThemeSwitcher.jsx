import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/Store';
import { themes } from '../../redux/themes';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme);

  const handleThemeChange = (themeName) => {
    dispatch(setTheme(themeName));
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Moon 
        className="w-[30px] h-[30px] rounded-3xl cursor-pointer text-header-font" 
        strokeWidth={0.7}
        onClick={() => setIsOpen(!isOpen)}
      />
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-primary-header shadow-lg rounded-lg border border-hover-color ">
          {Object.keys(themes).map((themeName) => (
            <div 
              key={themeName}
              onClick={() => handleThemeChange(themeName)}
              className={`
                px-4 py-2 cursor-pointer hover:bg-hover 
                ${currentTheme === themes[themeName] ? 'bg-button text-white' : ''}
              `}
            >
              {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;