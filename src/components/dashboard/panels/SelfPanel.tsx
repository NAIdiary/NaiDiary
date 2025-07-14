import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  CalendarHeart, 
  Sparkles, 
  Bath, 
  UtensilsCrossed, 
  HandHeart, 
  Rocket 
} from 'lucide-react';

interface CardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
  iconColor: string;
}

const SelfPanel: React.FC = () => {
  const cards: CardItem[] = [
    {
      id: 'necessaire',
      title: 'Necessaire',
      description: 'Itens essenciais para seu kit pessoal de beleza, higiene e autocuidado.',
      icon: Package,
      route: '/eu/necessaire',
      iconColor: 'text-pink-500'
    },
    {
      id: 'fim-de-semana',
      title: 'Fim de Semana',
      description: 'Sugestões de atividades relaxantes, mimos e cuidados para os finais de semana.',
      icon: CalendarHeart,
      route: '/eu/fim-de-semana',
      iconColor: 'text-purple-500'
    },
    {
      id: 'clareamento',
      title: 'Clareamento',
      description: 'Rotinas e receitas naturais para clareamento de áreas como virilha e axilas.',
      icon: Sparkles,
      route: '/eu/clareamento',
      iconColor: 'text-pink-500'
    },
    {
      id: 'banho-premium',
      title: 'Banho Premium',
      description: 'Passo a passo para um banho relaxante, com óleos, sal, aromas e cuidados especiais.',
      icon: Bath,
      route: '/eu/banho-premium',
      iconColor: 'text-purple-500'
    },
    {
      id: 'receitas',
      title: 'Receitas',
      description: 'Receitas saudáveis, naturais, nutritivas e leves para seu dia a dia feminino.',
      icon: UtensilsCrossed,
      route: '/eu/receitas',
      iconColor: 'text-pink-500'
    },
    {
      id: 'relacionamento',
      title: 'Relacionamento',
      description: 'Dicas de relacionamento, amor-próprio, linguagem do amor e como manter vínculos saudáveis.',
      icon: HandHeart,
      route: '/eu/relacionamento',
      iconColor: 'text-purple-500'
    },
    {
      id: 'ideias-negocio',
      title: 'Ideias de Negócio',
      description: 'Ideias e inspirações de pequenos negócios para começar ainda esse ano, especialmente pensadas para mulheres.',
      icon: Rocket,
      route: '/eu/ideias-negocio',
      iconColor: 'text-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <HandHeart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Eu</h1>
            <p className="text-gray-600 dark:text-gray-400">Seu espaço pessoal de cuidados e desenvolvimento ✨</p>
          </div>
        </div>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {cards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.id}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Link to={card.route}>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 hover:scale-105 transition-colors duration-300 text-gray-800 dark:text-gray-100 cursor-pointer group">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Subtle arrow indicator */}
                  <div className="mt-4 flex justify-end">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg 
                        className="w-3 h-3 text-pink-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom Spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default SelfPanel;