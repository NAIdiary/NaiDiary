import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Brain, Baby, Dumbbell, HelpCircle, AlertTriangle, Smile } from 'lucide-react';

const sections = [
  {
    icon: Dumbbell,
    title: 'Saúde física',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Hábitos para cuidar do corpo',
        items: [
          'Alimente-se de forma equilibrada e variada.',
          'Pratique exercícios físicos regularmente.',
          'Durma bem e respeite seu tempo de descanso.',
          'Beba bastante água ao longo do dia.',
          'Faça check-ups médicos periódicos.'
        ]
      },
      {
        type: 'list',
        title: 'Dicas para emagrecer com saúde',
        items: [
          'Evite dietas restritivas e milagrosas.',
          'Prefira reeducação alimentar e acompanhamento profissional.',
          'Inclua mais fibras, frutas e vegetais nas refeições.',
          'Mantenha uma rotina de exercícios.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Cuidar do corpo é um ato de amor-próprio e autocuidado.'
      }
    ]
  },
  {
    icon: Brain,
    title: 'Saúde mental',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Dicas para o bem-estar emocional',
        items: [
          'Durma bem e mantenha uma rotina saudável.',
          'Mantenha contato com pessoas queridas.',
          'Pratique hobbies e atividades que te dão prazer.',
          'Busque apoio quando sentir necessidade.',
          'Permita-se sentir e acolha suas emoções.'
        ]
      },
      {
        type: 'list',
        title: 'Como lidar com ansiedade e estresse',
        items: [
          'Pratique respiração profunda e meditação.',
          'Organize sua rotina e estabeleça prioridades.',
          'Evite sobrecarga e respeite seus limites.',
          'Procure ajuda profissional se necessário.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Sua saúde mental é tão importante quanto a física. Cuide de você!' 
      }
    ]
  },
  {
    icon: Baby,
    title: 'Gravidez e maternidade',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Cuidados essenciais na gestação',
        items: [
          'Faça pré-natal regularmente.',
          'Alimente-se de forma saudável e equilibrada.',
          'Evite automedicação e substâncias nocivas.',
          'Descanse e respeite seu corpo.'
        ]
      },
      {
        type: 'list',
        title: 'Dicas para os primeiros meses do bebê',
        items: [
          'Tenha uma rede de apoio para dividir tarefas.',
          'Amamente se possível e cuide do seu bem-estar.',
          'Respeite seu tempo e não se cobre tanto.',
          'Busque informações confiáveis e converse com outras mães.'
        ]
      },
      {
        type: 'text',
        title: 'Inspiração',
        text: 'Ser mãe é um desafio e um aprendizado diário. Cuide de você para cuidar do seu bebê.'
      }
    ]
  }
];

const SaudePanel: React.FC = () => {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <HeartPulse className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Saúde e Bem-Estar</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Cuide do corpo, da mente e da maternidade com dicas e apoio.</p>
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

export default SaudePanel; 