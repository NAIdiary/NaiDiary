import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Menu, Home, BookOpen, Activity, ShoppingBag, Sparkles,
  Calendar, Zap, Trash2, Palette, Smartphone, Smile, User,
  Star, Shield, MessageCircle, ChevronLeft, Users, Gamepad2, Trophy,
  HeartHandshake, HeartPulse, Droplets, Clapperboard
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeSelector from '../ui/ThemeSelector';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { path: '/', icon: Home, label: 'Início', color: 'text-primary-500' },
    { path: '/relacionamentos', icon: HeartHandshake, label: 'Relacionamentos', color: 'text-pink-500' },
    { path: '/saude', icon: HeartPulse, label: 'Saúde', color: 'text-purple-500' },
    { path: '/corpo', icon: Droplets, label: 'Corpo', color: 'text-pink-500' },
    { path: '/entretenimento', icon: Clapperboard, label: 'Entretenimento', color: 'text-purple-500' },
    { path: '/education', icon: BookOpen, label: 'Educação', color: 'text-blue-500' },
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

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 64 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="hidden md:block fixed left-0 top-0 h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-gray-200 dark:border-gray-700 z-40"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-primary-600 dark:text-primary-400">NaiDiary</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Olá, {user?.alter_ego || 'Princesa'}!</p>
                </div>
              </motion.div>
            )}
            
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
            >
              {isOpen ? (
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                title={!isOpen ? item.label : undefined}
              >
                <Icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-400 dark:text-gray-500'}`} />
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Community Link */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/community"
            className="sidebar-item text-primary-600 dark:text-primary-400 bg-primary-50/50 dark:bg-primary-900/10"
          >
            <Users className="w-5 h-5 text-primary-500 dark:text-primary-400" />
            {isOpen && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-medium"
              >
                Comunidade
              </motion.span>
            )}
          </Link>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            {/* Theme Selector */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Tema</span>
              <ThemeSelector variant="toggle" />
            </div>
            
            <button
              onClick={logout}
              className="sidebar-item w-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
            >
              <ChevronLeft className="w-5 h-5 rotate-180" />
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-medium"
                >
                  Sair
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;