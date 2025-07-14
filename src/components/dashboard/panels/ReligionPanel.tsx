import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Edit, Trash2, Star, Moon, Sun, BookOpen } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface Prayer {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  answered: boolean;
  notes: string;
}

interface SpiritualPractice {
  id: string;
  name: string;
  description: string;
  frequency: string;
  lastPracticed: string;
  completed: boolean;
}

const ReligionPanel: React.FC = () => {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [practices, setPractices] = useState<SpiritualPractice[]>([]);
  
  const [showAddPrayer, setShowAddPrayer] = useState(false);
  const [showAddPractice, setShowAddPractice] = useState(false);
  const [editingPrayer, setEditingPrayer] = useState<Prayer | null>(null);
  const [editingPractice, setEditingPractice] = useState<SpiritualPractice | null>(null);

  const [newPrayer, setNewPrayer] = useState<Omit<Prayer, 'id' | 'date' | 'answered'>>({
    title: '',
    content: '',
    category: '',
    notes: '',
  });

  const [newPractice, setNewPractice] = useState<Omit<SpiritualPractice, 'id' | 'lastPracticed' | 'completed'>>({
    name: '',
    description: '',
    frequency: '',
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Religion');

  useEffect(() => {
    if (conteudo) {
      setPrayers(conteudo.prayers || []);
      setPractices(conteudo.practices || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ prayers, practices });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayers, practices]);

  const addPrayer = () => {
    if (newPrayer.title && newPrayer.content && newPrayer.category) {
      const prayer: Prayer = {
        id: Date.now().toString(),
        ...newPrayer,
        date: new Date().toISOString().split('T')[0],
        answered: false,
      };
      setPrayers([prayer, ...prayers]);
      setNewPrayer({
        title: '',
        content: '',
        category: '',
        notes: '',
      });
      setShowAddPrayer(false);
    }
  };

  const deletePrayer = (id: string) => {
    setPrayers(prayers.filter(prayer => prayer.id !== id));
  };

  const togglePrayerAnswered = (id: string) => {
    setPrayers(prayers.map(prayer => 
      prayer.id === id ? { ...prayer, answered: !prayer.answered } : prayer
    ));
  };

  const addPractice = () => {
    if (newPractice.name && newPractice.description && newPractice.frequency) {
      const practice: SpiritualPractice = {
        id: Date.now().toString(),
        ...newPractice,
        lastPracticed: new Date().toISOString().split('T')[0],
        completed: false,
      };
      setPractices([practice, ...practices]);
      setNewPractice({
        name: '',
        description: '',
        frequency: '',
      });
      setShowAddPractice(false);
    }
  };

  const deletePractice = (id: string) => {
    setPractices(practices.filter(practice => practice.id !== id));
  };

  const togglePracticeCompleted = (id: string) => {
    setPractices(practices.map(practice => 
      practice.id === id ? { ...practice, completed: !practice.completed } : practice
    ));
  };

  const prayerCategories = [
    'Gratidão', 'Cura', 'Proteção', 'Sabedoria', 'Paz', 
    'Amor', 'Perdão', 'Força', 'Fé', 'Esperança'
  ];

  const practiceFrequencies = [
    'Diariamente', 'Semanalmente', 'Mensalmente', 'Ocasionalmente'
  ];

  const dailyVerses = [
    {
      verse: "Porque para Deus nada é impossível.",
      reference: "Lucas 1:37"
    },
    {
      verse: "Tudo posso naquele que me fortalece.",
      reference: "Filipenses 4:13"
    },
    {
      verse: "O Senhor é meu pastor, nada me faltará.",
      reference: "Salmos 23:1"
    },
    {
      verse: "Confia no Senhor de todo o teu coração.",
      reference: "Provérbios 3:5"
    }
  ];

  const todayVerse = dailyVerses[new Date().getDate() % dailyVerses.length];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Espiritualidade</h1>
            <p className="text-gray-600 dark:text-gray-400">Conecte-se com sua fé e espiritualidade 🙏</p>
          </div>
        </div>
      </motion.div>

      {/* Daily Verse */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-purple-600" />
          <h2 className="text-lg font-semibold text-purple-800">Versículo do Dia</h2>
        </div>
        <div className="text-center">
          <p className="text-lg text-purple-700 font-medium italic mb-2">
            "{todayVerse.verse}"
          </p>
          <p className="text-sm text-purple-600">
            {todayVerse.reference}
          </p>
        </div>
      </motion.div>

      {/* Prayers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Suas Orações</h2>
          <button
            onClick={() => setShowAddPrayer(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Oração
          </button>
        </div>
        
        {prayers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma oração registrada ainda</p>
            <p className="text-sm">Clique em "Nova Oração" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {prayers.map((prayer, index) => (
              <motion.div
                key={prayer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                  prayer.answered 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-purple-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${prayer.answered ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {prayer.title}
                      </h3>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {prayer.category}
                      </span>
                    </div>
                    <p className={`text-sm ${prayer.answered ? 'text-green-600' : 'text-gray-700'} mb-2`}>
                      {prayer.content}
                    </p>
                    {prayer.notes && (
                      <p className="text-xs text-gray-600 dark:text-gray-400">{prayer.notes}</p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => togglePrayerAnswered(prayer.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        prayer.answered 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-purple-300 hover:border-green-400'
                      }`}
                    >
                      {prayer.answered && <Star className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deletePrayer(prayer.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(prayer.date).toLocaleDateString('pt-BR')}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Spiritual Practices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Práticas Espirituais</h2>
          <button
            onClick={() => setShowAddPractice(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Prática
          </button>
        </div>
        
        {practices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Moon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma prática espiritual registrada ainda</p>
            <p className="text-sm">Clique em "Nova Prática" para começar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {practices.map((practice, index) => (
              <motion.div
                key={practice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                  practice.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-indigo-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${practice.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {practice.name}
                      </h3>
                      <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                        {practice.frequency}
                      </span>
                    </div>
                    <p className={`text-sm ${practice.completed ? 'text-green-600' : 'text-gray-700'}`}>
                      {practice.description}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => togglePracticeCompleted(practice.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        practice.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-indigo-300 hover:border-green-400'
                      }`}
                    >
                      {practice.completed && <Star className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deletePractice(practice.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Última prática: {new Date(practice.lastPracticed).toLocaleDateString('pt-BR')}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Spiritual Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas Espirituais</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">🌅 Meditação Matinal</h3>
            <p className="text-sm text-purple-700">
              Comece o dia com 10 minutos de meditação e oração para conectar-se com o divino.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl">
            <h3 className="font-medium text-indigo-800 mb-2">📖 Leitura Sagrada</h3>
            <p className="text-sm text-indigo-700">
              Dedique tempo diário para ler e refletir sobre textos sagrados ou inspiradores.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">🙏 Gratidão</h3>
            <p className="text-sm text-green-700">
              Agradeça pelas bênçãos diárias. A gratidão abre portas para mais graças.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-2">🌟 Fé</h3>
            <p className="text-sm text-yellow-700">
              Mantenha a fé mesmo nos momentos difíceis. Tudo tem um propósito divino.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add Prayer Modal */}
      {showAddPrayer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddPrayer(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Oração</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Oração</label>
                <input
                  type="text"
                  value={newPrayer.title}
                  onChange={(e) => setNewPrayer({...newPrayer, title: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Cura para minha família"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={newPrayer.category}
                  onChange={(e) => setNewPrayer({...newPrayer, category: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione uma categoria</option>
                  {prayerCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sua Oração</label>
                <textarea
                  value={newPrayer.content}
                  onChange={(e) => setNewPrayer({...newPrayer, content: e.target.value})}
                  className="input-field"
                  rows={4}
                  placeholder="Escreva sua oração aqui..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
                <textarea
                  value={newPrayer.notes}
                  onChange={(e) => setNewPrayer({...newPrayer, notes: e.target.value})}
                  className="input-field"
                  rows={2}
                  placeholder="Reflexões ou sentimentos..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddPrayer(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addPrayer}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Practice Modal */}
      {showAddPractice && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddPractice(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Prática Espiritual</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Prática</label>
                <input
                  type="text"
                  value={newPractice.name}
                  onChange={(e) => setNewPractice({...newPractice, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Meditação matinal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequência</label>
                <select
                  value={newPractice.frequency}
                  onChange={(e) => setNewPractice({...newPractice, frequency: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione a frequência</option>
                  {practiceFrequencies.map(frequency => (
                    <option key={frequency} value={frequency}>{frequency}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={newPractice.description}
                  onChange={(e) => setNewPractice({...newPractice, description: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Descreva como realizar esta prática..."
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddPractice(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addPractice}
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

export default ReligionPanel;