import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Plus, Edit, Trash2, Smile, Frown, Meh } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface EmotionalEntry {
  id: string;
  content: string;
  mood: 'happy' | 'sad' | 'neutral' | 'angry' | 'anxious';
  date: string;
  isPrivate: boolean;
  tags: string[];
}

const EmotionalTrashPanel: React.FC = () => {
  const [entries, setEntries] = useState<EmotionalEntry[]>([]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [editingEntry, setEditingEntry] = useState<EmotionalEntry | null>(null);
  const [newEntry, setNewEntry] = useState<Omit<EmotionalEntry, 'id' | 'date'>>({
    content: '',
    mood: 'neutral',
    isPrivate: false,
    tags: [''],
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('EmotionalTrash');

  useEffect(() => {
    if (conteudo) {
      setEntries(conteudo.entries || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ entries });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entries]);

  const addEntry = () => {
    if (newEntry.content.trim()) {
      const entry: EmotionalEntry = {
        id: Date.now().toString(),
        ...newEntry,
        date: new Date().toISOString().split('T')[0],
        tags: newEntry.tags.filter(tag => tag.trim() !== ''),
      };
      setEntries([entry, ...entries]);
      setNewEntry({
        content: '',
        mood: 'neutral',
        isPrivate: false,
        tags: [''],
      });
      setShowAddEntry(false);
    }
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const startEditEntry = (entry: EmotionalEntry) => {
    setEditingEntry(entry);
    setShowAddEntry(false);
  };

  const saveEditEntry = () => {
    if (editingEntry && editingEntry.content.trim()) {
      setEntries(entries.map(entry => 
        entry.id === editingEntry.id ? editingEntry : entry
      ));
      setEditingEntry(null);
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-5 h-5 text-green-500" />;
      case 'sad': return <Frown className="w-5 h-5 text-blue-500" />;
      case 'angry': return <Frown className="w-5 h-5 text-red-500" />;
      case 'anxious': return <Meh className="w-5 h-5 text-yellow-500" />;
      default: return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'happy': return 'from-green-400 to-green-600';
      case 'sad': return 'from-blue-400 to-blue-600';
      case 'angry': return 'from-red-400 to-red-600';
      case 'anxious': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getMoodLabel = (mood: string) => {
    switch (mood) {
      case 'happy': return 'Feliz';
      case 'sad': return 'Triste';
      case 'angry': return 'Irritada';
      case 'anxious': return 'Ansiosa';
      default: return 'Neutra';
    }
  };

  const moodOptions = [
    { value: 'happy', label: 'Feliz', icon: '😊' },
    { value: 'sad', label: 'Triste', icon: '😢' },
    { value: 'angry', label: 'Irritada', icon: '😠' },
    { value: 'anxious', label: 'Ansiosa', icon: '😰' },
    { value: 'neutral', label: 'Neutra', icon: '😐' },
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
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-600 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800">Lixeira Emocional</h1>
            <p className="text-gray-600">Desabafe e liberte seus sentimentos 💕</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Add */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Como você está se sentindo?</h2>
          <button
            onClick={() => setShowAddEntry(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Desabafar
          </button>
        </div>
        
        {entries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum desabafo ainda</p>
            <p className="text-sm">Clique em "Desabafar" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                  entry.isPrivate ? 'border-purple-200 bg-purple-50' : 'border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getMoodIcon(entry.mood)}
                    <div>
                      <span className="text-sm font-medium text-gray-700">
                        {getMoodLabel(entry.mood)}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {entry.isPrivate && (
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        Privado
                      </span>
                    )}
                    <button
                      onClick={() => startEditEntry(entry)}
                      className="p-1 text-gray-400 hover:text-primary-600"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-3 leading-relaxed">{entry.content}</p>
                
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Mood Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Rastreador de Humor</h2>
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((mood) => {
            const count = entries.filter(entry => entry.mood === mood.value).length;
            return (
              <div
                key={mood.value}
                className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="text-2xl mb-2">{mood.icon}</div>
                <p className="text-xs font-medium text-gray-700">{mood.label}</p>
                <p className="text-xs text-gray-500">{count} vez{count !== 1 ? 'es' : ''}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Emotional Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dicas Emocionais</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">💭 Respiração</h3>
            <p className="text-sm text-blue-700">
              Respire fundo 4 vezes: inspire por 4 segundos, segure por 4, expire por 4. Repita até se acalmar.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">🎵 Música</h3>
            <p className="text-sm text-green-700">
              Ouça suas músicas favoritas. A música tem o poder de alterar nosso humor instantaneamente.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">📝 Gratidão</h3>
            <p className="text-sm text-purple-700">
              Escreva 3 coisas pelas quais você é grata hoje. A gratidão transforma nossa perspectiva.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-2">🌿 Natureza</h3>
            <p className="text-sm text-yellow-700">
              Passe alguns minutos ao ar livre. A natureza tem um efeito calmante natural.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Entry Modal */}
      {(showAddEntry || editingEntry) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => { setShowAddEntry(false); setEditingEntry(null); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingEntry ? 'Editar Desabafo' : 'Novo Desabafo'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Como você está se sentindo?</label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => editingEntry 
                        ? setEditingEntry({ ...editingEntry, mood: mood.value as any })
                        : setNewEntry({ ...newEntry, mood: mood.value as any })
                      }
                      className={`p-3 rounded-lg text-center transition-colors ${
                        (editingEntry ? editingEntry.mood : newEntry.mood) === mood.value
                          ? 'bg-primary-100 border-2 border-primary-500'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="text-xl mb-1">{mood.icon}</div>
                      <div className="text-xs">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Desabafe aqui...</label>
                <textarea
                  value={editingEntry ? editingEntry.content : newEntry.content}
                  onChange={(e) => editingEntry 
                    ? setEditingEntry({ ...editingEntry, content: e.target.value })
                    : setNewEntry({ ...newEntry, content: e.target.value })
                  }
                  className="input-field"
                  rows={4}
                  placeholder="Conte como você está se sentindo..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (opcional)</label>
                {(editingEntry ? editingEntry.tags : newEntry.tags).map((tag, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => {
                        const tags = [...(editingEntry ? editingEntry.tags : newEntry.tags)];
                        tags[index] = e.target.value;
                        if (editingEntry) {
                          setEditingEntry({ ...editingEntry, tags });
                        } else {
                          setNewEntry({ ...newEntry, tags });
                        }
                      }}
                      className="input-field flex-1"
                      placeholder="Ex: trabalho, família, saúde"
                    />
                    {(editingEntry ? editingEntry.tags : newEntry.tags).length > 1 && (
                      <button
                        onClick={() => {
                          const tags = (editingEntry ? editingEntry.tags : newEntry.tags).filter((_, i) => i !== index);
                          if (editingEntry) {
                            setEditingEntry({ ...editingEntry, tags });
                          } else {
                            setNewEntry({ ...newEntry, tags });
                          }
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    const tags = [...(editingEntry ? editingEntry.tags : newEntry.tags), ''];
                    if (editingEntry) {
                      setEditingEntry({ ...editingEntry, tags });
                    } else {
                      setNewEntry({ ...newEntry, tags });
                    }
                  }}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Tag
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="private"
                  checked={editingEntry ? editingEntry.isPrivate : newEntry.isPrivate}
                  onChange={(e) => editingEntry 
                    ? setEditingEntry({ ...editingEntry, isPrivate: e.target.checked })
                    : setNewEntry({ ...newEntry, isPrivate: e.target.checked })
                  }
                  className="rounded border-gray-300"
                />
                <label htmlFor="private" className="text-sm text-gray-700">
                  Manter privado (só você pode ver)
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowAddEntry(false); setEditingEntry(null); }}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={editingEntry ? saveEditEntry : addEntry}
                className="btn-primary flex-1"
              >
                {editingEntry ? 'Salvar' : 'Desabafar'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EmotionalTrashPanel;