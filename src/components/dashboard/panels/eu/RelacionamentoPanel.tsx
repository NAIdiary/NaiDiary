import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HandHeart, ArrowLeft, Plus, CheckCircle, Circle, Heart, Smile, Users, MessageCircle } from 'lucide-react';

interface RelacionamentoHabit {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ComponentType<any>;
}

const RelacionamentoPanel: React.FC = () => {
  const [habits, setHabits] = useState<RelacionamentoHabit[]>([
    {
      id: '1',
      title: 'Praticar o autocuidado',
      description: 'Reserve um tempo para cuidar de si mesma todos os dias.',
      completed: false,
      icon: Heart
    },
    {
      id: '2',
      title: 'Comunicação aberta',
      description: 'Expresse seus sentimentos e ouça com empatia.',
      completed: false,
      icon: MessageCircle
    },
    {
      id: '3',
      title: 'Valorize pequenas gentilezas',
      description: 'Demonstre carinho com gestos simples e palavras de afirmação.',
      completed: false,
      icon: Smile
    },
    {
      id: '4',
      title: 'Cultive vínculos',
      description: 'Mantenha contato com pessoas queridas e fortaleça amizades.',
      completed: false,
      icon: Users
    }
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newHabit, setNewHabit] = useState({ title: '', description: '' });

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };
  const addHabit = () => {
    if (newHabit.title && newHabit.description) {
      setHabits([
        ...habits,
        {
          id: Date.now().toString(),
          title: newHabit.title,
          description: newHabit.description,
          completed: false,
          icon: HandHeart
        }
      ]);
      setNewHabit({ title: '', description: '' });
      setShowAdd(false);
    }
  };

  const dicas = [
    { icon: '💖', text: 'Pratique o amor-próprio diariamente.' },
    { icon: '🗣️', text: 'Converse sobre sentimentos e expectativas.' },
    { icon: '🎁', text: 'Surpreenda com pequenos gestos de carinho.' },
    { icon: '🤗', text: 'Abrace, elogie e demonstre afeto.' }
  ];

  const completed = habits.filter(h => h.completed).length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <Link to="/eu" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <HandHeart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Relacionamento</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Dicas de relacionamento, amor-próprio, linguagem do amor e como manter vínculos saudáveis</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas para relações saudáveis</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {dicas.map((dica, idx) => (
            <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl flex items-center gap-3">
              <span className="text-2xl">{dica.icon}</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{dica.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-pink-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Hábitos concluídos</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{completed}/{habits.length}</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Hábitos para relações saudáveis</h2>
          <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Novo Hábito
          </button>
        </div>
        <div className="space-y-4">
          {habits.map((h, idx) => {
            const Icon = h.icon;
            return (
              <motion.div key={h.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}
                className={`border-2 rounded-xl p-4 transition-all duration-200 ${h.completed ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-pink-200'}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <button onClick={() => toggleHabit(h.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${h.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'}`}>
                    {h.completed ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-pink-600" />
                  </div>
                  <h3 className={`font-medium ${h.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>{h.title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ml-16">{h.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Novo Hábito</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <input type="text" value={newHabit.title} onChange={e => setNewHabit({ ...newHabit, title: e.target.value })} className="input-field" placeholder="Ex: Praticar gratidão" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea value={newHabit.description} onChange={e => setNewHabit({ ...newHabit, description: e.target.value })} className="input-field" rows={3} placeholder="Descreva o hábito..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={addHabit} className="btn-primary flex-1">Adicionar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default RelacionamentoPanel; 