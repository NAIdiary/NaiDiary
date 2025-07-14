import React from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Music, Star, Share2, PlayCircle, Sparkles, TrendingUp, Users } from 'lucide-react';

const sections = [
  {
    icon: Clapperboard,
    title: 'Séries e filmes',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Indicações do momento',
        items: [
          'Bridgerton (Netflix)',
          'The Summer I Turned Pretty (Prime Video)',
          'Heartstopper (Netflix)',
          'Euphoria (HBO Max)',
          'Atypical (Netflix)'
        ]
      },
      {
        type: 'text',
        title: 'Dica',
        text: 'Procure assistir com amigas e fazer maratonas temáticas!'
      },
      {
        type: 'list',
        title: 'Onde assistir',
        items: [
          'Netflix',
          'Prime Video',
          'HBO Max',
          'Disney+',
          'Globoplay'
        ]
      },
      {
        type: 'text',
        title: 'Teorias e spoilers',
        text: 'Evite spoilers em grupos! Compartilhe suas teorias em chats privados ou fóruns dedicados.'
      }
    ]
  },
  {
    icon: Music,
    title: 'Música',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Artistas do momento',
        items: [
          'Olivia Rodrigo',
          'Anitta',
          'Billie Eilish',
          'Taylor Swift',
          'Luísa Sonza'
        ]
      },
      {
        type: 'list',
        title: 'Playlists para animar o dia',
        items: [
          'Pop Hits 2024',
          'Girl Power',
          'Chill Vibes',
          'Funk e Pop BR',
          'Indie para relaxar'
        ]
      },
      {
        type: 'text',
        title: 'Dica',
        text: 'Monte playlists temáticas para cada mood e compartilhe com as amigas!'
      }
    ]
  },
  {
    icon: Star,
    title: 'Celebridades',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Fofocas leves e curiosidades',
        items: [
          'Novo casal do momento nas redes sociais',
          'Looks das famosas no tapete vermelho',
          'Tendências de beleza lançadas por celebridades',
          'Bastidores de gravações e shows',
          'Aniversários e festas do mundo pop'
        ]
      },
      {
        type: 'text',
        title: 'Notícia',
        text: 'Fique de olho nos stories das celebridades para acompanhar novidades em tempo real!'
      }
    ]
  },
  {
    icon: Share2,
    title: 'Redes sociais',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Dicas para crescer no TikTok e Instagram',
        items: [
          'Use músicas e trends do momento',
          'Capriche na edição dos vídeos',
          'Participe de desafios e hashtags',
          'Interaja com seguidores nos comentários',
          'Poste com frequência e em horários estratégicos'
        ]
      },
      {
        type: 'list',
        title: 'Ideias de conteúdo',
        items: [
          'Get ready with me',
          'Rotina de estudos ou skincare',
          'Dublagens engraçadas',
          'Dicas de moda e beleza',
          'Desafios com amigas'
        ]
      },
      {
        type: 'text',
        title: 'Trend',
        text: 'Fique de olho no "Para Você" do TikTok para descobrir o que está bombando!'
      }
    ]
  }
];

const EntretenimentoPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Clapperboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Entretenimento e Cultura Pop</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Dicas, novidades e diversão sobre séries, música, famosos e redes sociais.</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col gap-3 hover:scale-105 transition-transform transition-colors duration-300 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-pink-50 dark:bg-pink-900/20 ${section.color}`}>
              <section.icon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-pink-500 transition-colors duration-300">{section.title}</h2>
            <div className="space-y-4 mt-2">
              {section.content.map((item, i) => (
                <div key={i} className="rounded-lg p-3 bg-pink-50 dark:bg-gray-800/40 border border-pink-100 dark:border-pink-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    {section.icon === Clapperboard && <PlayCircle className="w-4 h-4 text-pink-400" />}
                    {section.icon === Music && <Sparkles className="w-4 h-4 text-purple-400" />}
                    {section.icon === Star && <TrendingUp className="w-4 h-4 text-pink-400" />}
                    {section.icon === Share2 && <Users className="w-4 h-4 text-purple-400" />}
                    <span className="font-medium text-gray-800 dark:text-gray-100">{item.title}</span>
                  </div>
                  {item.type === 'list' && Array.isArray(item.items) && (
                    <ul className="list-disc pl-8 text-sm text-gray-600 dark:text-gray-300">
                      {item.items.map((li, idx) => (
                        <li key={idx}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {item.type === 'text' && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 pl-6">{item.text}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EntretenimentoPanel; 