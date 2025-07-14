import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Heart, Users, Home, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';

const sections = [
  {
    icon: HeartHandshake,
    title: 'Dúvidas sobre relacionamentos',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Dicas para conquistar e manter um relacionamento saudável',
        items: [
          'Seja autêntica e valorize quem você é.',
          'Demonstre interesse genuíno e escute com atenção.',
          'Valorize pequenos gestos e gentilezas.',
          'Comunique seus sentimentos de forma clara e respeitosa.',
          'Respeite o tempo e o espaço do outro.'
        ]
      },
      {
        type: 'list',
        title: 'Como lidar com términos e ciúmes',
        items: [
          'Permita-se sentir e respeite seu tempo de luto.',
          'Busque apoio em amigas e familiares.',
          'Evite contato imediato após o término.',
          'Trabalhe sua autoconfiança e autoestima.',
          'Converse abertamente sobre inseguranças.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Relacionamentos saudáveis começam pelo amor-próprio.'
      }
    ]
  },
  {
    icon: Heart,
    title: 'Sexualidade',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Autoconhecimento e saúde íntima',
        items: [
          'Conheça seu corpo e respeite seus limites.',
          'Busque informações confiáveis sobre sexualidade.',
          'Consulte profissionais de saúde regularmente.',
          'Pratique higiene íntima adequada.',
          'Use métodos contraceptivos e proteja-se.'
        ]
      },
      {
        type: 'list',
        title: 'Dicas para conversar sobre sexo',
        items: [
          'Fale abertamente com pessoas de confiança.',
          'Lembre-se da importância do consentimento.',
          'Não tenha vergonha de tirar dúvidas com profissionais.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Cuidar da sua sexualidade é um ato de autocuidado.'
      }
    ]
  },
  {
    icon: Users,
    title: 'Amizades',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Como fazer e fortalecer amizades',
        items: [
          'Participe de grupos e atividades que você gosta.',
          'Demonstre interesse e carinho pelas pessoas.',
          'Esteja presente nos momentos importantes.',
          'Valorize a escuta e o apoio mútuo.',
          'Peça desculpas e perdoe quando necessário.'
        ]
      },
      {
        type: 'list',
        title: 'Lidando com conflitos e afastamentos',
        items: [
          'Converse com sinceridade e empatia.',
          'Respeite o tempo do outro e o seu.',
          'Mantenha o coração aberto para reaproximações.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Amizades verdadeiras são construídas com respeito e carinho.'
      }
    ]
  },
  {
    icon: Home,
    title: 'Vida familiar',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Dicas para melhorar a convivência em casa',
        items: [
          'Converse sobre sentimentos e expectativas.',
          'Busque momentos de lazer em família.',
          'Respeite as diferenças e os limites de cada um.',
          'Resolva conflitos em momentos tranquilos.',
          'Procure ajuda externa se necessário.'
        ]
      },
      {
        type: 'list',
        title: 'Cuidando da saúde emocional em casa',
        items: [
          'Fale sobre o que sente com alguém de confiança.',
          'Busque apoio quando precisar.',
          'Reserve um tempo para si mesma.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Família é onde encontramos apoio e aprendizados para a vida.'
      }
    ]
  }
];

const RelacionamentosPanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <HeartHandshake className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Relacionamentos e Vida Social</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Dúvidas, dicas e apoio para sua vida amorosa, amizades e família.</p>
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
            <div className="space-y-2 mt-2">
              {section.content.map((item, i) => (
                <div key={i} className="rounded-lg p-3 bg-pink-50 dark:bg-gray-800/40 border border-pink-100 dark:border-pink-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    <HelpCircle className="w-4 h-4 text-pink-400" />
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

export default RelacionamentosPanel; 