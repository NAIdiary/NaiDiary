import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import {
  Heart, Home, BookOpen, Activity, ShoppingBag, Sparkles,
  Calendar, Zap, Trash2, Palette, Smartphone, Smile, User,
  Star, Shield, MessageCircle, Users, LogOut, Gamepad2, Trophy
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeSelector from './ThemeSelector';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: Home, label: 'Início', color: 'text-primary-500' },
    { path: '/education', icon: BookOpen, label: 'Educação', color: 'text-blue-500' },
    { path: '/body', icon: Activity, label: 'Corpo', color: 'text-green-500' },
    { path: '/shopping', icon: ShoppingBag, label: 'Compras', color: 'text-purple-500' },
    { path: '/selfcare', icon: Sparkles, label: 'Autocuidado', color: 'text-pink-500' },
    { path: '/menstruation', icon: Calendar, label: 'Menstruação', color: 'text-red-500' },
    { path: '/manifestation', icon: Zap, label: 'Manifestação', color: 'text-yellow-500' },
    { path: '/emotional-trash', icon: Trash2, label: 'Lixo Emocional', color: 'text-gray-500' },
    { path: '/beauty', icon: Palette, label: 'Beleza & Moda', color: 'text-orange-500' },
    { path: '/apps', icon: Smartphone, label: 'Apps Úteis', color: 'text-indigo-500' },
    { path: '/religion', icon: Shield, label: 'Religião', color: 'text-amber-500' },
    { path: '/eu', icon: User, label: 'Eu', color: 'text-teal-500' },
    { path: '/glow-up', icon: Star, label: 'Glow Up', color: 'text-fuchsia-500' },
    { path: '/hygiene', icon: Smile, label: 'Higiene Íntima', color: 'text-rose-500' },
    { path: '/advice', icon: MessageCircle, label: 'Conselhos', color: 'text-emerald-500' },
    { path: '/hobbies', icon: Gamepad2, label: 'Hobbies', color: 'text-violet-500' },
    { path: '/year-end-challenge', icon: Trophy, label: 'Desafio de Fim de Ano', color: 'text-orange-500' },
  ];

  const handleItemClick = () => {
    onToggle();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200"
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onToggle}
            />
            
            {/* Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 z-50 md:hidden overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-lg text-primary-600 dark:text-primary-400">NaiDiary</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Olá, {user?.alter_ego || 'Princesa'}!</p>
                  </div>
                </div>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={handleItemClick}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <Icon className={`w-6 h-6 ${isActive ? item.color : 'text-gray-400 dark:text-gray-500'}`} />
                        <span className="font-medium text-base">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Community Link */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    to="/community"
                    onClick={handleItemClick}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl bg-primary-50/50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
                  >
                    <Users className="w-6 h-6 text-primary-500 dark:text-primary-400" />
                    <span className="font-medium text-base">Comunidade</span>
                  </Link>
                </div>

                {/* Theme Selector */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="font-medium text-base text-gray-700 dark:text-gray-300">Tema</span>
                    <ThemeSelector variant="toggle" />
                  </div>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      logout();
                      onToggle();
                    }}
                    className="flex items-center gap-4 px-4 py-3 rounded-xl w-full text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all duration-200"
                  >
                    <LogOut className="w-6 h-6" />
                    <span className="font-medium text-base">Sair</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu; 