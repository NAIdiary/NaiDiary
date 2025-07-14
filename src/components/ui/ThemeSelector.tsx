import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeSelectorProps {
  variant?: 'dropdown' | 'toggle';
  className?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ 
  variant = 'dropdown', 
  className = '' 
}) => {
  const { theme, setTheme, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      value: 'light' as const,
      label: 'Claro',
      icon: Sun,
      description: 'Tema claro',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      value: 'dark' as const,
      label: 'Escuro',
      icon: Moon,
      description: 'Tema escuro',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      value: 'auto' as const,
      label: 'Automático',
      icon: Monitor,
      description: 'Segue o sistema',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  const currentTheme = themes.find(t => t.value === theme);

  if (variant === 'toggle') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={() => setTheme('light')}
          className={`p-2 rounded-lg transition-all duration-200 ${
            theme === 'light'
              ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400'
              : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
          }`}
          title="Tema claro"
        >
          <Sun className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => setTheme('auto')}
          className={`p-2 rounded-lg transition-all duration-200 ${
            theme === 'auto'
              ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
              : 'text-gray-400 hover:text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/20'
          }`}
          title="Tema automático"
        >
          <Monitor className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => setTheme('dark')}
          className={`p-2 rounded-lg transition-all duration-200 ${
            theme === 'dark'
              ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
              : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'
          }`}
          title="Tema escuro"
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {currentTheme && (
          <>
            <currentTheme.icon className={`w-4 h-4 ${currentTheme.color}`} />
            <span className="hidden sm:inline">{currentTheme.label}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`} />
          </>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
            >
              <div className="p-2">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon;
                  const isSelected = theme === themeOption.value;
                  
                  return (
                    <button
                      key={themeOption.value}
                      onClick={() => {
                        setTheme(themeOption.value);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                        isSelected
                          ? `${themeOption.bgColor} ${themeOption.color}`
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="font-medium">{themeOption.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {themeOption.description}
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector; 