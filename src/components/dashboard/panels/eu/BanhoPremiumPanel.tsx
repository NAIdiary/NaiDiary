import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bath, ArrowLeft, CheckCircle, Circle, Music, Sparkles, Droplets, Heart, Plus } from 'lucide-react';

interface BanhoStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ComponentType<any>;
}

const BanhoPremiumPanel: React.FC = () => {
  const [steps, setSteps] = useState<BanhoStep[]>([
    {
      id: '1',
      title: 'Prepare o ambiente',
      description: 'Deixe o banheiro limpo, acenda uma vela aromática e coloque uma música suave.',
      completed: false,
      icon: Sparkles
    },
    {
      id: '2',
      title: 'Banho de imersão ou chuveiro relaxante',
      description: 'Use água morna, sinta o relaxamento e respire fundo.',
      completed: false,
      icon: Droplets
    },
    {
      id: '3',
      title: 'Óleos e sais de banho',
      description: 'Adicione óleos essenciais (lavanda, camomila, alecrim) ou sais para potencializar o relaxamento.',
      completed: false,
      icon: Heart
    },
    {
      id: '4',
      title: 'Esfoliação suave',
      description: 'Use um esfoliante natural para renovar a pele (açúcar + óleo de coco).',
      completed: false,
      icon: Sparkles
    },
    {
      id: '5',
      title: 'Hidratação pós-banho',
      description: 'Aplique um hidratante corporal ou óleo vegetal com movimentos circulares.',
      completed: false,
      icon: Droplets
    },
    {
      id: '6',
      title: 'Momento de relaxamento',
      description: 'Vista um roupão macio, deite-se e aproveite o pós-banho com chá ou meditação.',
      completed: false,
      icon: Music
    }
  ]);

  const [showAddStep, setShowAddStep] = useState(false);
  const [newStep, setNewStep] = useState({ title: '', description: '' });

  const toggleStep = (id: string) => {
    setSteps(steps.map(step => step.id === id ? { ...step, completed: !step.completed } : step));
  };

  const addStep = () => {
    if (newStep.title && newStep.description) {
      setSteps([
        ...steps,
        {
          id: Date.now().toString(),
          title: newStep.title,
          description: newStep.description,
          completed: false,
          icon: Sparkles
        }
      ]);
      setNewStep({ title: '', description: '' });
      setShowAddStep(false);
    }
  };

  const aromas = [
    { name: 'Lavanda', desc: 'Calmante, relaxante e ajuda no sono.' },
    { name: 'Alecrim', desc: 'Revigorante, estimula a energia e o foco.' },
    { name: 'Camomila', desc: 'Suaviza a pele e acalma a mente.' },
    { name: 'Ylang-Ylang', desc: 'Aumenta a autoestima e traz sensação de prazer.' }
  ];

  const playlists = [
    { name: 'Banho Relax', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3PIPIT6lEg5' },
    { name: 'Spa em Casa', url: 'https://open.spotify.com/playlist/37i9dQZF1DX7YCknf2jT6s' },
    { name: 'Chill Vibes', url: 'https://open.spotify.com/playlist/37i9dQZF1DX889U0CL85jj' }
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <Link to="/eu" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <Bath className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Banho Premium</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Passo a passo para um banho relaxante, com óleos, sal, aromas e cuidados especiais</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ritual de Banho Premium</h2>
          <button onClick={() => setShowAddStep(true)} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>
        <div className="space-y-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * idx }}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 ${step.completed ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-pink-200'}`}
              >
                <button onClick={() => toggleStep(step.id)} className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${step.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'}`}>
                  {step.completed ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
                <div className="w-8 h-8 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg flex items-center justify-center">
                  <Icon className="w-4 h-4 text-pink-600" />
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${step.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Aromas e óleos para o banho</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {aromas.map((aroma, idx) => (
            <div key={aroma.name} className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl">
              <h3 className="font-medium text-pink-700 dark:text-pink-300 mb-1">{aroma.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{aroma.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Playlists para relaxar</h2>
        <ul className="space-y-2">
          {playlists.map((playlist) => (
            <li key={playlist.name}>
              <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 dark:text-pink-400 hover:underline">
                <Music className="w-4 h-4" />
                {playlist.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
      {showAddStep && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddStep(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Etapa</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <input type="text" value={newStep.title} onChange={e => setNewStep({ ...newStep, title: e.target.value })} className="input-field" placeholder="Ex: Banho de ervas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea value={newStep.description} onChange={e => setNewStep({ ...newStep, description: e.target.value })} className="input-field" rows={3} placeholder="Descreva a etapa..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAddStep(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={addStep} className="btn-primary flex-1">Adicionar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BanhoPremiumPanel; 