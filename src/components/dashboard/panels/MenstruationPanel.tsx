import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Edit, Trash2, Heart, Droplets, Activity } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface PeriodRecord {
  id: string;
  startDate: string;
  endDate: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  notes: string;
}

interface Symptom {
  id: string;
  name: string;
  intensity: 'mild' | 'moderate' | 'severe';
  date: string;
  notes: string;
}

const MenstruationPanel: React.FC = () => {
  const [periodRecords, setPeriodRecords] = useState<PeriodRecord[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  
  const [showAddPeriod, setShowAddPeriod] = useState(false);
  const [showAddSymptom, setShowAddSymptom] = useState(false);
  const [editingPeriod, setEditingPeriod] = useState<PeriodRecord | null>(null);
  const [editingSymptom, setEditingSymptom] = useState<Symptom | null>(null);

  const [newPeriod, setNewPeriod] = useState<Omit<PeriodRecord, 'id'>>({
    startDate: '',
    endDate: '',
    flow: 'medium',
    symptoms: [''],
    notes: '',
  });

  const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id' | 'date'>>({
    name: '',
    intensity: 'moderate',
    notes: '',
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Menstruation');

  useEffect(() => {
    if (conteudo) {
      setPeriodRecords(conteudo.periodRecords || []);
      setSymptoms(conteudo.symptoms || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ periodRecords, symptoms });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodRecords, symptoms]);

  const addPeriodRecord = () => {
    if (newPeriod.startDate && newPeriod.endDate) {
      const period: PeriodRecord = {
        id: Date.now().toString(),
        ...newPeriod,
        symptoms: newPeriod.symptoms.filter(symptom => symptom.trim() !== ''),
      };
      setPeriodRecords([period, ...periodRecords]);
      setNewPeriod({
        startDate: '',
        endDate: '',
        flow: 'medium',
        symptoms: [''],
        notes: '',
      });
      setShowAddPeriod(false);
    }
  };

  const deletePeriodRecord = (id: string) => {
    setPeriodRecords(periodRecords.filter(record => record.id !== id));
  };

  const addSymptom = () => {
    if (newSymptom.name) {
      const symptom: Symptom = {
        id: Date.now().toString(),
        ...newSymptom,
        date: new Date().toISOString().split('T')[0],
      };
      setSymptoms([symptom, ...symptoms]);
      setNewSymptom({
        name: '',
        intensity: 'moderate',
        notes: '',
      });
      setShowAddSymptom(false);
    }
  };

  const deleteSymptom = (id: string) => {
    setSymptoms(symptoms.filter(symptom => symptom.id !== id));
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'medium': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      case 'heavy': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const getFlowLabel = (flow: string) => {
    switch (flow) {
      case 'light': return 'Leve';
      case 'medium': return 'Moderado';
      case 'heavy': return 'Intenso';
      default: return 'Moderado';
    }
  };

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'mild': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'severe': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case 'mild': return 'Leve';
      case 'moderate': return 'Moderado';
      case 'severe': return 'Intenso';
      default: return 'Moderado';
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'calm': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
      case 'irritable': return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'sad': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  const commonSymptoms = [
    'Cólicas', 'Fadiga', 'Dores de cabeça', 'Mudanças de humor', 
    'Inchaço', 'Sensibilidade nos seios', 'Acne', 'Dores nas costas',
    'Náusea', 'Tontura', 'Ansiedade', 'Insônia'
  ];

  const calculateCycleLength = () => {
    if (periodRecords.length < 2) return null;
    
    const sortedRecords = [...periodRecords].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    
    const lastTwo = sortedRecords.slice(-2);
    const daysDiff = Math.round(
      (new Date(lastTwo[1].startDate).getTime() - new Date(lastTwo[0].startDate).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    
    return daysDiff;
  };

  const cycleLength = calculateCycleLength();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Ciclo Menstrual</h1>
            <p className="text-gray-600 dark:text-gray-400">Acompanhe seu ciclo e sintomas 💕</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Registros</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{periodRecords.length}</p>
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
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ciclo Médio</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {cycleLength ? `${cycleLength} dias` : 'N/A'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 rounded-lg flex items-center justify-center">
              <Droplets className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sintomas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{symptoms.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Period Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Registros Menstruais</h2>
          <button
            onClick={() => setShowAddPeriod(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Registro
          </button>
        </div>
        
        {periodRecords.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum registro menstrual ainda</p>
            <p className="text-sm">Clique em "Adicionar Registro" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {periodRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-pink-200 bg-pink-50 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                        {new Date(record.startDate).toLocaleDateString('pt-BR')} - {new Date(record.endDate).toLocaleDateString('pt-BR')}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getFlowColor(record.flow)}`}>
                        {getFlowLabel(record.flow)}
                      </span>
                    </div>
                    {record.notes && (
                      <p className="text-sm text-gray-700 mb-2">{record.notes}</p>
                    )}
                    {record.symptoms.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {record.symptoms.map((symptom, symptomIndex) => (
                          <span
                            key={symptomIndex}
                            className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full"
                          >
                            {symptom}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => deletePeriodRecord(record.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Symptoms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Sintomas</h2>
          <button
            onClick={() => setShowAddSymptom(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Sintoma
          </button>
        </div>
        
        {symptoms.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum sintoma registrado ainda</p>
            <p className="text-sm">Clique em "Adicionar Sintoma" para começar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {symptoms.map((symptom, index) => (
              <motion.div
                key={symptom.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-purple-200 bg-purple-50 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{symptom.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getIntensityColor(symptom.intensity)}`}>
                        {getIntensityLabel(symptom.intensity)}
                      </span>
                    </div>
                    {symptom.notes && (
                      <p className="text-sm text-gray-700">{symptom.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteSymptom(symptom.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(symptom.date).toLocaleDateString('pt-BR')}
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
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas para o Ciclo</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl">
            <h3 className="font-medium text-pink-800 mb-2">🌿 Chás Calmantes</h3>
            <p className="text-sm text-pink-700">
              Chá de camomila, hortelã ou gengibre podem ajudar com cólicas e desconforto.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">🧘‍♀️ Exercícios Leves</h3>
            <p className="text-sm text-purple-700">
              Yoga, alongamento ou caminhada leve podem aliviar sintomas e melhorar o humor.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">💧 Hidratação</h3>
            <p className="text-sm text-blue-700">
              Beba muita água para reduzir inchaço e manter o corpo hidratado.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">😴 Descanso</h3>
            <p className="text-sm text-green-700">
              Ouça seu corpo e descanse quando necessário. O sono é essencial.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add Period Modal */}
      {showAddPeriod && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddPeriod(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Adicionar Registro Menstrual</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Início</label>
                <input
                  type="date"
                  value={newPeriod.startDate}
                  onChange={(e) => setNewPeriod({...newPeriod, startDate: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data de Fim</label>
                <input
                  type="date"
                  value={newPeriod.endDate}
                  onChange={(e) => setNewPeriod({...newPeriod, endDate: e.target.value})}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fluxo</label>
                <select
                  value={newPeriod.flow}
                  onChange={(e) => setNewPeriod({...newPeriod, flow: e.target.value as 'light' | 'medium' | 'heavy'})}
                  className="input-field"
                >
                  <option value="light">Leve</option>
                  <option value="medium">Moderado</option>
                  <option value="heavy">Intenso</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sintomas (opcional)</label>
                {newPeriod.symptoms.map((symptom, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select
                      value={symptom}
                      onChange={(e) => {
                        const symptoms = [...newPeriod.symptoms];
                        symptoms[index] = e.target.value;
                        setNewPeriod({...newPeriod, symptoms});
                      }}
                      className="input-field flex-1"
                    >
                      <option value="">Selecione um sintoma</option>
                      {commonSymptoms.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {newPeriod.symptoms.length > 1 && (
                      <button
                        onClick={() => {
                          const symptoms = newPeriod.symptoms.filter((_, i) => i !== index);
                          setNewPeriod({...newPeriod, symptoms});
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewPeriod({...newPeriod, symptoms: [...newPeriod.symptoms, '']})}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Sintoma
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
                <textarea
                  value={newPeriod.notes}
                  onChange={(e) => setNewPeriod({...newPeriod, notes: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Como você se sentiu durante esse período..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddPeriod(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addPeriodRecord}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Symptom Modal */}
      {showAddSymptom && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddSymptom(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Adicionar Sintoma</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sintoma</label>
                <select
                  value={newSymptom.name}
                  onChange={(e) => setNewSymptom({...newSymptom, name: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione um sintoma</option>
                  {commonSymptoms.map(symptom => (
                    <option key={symptom} value={symptom}>{symptom}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intensidade</label>
                <select
                  value={newSymptom.intensity}
                  onChange={(e) => setNewSymptom({...newSymptom, intensity: e.target.value as 'mild' | 'moderate' | 'severe'})}
                  className="input-field"
                >
                  <option value="mild">Leve</option>
                  <option value="moderate">Moderado</option>
                  <option value="severe">Intenso</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
                <textarea
                  value={newSymptom.notes}
                  onChange={(e) => setNewSymptom({...newSymptom, notes: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Descreva como está se sentindo..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddSymptom(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addSymptom}
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

export default MenstruationPanel;