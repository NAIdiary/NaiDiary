import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Edit, Trash2, Star, CheckCircle, Clock, Calendar } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface SelfCareActivity {
  id: string;
  name: string;
  category: string;
  description: string;
  duration: string;
  completed: boolean;
  lastCompleted: string;
  frequency: string;
  mood: 'great' | 'good' | 'okay' | 'bad';
}

interface SelfCareTip {
  id: string;
  title: string;
  content: string;
  category: string;
  favorite: boolean;
}

const SelfCarePanel: React.FC = () => {
  const [activities, setActivities] = useState<SelfCareActivity[]>([]);
  const [tips, setTips] = useState<SelfCareTip[]>([]);
  
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddTip, setShowAddTip] = useState(false);
  const [editingActivity, setEditingActivity] = useState<SelfCareActivity | null>(null);
  const [editingTip, setEditingTip] = useState<SelfCareTip | null>(null);

  const [newActivity, setNewActivity] = useState<Omit<SelfCareActivity, 'id' | 'completed' | 'lastCompleted'>>({
    name: '',
    category: '',
    description: '',
    duration: '',
    frequency: '',
    mood: 'good',
  });

  const [newTip, setNewTip] = useState<Omit<SelfCareTip, 'id' | 'favorite'>>({
    title: '',
    content: '',
    category: '',
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('SelfCare');

  useEffect(() => {
    if (conteudo) {
      setActivities(conteudo.activities || []);
      setTips(conteudo.tips || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ activities, tips });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, tips]);

  const addActivity = () => {
    if (newActivity.name && newActivity.category && newActivity.description) {
      const activity: SelfCareActivity = {
        id: Date.now().toString(),
        ...newActivity,
        completed: false,
        lastCompleted: '',
      };
      setActivities([activity, ...activities]);
      setNewActivity({
        name: '',
        category: '',
        description: '',
        duration: '',
        frequency: '',
        mood: 'good',
      });
      setShowAddActivity(false);
    }
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const toggleActivityCompleted = (id: string) => {
    setActivities(activities.map(activity => 
      activity.id === id ? { 
        ...activity, 
        completed: !activity.completed,
        lastCompleted: !activity.completed ? new Date().toISOString().split('T')[0] : ''
      } : activity
    ));
  };

  const addTip = () => {
    if (newTip.title && newTip.content && newTip.category) {
      const tip: SelfCareTip = {
        id: Date.now().toString(),
        ...newTip,
        favorite: false,
      };
      setTips([tip, ...tips]);
      setNewTip({
        title: '',
        content: '',
        category: '',
      });
      setShowAddTip(false);
    }
  };

  const deleteTip = (id: string) => {
    setTips(tips.filter(tip => tip.id !== id));
  };

  const toggleTipFavorite = (id: string) => {
    setTips(tips.map(tip => 
      tip.id === id ? { ...tip, favorite: !tip.favorite } : tip
    ));
  };

  const categories = [
    'Física', 'Mental', 'Emocional', 'Espiritual', 'Social', 
    'Criativa', 'Relaxamento', 'Hobbies', 'Saúde', 'Beleza'
  ];

  const durations = [
    '5 minutos', '10 minutos', '15 minutos', '30 minutos', 
    '1 hora', '2 horas', 'Meio dia', 'Dia inteiro'
  ];

  const frequencies = [
    'Diariamente', '2x por semana', 'Semanalmente', 'Quinzenalmente', 
    'Mensalmente', 'Quando necessário', 'Ocasionalmente'
  ];

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'great': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'good': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'okay': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'bad': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case 'great': return 'Ótimo';
      case 'good': return 'Bom';
      case 'okay': return 'Ok';
      case 'bad': return 'Ruim';
      default: return 'Bom';
    }
  };

  const completedToday = activities.filter(activity => 
    activity.completed && activity.lastCompleted === new Date().toISOString().split('T')[0]
  ).length;

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 md:p-6"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-400 to-rose-600 rounded-xl flex items-center justify-center">
            <Heart className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Autocuidado</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Cuide de si mesma com amor e carinho 💕</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-3 md:p-4"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Hoje</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{completedToday}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-3 md:p-4"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Atividades</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{activities.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-3 md:p-4 sm:col-span-2 md:col-span-1"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Dicas Salvas</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 leading-tight">{tips.filter(tip => tip.favorite).length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4 md:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 leading-tight">Atividades de Autocuidado</h2>
          <button
            onClick={() => setShowAddActivity(true)}
            className="btn-primary text-sm md:text-base px-3 md:px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Atividade
          </button>
        </div>
        
        {activities.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-gray-500">
            <Heart className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-gray-300" />
            <p className="text-sm md:text-base leading-relaxed">Nenhuma atividade definida ainda</p>
            <p className="text-xs md:text-sm leading-relaxed">Adicione atividades que te fazem bem</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-3 md:p-4 transition-all duration-200 ${
                  activity.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${activity.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {activity.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getMoodColor(activity.mood)}`}>
                        {getMoodLabel(activity.mood)}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 md:mb-2 leading-relaxed">{activity.category}</p>
                    <p className={`text-xs md:text-sm leading-relaxed ${activity.completed ? 'text-green-600' : 'text-gray-700'}`}>
                      {activity.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.duration}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {activity.frequency}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => toggleActivityCompleted(activity.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                        activity.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {activity.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteActivity(activity.id)}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-4 md:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 leading-tight">Dicas de Autocuidado</h2>
          <button
            onClick={() => setShowAddTip(true)}
            className="btn-primary text-sm md:text-base px-3 md:px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Dica
          </button>
        </div>
        
        {tips.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-gray-500">
            <Star className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-gray-300" />
            <p className="text-sm md:text-base leading-relaxed">Nenhuma dica salva ainda</p>
            <p className="text-xs md:text-sm leading-relaxed">Adicione dicas que te ajudam no autocuidado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {tips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-pink-200 bg-pink-50 rounded-xl p-3 md:p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base text-pink-800 leading-tight mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-xs md:text-sm text-pink-700 leading-relaxed mb-1">
                      {tip.category}
                    </p>
                    <p className="text-xs md:text-sm text-pink-600 leading-relaxed">
                      {tip.content}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => toggleTipFavorite(tip.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                        tip.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${tip.favorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => deleteTip(tip.id)}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add Activity Modal */}
      {showAddActivity && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddActivity(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="card p-4 md:p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-tight">Nova Atividade</h3>
            <div className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Nome da atividade"
                value={newActivity.name}
                onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                className="input-field text-base"
              />
              <select
                value={newActivity.category}
                onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                className="input-field text-base"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <textarea
                placeholder="Descrição da atividade"
                value={newActivity.description}
                onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                className="input-field h-20 md:h-24 resize-none text-base"
              />
              <select
                value={newActivity.duration}
                onChange={(e) => setNewActivity({ ...newActivity, duration: e.target.value })}
                className="input-field text-base"
              >
                <option value="">Selecione a duração</option>
                {durations.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
              <select
                value={newActivity.frequency}
                onChange={(e) => setNewActivity({ ...newActivity, frequency: e.target.value })}
                className="input-field text-base"
              >
                <option value="">Selecione a frequência</option>
                {frequencies.map(frequency => (
                  <option key={frequency} value={frequency}>{frequency}</option>
                ))}
              </select>
              <select
                value={newActivity.mood}
                onChange={(e) => setNewActivity({ ...newActivity, mood: e.target.value as any })}
                className="input-field text-base"
              >
                <option value="great">Ótimo</option>
                <option value="good">Bom</option>
                <option value="okay">Ok</option>
                <option value="bad">Ruim</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddActivity(false)}
                  className="btn-secondary flex-1 text-sm md:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={addActivity}
                  className="btn-primary flex-1 text-sm md:text-base"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Tip Modal */}
      {showAddTip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddTip(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="card p-4 md:p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-tight">Nova Dica</h3>
            <div className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Título da dica"
                value={newTip.title}
                onChange={(e) => setNewTip({ ...newTip, title: e.target.value })}
                className="input-field text-base"
              />
              <select
                value={newTip.category}
                onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
                className="input-field text-base"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <textarea
                placeholder="Conteúdo da dica"
                value={newTip.content}
                onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                className="input-field h-20 md:h-24 resize-none text-base"
              />
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddTip(false)}
                  className="btn-secondary flex-1 text-sm md:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={addTip}
                  className="btn-primary flex-1 text-sm md:text-base"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SelfCarePanel;