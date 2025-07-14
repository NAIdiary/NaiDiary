import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Droplets, Calculator, Target, TrendingUp, Heart, Plus, Edit, Trash2 } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface HealthMetrics {
  height: number;
  weight: number;
  waterIntake: number;
  dailyWaterGoal: number;
  steps: number;
  stepGoal: number;
  calories: number;
  calorieGoal: number;
}

interface HealthTip {
  id: number;
  title: string;
  desc: string;
  color: string;
  text: string;
  descText: string;
}

const BodyPanel: React.FC = () => {
  const [metrics, setMetrics] = useState<HealthMetrics>({
    height: 165,
    weight: 60,
    waterIntake: 1500,
    dailyWaterGoal: 2000,
    steps: 7500,
    stepGoal: 10000,
    calories: 1800,
    calorieGoal: 2000,
  });

  const bmi = (metrics.weight / ((metrics.height / 100) ** 2)).toFixed(1);
  const waterPercentage = (metrics.waterIntake / metrics.dailyWaterGoal) * 100;
  const stepPercentage = (metrics.steps / metrics.stepGoal) * 100;
  const caloriePercentage = (metrics.calories / metrics.calorieGoal) * 100;

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Abaixo do peso', color: 'text-blue-600 dark:text-blue-400' };
    if (bmi < 25) return { status: 'Peso normal', color: 'text-green-600 dark:text-green-400' };
    if (bmi < 30) return { status: 'Sobrepeso', color: 'text-yellow-600 dark:text-yellow-400' };
    return { status: 'Obesidade', color: 'text-red-600 dark:text-red-400' };
  };

  const bmiStatus = getBMIStatus(parseFloat(bmi));

  const [healthTips, setHealthTips] = useState<HealthTip[]>([
    { id: 1, title: '💧 Hidratação', desc: 'Beba um copo d\'água agora mesmo! Mantenha uma garrafinha sempre por perto.', color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20', text: 'text-blue-800 dark:text-blue-200', descText: 'text-blue-700 dark:text-blue-300' },
    { id: 2, title: '🚶‍♀️ Movimento', desc: 'Que tal uma caminhada de 10 minutos? Seu corpo vai agradecer!', color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20', text: 'text-green-800 dark:text-green-200', descText: 'text-green-700 dark:text-green-300' },
    { id: 3, title: '🧘‍♀️ Respiração', desc: 'Respire fundo 5 vezes. Inspire calma, expire tensão.', color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20', text: 'text-purple-800 dark:text-purple-200', descText: 'text-purple-700 dark:text-purple-300' },
    { id: 4, title: '😴 Descanso', desc: 'Durma pelo menos 8 horas. Seu corpo se recupera durante o sono!', color: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20', text: 'text-pink-800 dark:text-pink-200', descText: 'text-pink-700 dark:text-pink-300' },
  ]);
  const [showAddTip, setShowAddTip] = useState(false);
  const [newTip, setNewTip] = useState<Omit<HealthTip, 'id'>>({ title: '', desc: '', color: 'from-blue-50 to-blue-100', text: 'text-blue-800', descText: 'text-blue-700' });
  const [editingTip, setEditingTip] = useState<HealthTip | null>(null);

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Corpo');

  useEffect(() => {
    if (conteudo) {
      setMetrics(conteudo.metrics || {height: 165, weight: 60, waterIntake: 1500, dailyWaterGoal: 2000, steps: 7500, stepGoal: 10000, calories: 1800, calorieGoal: 2000});
      setHealthTips(conteudo.healthTips || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ metrics, healthTips });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metrics, healthTips]);

  const addTip = () => {
    if (newTip.title && newTip.desc) {
      setHealthTips([...healthTips, { ...newTip, id: Date.now() }]);
      setNewTip({ title: '', desc: '', color: 'from-blue-50 to-blue-100', text: 'text-blue-800', descText: 'text-blue-700' });
      setShowAddTip(false);
    }
  };
  const deleteTip = (id: number) => setHealthTips(healthTips.filter((t: HealthTip) => t.id !== id));
  const startEditTip = (tip: HealthTip) => { setEditingTip(tip); setShowAddTip(false); };
  const saveEditTip = () => {
    if (editingTip) {
      setHealthTips(healthTips.map((t: HealthTip) => t.id === editingTip.id ? editingTip : t));
      setEditingTip(null);
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
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Corpo</h1>
            <p className="text-gray-600 dark:text-gray-400">Cuide da sua saúde com carinho 💚</p>
          </div>
        </div>
      </motion.div>

      {/* BMI Calculator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-5 h-5 text-green-600 dark:text-green-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Calculadora de IMC</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Altura (cm)
              </label>
              <input
                type="number"
                value={metrics.height}
                onChange={(e) => setMetrics({...metrics, height: parseFloat(e.target.value)})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Peso (kg)
              </label>
              <input
                type="number"
                value={metrics.weight}
                onChange={(e) => setMetrics({...metrics, weight: parseFloat(e.target.value)})}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-green-700 dark:text-green-300">{bmi}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Seu IMC</p>
              <p className={`font-medium ${bmiStatus.color}`}>{bmiStatus.status}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Daily Tracking */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Water Intake */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Hidratação</h3>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Hoje</span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {metrics.waterIntake}ml / {metrics.dailyWaterGoal}ml
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(waterPercentage, 100)}%` }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setMetrics({...metrics, waterIntake: metrics.waterIntake + 250})}
              className="btn-primary text-sm px-3 py-2 flex-1"
            >
              +250ml
            </button>
            <button
              onClick={() => setMetrics({...metrics, waterIntake: Math.max(0, metrics.waterIntake - 250)})}
              className="btn-secondary text-sm px-3 py-2"
            >
              -250ml
            </button>
          </div>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Passos</h3>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{metrics.steps.toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">de {metrics.stepGoal.toLocaleString()}</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(stepPercentage, 100)}%` }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
          </div>

          <p className="text-xs text-gray-500 text-center">
            {stepPercentage >= 100 ? '🎉 Meta alcançada!' : `${(100 - stepPercentage).toFixed(0)}% restante`}
          </p>
        </motion.div>

        {/* Calories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-gray-800 dark:text-gray-100">Calorias</h3>
          </div>
          
          <div className="text-center mb-4">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{metrics.calories}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">de {metrics.calorieGoal} kcal</p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-red-400 to-red-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(caloriePercentage, 100)}%` }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />
          </div>

          <p className="text-xs text-gray-500 text-center">
            {caloriePercentage >= 100 ? '✅ Meta alcançada!' : `${(caloriePercentage).toFixed(0)}% da meta`}
          </p>
        </motion.div>
      </div>

      {/* Health Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4 justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Dicas para Hoje</h2>
          </div>
          <button onClick={() => setShowAddTip(true)} className="btn-primary flex items-center gap-2 text-sm px-3 py-2"><Plus className="w-4 h-4" />Adicionar Dica</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {healthTips.map((tip) => (
            <div key={tip.id} className={`bg-gradient-to-r ${tip.color} p-4 rounded-xl relative`}>
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => startEditTip(tip)} className="p-1 text-gray-400 hover:text-primary-600"><Edit className="w-4 h-4" /></button>
                <button onClick={() => deleteTip(tip.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
              <h3 className={`font-medium mb-2 ${tip.text}`}>{tip.title}</h3>
              <p className={`text-sm ${tip.descText}`}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
      {/* Modal Add/Edit Tip */}
      {(showAddTip || editingTip) && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => { setShowAddTip(false); setEditingTip(null); }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">{editingTip ? 'Editar Dica' : 'Adicionar Dica'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input type="text" value={editingTip ? editingTip.title : newTip.title} onChange={e => editingTip ? setEditingTip({ ...editingTip, title: e.target.value }) : setNewTip({ ...newTip, title: e.target.value })} className="input-field" placeholder="Ex: 💧 Hidratação" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea value={editingTip ? editingTip.desc : newTip.desc} onChange={e => editingTip ? setEditingTip({ ...editingTip, desc: e.target.value }) : setNewTip({ ...newTip, desc: e.target.value })} className="input-field" rows={2} placeholder="Ex: Beba um copo d'água agora mesmo!" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Cartão</label>
                <select value={editingTip ? editingTip.color : newTip.color} onChange={e => editingTip ? setEditingTip({ ...editingTip, color: e.target.value }) : setNewTip({ ...newTip, color: e.target.value })} className="input-field">
                  <option value="from-blue-50 to-blue-100">Azul</option>
                  <option value="from-green-50 to-green-100">Verde</option>
                  <option value="from-purple-50 to-purple-100">Roxo</option>
                  <option value="from-pink-50 to-pink-100">Rosa</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowAddTip(false); setEditingTip(null); }} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={editingTip ? saveEditTip : addTip} className="btn-primary flex-1">{editingTip ? 'Salvar' : 'Adicionar'}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BodyPanel;