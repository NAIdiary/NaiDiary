import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Plus, Edit, Trash2, Star, Moon, Sun, Eye, PenLine } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface Manifestation {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  affirmations: string[];
}

const ManifestationPanel: React.FC = () => {
  const [manifestations, setManifestations] = useState<Manifestation[]>([]);
  const [showAddManifestation, setShowAddManifestation] = useState(false);
  const [editingManifestation, setEditingManifestation] = useState<Manifestation | null>(null);
  
  const [newManifestation, setNewManifestation] = useState<Omit<Manifestation, 'id' | 'date' | 'completed'>>({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    affirmations: [''],
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Manifestacao');

  useEffect(() => {
    if (conteudo) {
      setManifestations(conteudo.manifestations || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ manifestations });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifestations]);

  const addManifestation = () => {
    if (newManifestation.title && newManifestation.description && newManifestation.category) {
      const manifestation: Manifestation = {
        id: Date.now().toString(),
        ...newManifestation,
        date: new Date().toISOString().split('T')[0],
        completed: false,
        affirmations: newManifestation.affirmations.filter(aff => aff.trim() !== ''),
      };
      setManifestations([manifestation, ...manifestations]);
      setNewManifestation({
        title: '',
        description: '',
        category: '',
        priority: 'medium',
        affirmations: [''],
      });
      setShowAddManifestation(false);
    }
  };

  const deleteManifestation = (id: string) => {
    setManifestations(manifestations.filter(manifestation => manifestation.id !== id));
  };

  const toggleManifestationCompletion = (id: string) => {
    setManifestations(manifestations.map(manifestation => 
      manifestation.id === id ? { ...manifestation, completed: !manifestation.completed } : manifestation
    ));
  };

  const categories = [
    'Amor', 'Carreira', 'Saúde', 'Finanças', 'Relacionamentos', 
    'Criatividade', 'Espiritualidade', 'Viagens', 'Educação', 'Casa'
  ];

  const priorityColors = {
    high: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30',
    medium: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30',
    low: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30',
  };

  const priorityLabels = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
  };

  const dailyAffirmations = [
    "Eu sou merecedora de tudo que desejo",
    "O universo conspira a meu favor",
    "Eu atraio abundância e prosperidade",
    "Sou uma mulher poderosa e capaz",
    "Meus sonhos se manifestam com facilidade",
    "Eu sou amada e valorizada",
    "Minha energia atrai o que é melhor para mim",
    "Eu confio no processo da vida"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Manifestação</h1>
            <p className="text-gray-600 dark:text-gray-400">Atraia seus desejos com intenção e fé ✨</p>
          </div>
        </div>
      </motion.div>

      {/* Daily Affirmations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700"
      >
        <div className="flex items-center gap-3 mb-4">
          <Sun className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Afirmação do Dia</h2>
        </div>
        <div className="text-center">
          <p className="text-lg text-purple-700 dark:text-purple-300 font-medium italic">
            "{dailyAffirmations[new Date().getDate() % dailyAffirmations.length]}"
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-2">
            Repita esta afirmação 3 vezes ao acordar e antes de dormir
          </p>
        </div>
      </motion.div>

      {/* Manifestations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Suas Manifestações</h2>
          <button
            onClick={() => setShowAddManifestation(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Manifestação
          </button>
        </div>
        
        {manifestations.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p>Nenhuma manifestação criada ainda</p>
            <p className="text-sm">Clique em "Nova Manifestação" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {manifestations.map((manifestation, index) => (
              <motion.div
                key={manifestation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                  manifestation.completed 
                    ? 'border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20' 
                    : 'border-purple-200 dark:border-purple-700 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${manifestation.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {manifestation.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[manifestation.priority]}`}>
                        {priorityLabels[manifestation.priority]}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{manifestation.category}</p>
                    <p className={`text-sm ${manifestation.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
                      {manifestation.description}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => toggleManifestationCompletion(manifestation.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        manifestation.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-purple-300 dark:border-purple-600 hover:border-green-400 dark:hover:border-green-500'
                      }`}
                    >
                      {manifestation.completed && <Star className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => deleteManifestation(manifestation.id)}
                      className="p-1 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {manifestation.affirmations.length > 0 && (
                  <div className="mb-3">
                    <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Afirmações:</p>
                    <div className="space-y-1">
                      {manifestation.affirmations.map((affirmation, affIndex) => (
                        <p key={affIndex} className="text-xs text-purple-600 dark:text-purple-400 italic">
                          • {affirmation}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Criada em: {new Date(manifestation.date).toLocaleDateString('pt-BR')}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Manifestation Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas de Manifestação</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🌙 Lua Nova</h3>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Escreva seus desejos na lua nova. É o momento ideal para começar novas manifestações.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-xl">
            <h3 className="font-medium text-pink-800 dark:text-pink-200 mb-2">💭 Visualização</h3>
            <p className="text-sm text-pink-700 dark:text-pink-300">
              Feche os olhos e visualize seu desejo como se já fosse realidade. Sinta a emoção.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">📝 Gratidão</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Agradeça pelo que já tem. A gratidão abre portas para mais abundância.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">🌟 Fé</h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Confie no processo. Acredite que o universo está trabalhando a seu favor.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Manifestation Channels */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Canais de Manifestação e Desenvolvimento Pessoal</h2>
        
        {/* Personal Development Channels */}
        <div className="mb-6">
          <h3 className="text-md font-medium text-purple-800 dark:text-purple-200 mb-3">✨ Canais sobre manifestação e desenvolvimento pessoal:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="https://www.youtube.com/@SUKI" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Suki</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@LuaRicco" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Lua Ricco</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@JuliaBirth" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Julia Birth</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@LiliHina" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Lili Hina</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@MarianaSantos" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Mariana Santos</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@SamiaNeubauer" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Samia Caroline Neubauer</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@LETICIADIRKS" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Leticia Dirks</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@raiannekamiya" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Raianne Kamiya</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@Thewizardliz" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">The Wizard Liz</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@AmandaMarques" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Amanda Marques</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@ViviRibeiro" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Vivi Ribeiro</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@NandaSilveira" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-purple-200 dark:border-purple-600 hover:border-purple-300 dark:hover:border-purple-500">
              <div className="font-medium text-purple-800 dark:text-purple-200">Nanda Silveira</div>
              <div className="text-xs text-purple-600 dark:text-purple-400">🔗 YouTube</div>
            </a>
          </div>
        </div>

        {/* Subliminal Channels */}
        <div>
          <h3 className="text-md font-medium text-purple-800 dark:text-purple-200 mb-3">🎧 Canais confiáveis de subliminares:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            <a href="https://www.youtube.com/@SpiritualBratz444" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">Spiritual Bratz 444</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@iwantitigotit" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">I Want It, I Got It</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@minajsubz" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">Minaj ♰</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@VickSouza" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">Vick Souza</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@fefe111" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">Fefe111</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@LisaAlexandra" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">Lisa Alexandra</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
            
            <a href="https://www.youtube.com/@athena111" target="_blank" rel="noopener noreferrer" className="block p-3 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-lg hover:shadow-md transition-all duration-200 border border-pink-200 dark:border-pink-600 hover:border-pink-300 dark:hover:border-pink-500">
              <div className="font-medium text-pink-800 dark:text-pink-200">Athena111 ♰</div>
              <div className="text-xs text-pink-600 dark:text-pink-400">🔗 YouTube</div>
            </a>
          </div>
        </div>
      </motion.div>

      {/* Law of Assumption Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-rose-900/20 border-purple-200 dark:border-purple-700"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-purple-800 dark:text-purple-200">Lei da Suposição</h2>
            <p className="text-purple-600 dark:text-purple-400">O poder de assumir que já temos o que desejamos ✨</p>
          </div>
        </div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-100 dark:border-purple-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">O que é a Lei da Suposição?</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            A Lei da Suposição é um princípio metafísico poderoso que afirma que tudo o que assumimos como verdadeiro com convicção acaba se manifestando em nossa realidade. 
            É a arte de viver como se nossos desejos já fossem realidade, permitindo que o universo conspire para torná-los verdade.
          </p>
        </motion.div>

        {/* Creator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-100 dark:border-purple-700"
        >
          <div className="flex items-center gap-3 mb-3">
            <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Quem criou?</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            <strong className="text-purple-800 dark:text-purple-200">Neville Goddard</strong>, o místico e autor que popularizou a Lei da Suposição, ensinava que "aquilo que você sente ser verdade, se torna sua realidade". 
            Suas obras revolucionaram a forma como entendemos o poder da mente e da imaginação na criação da nossa realidade.
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4 border-l-4 border-purple-400 dark:border-purple-500">
            <p className="text-purple-800 dark:text-purple-200 italic font-medium">
              "Se você pode imaginar, você pode ter. Se você pode sentir, você pode ser."
            </p>
          </div>
        </motion.div>

        {/* Methods */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-100 dark:border-purple-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Métodos de Prática</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Visualização antes de dormir</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use a técnica do estado de sono para programar sua mente</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Script</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Escreva como se já fosse realidade</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Afirmações "Eu sou..."</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Use frases poderosas no presente</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Sentimento do desejo realizado</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sinta como se já tivesse recebido</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Persistência mental</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Não duvide, mantenha a fé</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-medium text-purple-800 dark:text-purple-200">Hábito diário</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pratique todos os dias</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Practical Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 mb-6 border border-purple-100 dark:border-purple-700"
        >
          <div className="flex items-center gap-3 mb-4">
            <PenLine className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200">Dicas Práticas</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-600">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🌟 Use todos os sentidos</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Na visualização, envolva visão, audição, tato, olfato e paladar para criar uma experiência mais realista.
              </p>
            </div>
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-600">
              <h4 className="font-medium text-pink-800 dark:text-pink-200 mb-2">💫 Faça disso um hábito</h4>
              <p className="text-sm text-pink-700 dark:text-pink-300">
                Dedique alguns minutos todos os dias para praticar a Lei da Suposição. A consistência é a chave.
              </p>
            </div>
            <div className="bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 p-4 rounded-lg border border-rose-200 dark:border-rose-600">
              <h4 className="font-medium text-rose-800 dark:text-rose-200 mb-2">✨ Afaste as dúvidas</h4>
              <p className="text-sm text-rose-700 dark:text-rose-300">
                Use frases de poder como "Se eu posso imaginar, eu posso ter" para manter a fé forte.
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-600">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">🌙 Momento ideal</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Pratique antes de dormir, quando sua mente está mais receptiva e aberta à programação.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-purple-300 dark:border-purple-600"
        >
          <div className="text-center">
            <Sparkles className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-3">Lembre-se sempre:</h3>
            <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
              A realidade externa é um reflexo do mundo interno. O que assumimos como verdade, acaba por tomar forma. 
              Você tem o poder de criar sua realidade através da força da sua imaginação e da convicção do seu coração.
            </p>
            <div className="mt-4 bg-white/50 dark:bg-gray-800/50 rounded-lg p-3 border border-purple-200 dark:border-purple-600">
              <p className="text-purple-800 dark:text-purple-200 font-medium italic">
                "Assuma o sentimento do seu desejo realizado e observe como o universo conspira a seu favor"
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Add Manifestation Modal */}
      {showAddManifestation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddManifestation(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Manifestação</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">O que você deseja manifestar?</label>
                <input
                  type="text"
                  value={newManifestation.title}
                  onChange={(e) => setNewManifestation({...newManifestation, title: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Encontrar o amor da minha vida"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select
                  value={newManifestation.category}
                  onChange={(e) => setNewManifestation({...newManifestation, category: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição detalhada</label>
                <textarea
                  value={newManifestation.description}
                  onChange={(e) => setNewManifestation({...newManifestation, description: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Descreva como seria ter esse desejo realizado..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Prioridade</label>
                <select
                  value={newManifestation.priority}
                  onChange={(e) => setNewManifestation({...newManifestation, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  className="input-field"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Afirmações (opcional)</label>
                {newManifestation.affirmations.map((affirmation, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={affirmation}
                      onChange={(e) => {
                        const affirmations = [...newManifestation.affirmations];
                        affirmations[index] = e.target.value;
                        setNewManifestation({...newManifestation, affirmations});
                      }}
                      className="input-field flex-1"
                      placeholder="Ex: Eu mereço encontrar o amor verdadeiro"
                    />
                    {newManifestation.affirmations.length > 1 && (
                      <button
                        onClick={() => {
                          const affirmations = newManifestation.affirmations.filter((_, i) => i !== index);
                          setNewManifestation({...newManifestation, affirmations});
                        }}
                        className="px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewManifestation({...newManifestation, affirmations: [...newManifestation.affirmations, '']})}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Afirmação
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddManifestation(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addManifestation}
                className="btn-primary flex-1"
              >
                Manifestar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ManifestationPanel;