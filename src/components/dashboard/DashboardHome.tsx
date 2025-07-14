import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Activity, ShoppingBag, Sparkles, Calendar, Zap,
  Trash2, Palette, Smartphone, Shield, User, Star,
  Smile, MessageCircle, Sun, Moon, Heart, TrendingUp, Mail, Gamepad2, Trophy
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import WelcomeLetter from '../ui/WelcomeLetter';

const quickStats = [
  { label: 'Dias consecutivos', value: '7', icon: TrendingUp, color: 'text-green-500' },
  { label: 'Metas concluídas', value: '12', icon: Star, color: 'text-yellow-500' },
  { label: 'Nível de energia', value: '85%', icon: Zap, color: 'text-blue-500' },
  { label: 'Próxima menstruação', value: '8 dias', icon: Calendar, color: 'text-pink-500' },
];

const featuredPanels = [
  { path: '/glow-up', icon: Star, label: 'Glow Up', color: 'from-fuchsia-400 to-pink-400', description: 'Seu checklist de transformação' },
  { path: '/manifestation', icon: Zap, label: 'Manifestação', color: 'from-yellow-400 to-orange-400', description: 'Lei da atração em ação' },
  { path: '/selfcare', icon: Sparkles, label: 'Autocuidado', color: 'from-pink-400 to-rose-400', description: 'Skincare e cuidados pessoais' },
  { path: '/body', icon: Activity, label: 'Corpo', color: 'from-green-400 to-emerald-400', description: 'Saúde e bem-estar' },
  { path: '/year-end-challenge', icon: Trophy, label: 'Desafio de Fim de Ano', color: 'from-orange-400 to-red-400', description: 'Sua jornada até dezembro' },
];

const DashboardHome: React.FC = () => {
  const { user } = useAuth();
  const [showWelcomeLetter, setShowWelcomeLetter] = useState(false);
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Bom dia' : currentHour < 18 ? 'Boa tarde' : 'Boa noite';
  const greetingIcon = currentHour < 18 ? Sun : Moon;

  return (
    <>
      {showWelcomeLetter && (
        <WelcomeLetter onClose={() => setShowWelcomeLetter(false)} />
      )}
      
      <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-4 md:p-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {React.createElement(greetingIcon, { className: "w-5 h-5 md:w-6 md:h-6 text-yellow-500" })}
                <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">
                  {greeting}, {user?.alter_ego || 'Princesa'}!
                </h1>
              </div>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Como você está se sentindo hoje? Lembre-se: você é incrível! ✨
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 text-primary-500 dark:text-primary-400">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">Você é especial</span>
              </div>
              <button
                onClick={() => setShowWelcomeLetter(true)}
                className="btn-secondary text-sm px-3 py-2 flex items-center gap-2 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:text-pink-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Ver carta</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-3 md:p-4 text-center"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gray-50 dark:bg-gray-700 mb-2 md:mb-3">
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
              </div>
              <p className="text-lg md:text-2xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{stat.value}</p>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Featured Panels */}
        <div>
          <h2 className="text-lg md:text-xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6 leading-tight">
            Seus painéis favoritos 💕
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredPanels.map((panel, index) => (
              <motion.div
                key={panel.path}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={index === 4 ? 'lg:col-span-2' : ''}
              >
                <Link
                  to={panel.path}
                  className="block card p-4 md:p-6 hover:shadow-xl transition-all duration-300 group min-h-[120px] md:min-h-[140px]"
                >
                  <div className="flex items-center gap-3 md:gap-4 h-full">
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${panel.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <panel.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-base md:text-lg leading-tight mb-1">
                        {panel.label}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 leading-relaxed">{panel.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Panels Grid */}
        <div>
          <h2 className="text-lg md:text-xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-4 md:mb-6 leading-tight">
            Todos os seus espaços
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {[
              { path: '/education', icon: BookOpen, label: 'Educação' },
              { path: '/body', icon: Activity, label: 'Corpo' },
              { path: '/shopping', icon: ShoppingBag, label: 'Compras' },
              { path: '/selfcare', icon: Sparkles, label: 'Autocuidado' },
              { path: '/menstruation', icon: Calendar, label: 'Menstruação' },
              { path: '/manifestation', icon: Zap, label: 'Manifestação' },
              { path: '/emotional-trash', icon: Trash2, label: 'Lixo Emocional' },
              { path: '/beauty', icon: Palette, label: 'Beleza & Moda' },
              { path: '/apps', icon: Smartphone, label: 'Apps Úteis' },
              { path: '/religion', icon: Shield, label: 'Religião' },
              { path: '/self', icon: User, label: 'Eu' },
              { path: '/glow-up', icon: Star, label: 'Glow Up' },
              { path: '/hygiene', icon: Smile, label: 'Higiene Íntima' },
              { path: '/advice', icon: MessageCircle, label: 'Conselhos' },
              { path: '/hobbies', icon: Gamepad2, label: 'Hobbies' },
              { path: '/year-end-challenge', icon: Trophy, label: 'Desafio de Fim de Ano' },
            ].map((panel, index) => (
              <motion.div
                key={panel.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  to={panel.path}
                  className="card p-3 md:p-4 text-center hover:shadow-lg transition-all duration-200 group min-h-[100px] md:min-h-[120px] flex flex-col items-center justify-center"
                >
                  <panel.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-400 dark:text-gray-500 group-hover:text-primary-500 dark:group-hover:text-primary-400 mx-auto mb-2 transition-colors" />
                  <p className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                    {panel.label}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;