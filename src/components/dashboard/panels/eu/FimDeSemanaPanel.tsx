import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CalendarHeart, 
  ArrowLeft, 
  Heart, 
  Coffee, 
  BookOpen, 
  Music, 
  Camera, 
  Sparkles,
  Plus,
  CheckCircle,
  Circle
} from 'lucide-react';

interface WeekendActivity {
  id: string;
  title: string;
  category: string;
  description: string;
  completed: boolean;
  icon: React.ComponentType<any>;
}

const FimDeSemanaPanel: React.FC = () => {
  const [activities, setActivities] = useState<WeekendActivity[]>([
    {
      id: '1',
      title: 'Café da manhã especial',
      category: 'Alimentação',
      description: 'Prepare um café da manhã diferente com frutas, pães artesanais e chá especial',
      completed: false,
      icon: Coffee
    },
    {
      id: '2',
      title: 'Sessão de fotos',
      category: 'Criatividade',
      description: 'Tire fotos bonitas de si mesma ou de momentos especiais',
      completed: false,
      icon: Camera
    },
    {
      id: '3',
      title: 'Leitura relaxante',
      category: 'Relaxamento',
      description: 'Leia um livro que você ama em um ambiente confortável',
      completed: false,
      icon: BookOpen
    },
    {
      id: '4',
      title: 'Playlist especial',
      category: 'Música',
      description: 'Crie uma playlist com suas músicas favoritas para relaxar',
      completed: false,
      icon: Music
    },
    {
      id: '5',
      title: 'Ritual de skincare',
      category: 'Autocuidado',
      description: 'Faça uma rotina completa de skincare com máscaras e hidratação',
      completed: false,
      icon: Sparkles
    },
    {
      id: '6',
      title: 'Momento de gratidão',
      category: 'Bem-estar',
      description: 'Escreva 3 coisas pelas quais você é grata hoje',
      completed: false,
      icon: Heart
    }
  ]);

  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: '', category: '', description: '' });

  const categories = ['Alimentação', 'Criatividade', 'Relaxamento', 'Música', 'Autocuidado', 'Bem-estar', 'Exercício', 'Social'];

  const toggleActivity = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    ));
  };

  const addActivity = () => {
    if (newActivity.title && newActivity.category && newActivity.description) {
      const activity: WeekendActivity = {
        id: Date.now().toString(),
        title: newActivity.title,
        category: newActivity.category,
        description: newActivity.description,
        completed: false,
        icon: Heart
      };
      setActivities([...activities, activity]);
      setNewActivity({ title: '', category: '', description: '' });
      setShowAddActivity(false);
    }
  };

  const completedActivities = activities.filter(activity => activity.completed).length;
  const totalActivities = activities.length;

  const weekendTips = [
    {
      title: 'Desconecte-se',
      description: 'Reserve algumas horas sem celular para se conectar consigo mesma',
      icon: '📱'
    },
    {
      title: 'Pratique o ócio criativo',
      description: 'Permita-se não fazer nada produtivo por um tempo',
      icon: '☁️'
    },
    {
      title: 'Experimente algo novo',
      description: 'Teste uma receita, hobby ou atividade que sempre quis tentar',
      icon: '✨'
    },
    {
      title: 'Conecte-se com amigos',
      description: 'Marque um encontro presencial ou virtual com pessoas queridas',
      icon: '💕'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <Link to="/eu" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <CalendarHeart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Fim de Semana</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Sugestões de atividades relaxantes, mimos e cuidados para os finais de semana</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 text-gray-800 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-2">Seu ritual de fim de semana</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Descanse, cuide de si e aproveite momentos especiais. Aqui você encontrará ideias para relaxar, se mimar e recarregar as energias.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Atividades</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{completedActivities}/{totalActivities}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progresso</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas para seu fim de semana</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {weekendTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Atividades sugeridas</h2>
          <button
            onClick={() => setShowAddActivity(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>

        <div className="space-y-3">
          {activities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                  activity.completed 
                    ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-pink-200'
                }`}
              >
                <button
                  onClick={() => toggleActivity(activity.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    activity.completed 
                      ? 'bg-green-500 text-white' 
                      : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'
                  }`}
                >
                  {activity.completed ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
                
                <div className="w-8 h-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                  <IconComponent className="w-4 h-4 text-pink-600" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${activity.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                      {activity.title}
                    </h3>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                      {activity.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      {showAddActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddActivity(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Atividade</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título da Atividade</label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Sessão de fotos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select
                  value={newActivity.category}
                  onChange={(e) => setNewActivity({...newActivity, category: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Descreva a atividade..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddActivity(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addActivity}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FimDeSemanaPanel; 