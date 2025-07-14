import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Plus, Edit, Trash2, CheckCircle, Star } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface GlowUpGoal {
  id: string;
  title: string;
  category: string;
  description: string;
  deadline: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  progress: number;
}

interface Achievement {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

const GlowUpPanel: React.FC = () => {
  const [goals, setGoals] = useState<GlowUpGoal[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddAchievement, setShowAddAchievement] = useState(false);

  const [newGoal, setNewGoal] = useState<Omit<GlowUpGoal, 'id' | 'completed' | 'progress'>>({
    title: '',
    category: '',
    description: '',
    deadline: '',
    priority: 'medium',
  });

  const [newAchievement, setNewAchievement] = useState<Omit<Achievement, 'id' | 'date'>>({
    title: '',
    description: '',
    category: '',
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('GlowUp');

  // Carregar do Supabase ao montar
  useEffect(() => {
    if (conteudo) {
      setGoals(conteudo.goals || []);
      setAchievements(conteudo.achievements || []);
    }
  }, [conteudo]);

  // Salvar no Supabase sempre que goals ou achievements mudarem
  useEffect(() => {
    if (!carregando) {
      salvar({ goals, achievements });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goals, achievements]);

  const addGoal = () => {
    if (newGoal.title && newGoal.category && newGoal.description) {
      const goal: GlowUpGoal = {
        id: Date.now().toString(),
        ...newGoal,
        completed: false,
        progress: 0,
      };
      setGoals([...goals, goal]);
      setNewGoal({
        title: '',
        category: '',
        description: '',
        deadline: '',
        priority: 'medium',
      });
      setShowAddGoal(false);
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const toggleGoalCompletion = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed, progress: goal.completed ? 0 : 100 } : goal
    ));
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, progress: Math.max(0, Math.min(100, progress)) } : goal
    ));
  };

  const addAchievement = () => {
    if (newAchievement.title && newAchievement.category && newAchievement.description) {
      const achievement: Achievement = {
        id: Date.now().toString(),
        ...newAchievement,
        date: new Date().toISOString().split('T')[0],
      };
      setAchievements([achievement, ...achievements]);
      setNewAchievement({
        title: '',
        description: '',
        category: '',
      });
      setShowAddAchievement(false);
    }
  };

  const deleteAchievement = (id: string) => {
    setAchievements(achievements.filter(achievement => achievement.id !== id));
  };

  const categories = [
    'Beleza', 'Fitness', 'Carreira', 'Estudos', 'Relacionamentos', 
    'Saúde Mental', 'Hobbies', 'Finanças', 'Espiritualidade', 'Social'
  ];

  const priorityColors = {
    high: 'text-red-600 bg-red-100',
    medium: 'text-yellow-600 bg-yellow-100',
    low: 'text-green-600 bg-green-100',
  };

  const priorityLabels = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
  };

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 md:p-6"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Glow Up</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Transforme-se na melhor versão de si mesma ✨</p>
          </div>
        </div>
      </motion.div>

      {/* Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4 md:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 leading-tight">Metas de Evolução</h2>
          <button
            onClick={() => setShowAddGoal(true)}
            className="btn-primary text-sm md:text-base px-3 md:px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Meta
          </button>
        </div>
        
        {goals.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-gray-500">
            <Target className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-gray-300" />
            <p className="text-sm md:text-base leading-relaxed">Nenhuma meta definida ainda</p>
            <p className="text-xs md:text-sm leading-relaxed">Clique em "Adicionar Meta" para começar sua evolução</p>
          </div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {goals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-3 md:p-4 transition-all duration-200 ${
                  goal.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-2 md:mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${goal.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {goal.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[goal.priority]}`}>
                        {priorityLabels[goal.priority]}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-1 md:mb-2 leading-relaxed">{goal.category}</p>
                    <p className={`text-xs md:text-sm leading-relaxed ${goal.completed ? 'text-green-600' : 'text-gray-700'}`}>
                      {goal.description}
                    </p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => toggleGoalCompletion(goal.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                        goal.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {goal.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {!goal.completed && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Progresso</span>
                      <span className="text-xs font-medium text-gray-700">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                    <div className="flex gap-1 mt-2">
                      {[0, 25, 50, 75, 100].map((value) => (
                        <button
                          key={value}
                          onClick={() => updateGoalProgress(goal.id, value)}
                          className="flex-1 h-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add Goal Modal */}
      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddGoal(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="card p-4 md:p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-tight">Nova Meta</h3>
            <div className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Título da meta"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="input-field text-base"
              />
              <select
                value={newGoal.category}
                onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                className="input-field text-base"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <textarea
                placeholder="Descrição da meta"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="input-field h-20 md:h-24 resize-none text-base"
              />
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="input-field text-base"
              />
              <select
                value={newGoal.priority}
                onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as any })}
                className="input-field text-base"
              >
                <option value="low">Baixa Prioridade</option>
                <option value="medium">Média Prioridade</option>
                <option value="high">Alta Prioridade</option>
              </select>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="btn-secondary flex-1 text-sm md:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={addGoal}
                  className="btn-primary flex-1 text-sm md:text-base"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-4 md:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 leading-tight">Conquistas</h2>
          <button
            onClick={() => setShowAddAchievement(true)}
            className="btn-primary text-sm md:text-base px-3 md:px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Conquista
          </button>
        </div>
        
        {achievements.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-gray-500">
            <Star className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-gray-300" />
            <p className="text-sm md:text-base leading-relaxed">Nenhuma conquista registrada ainda</p>
            <p className="text-xs md:text-sm leading-relaxed">Celebre suas vitórias registrando suas conquistas</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-yellow-200 bg-yellow-50 rounded-xl p-3 md:p-4"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm md:text-base text-yellow-800 leading-tight mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-xs md:text-sm text-yellow-700 leading-relaxed mb-1">
                      {achievement.category}
                    </p>
                    <p className="text-xs md:text-sm text-yellow-600 leading-relaxed">
                      {achievement.description}
                    </p>
                    <p className="text-xs text-yellow-500 mt-2">{achievement.date}</p>
                  </div>
                  <button
                    onClick={() => deleteAchievement(achievement.id)}
                    className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px] ml-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Add Achievement Modal */}
      {showAddAchievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowAddAchievement(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="card p-4 md:p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-tight">Nova Conquista</h3>
            <div className="space-y-3 md:space-y-4">
              <input
                type="text"
                placeholder="Título da conquista"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                className="input-field text-base"
              />
              <select
                value={newAchievement.category}
                onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
                className="input-field text-base"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <textarea
                placeholder="Descrição da conquista"
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                className="input-field h-20 md:h-24 resize-none text-base"
              />
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setShowAddAchievement(false)}
                  className="btn-secondary flex-1 text-sm md:text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={addAchievement}
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

export default GlowUpPanel;