import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, ArrowLeft, Plus, CheckCircle, Circle, Heart, Lightbulb, Star } from 'lucide-react';

interface IdeiaNegocio {
  id: string;
  title: string;
  description: string;
  researched: boolean;
  favorite: boolean;
}

const IdeiasNegocioPanel: React.FC = () => {
  const [ideias, setIdeias] = useState<IdeiaNegocio[]>([
    {
      id: '1',
      title: 'Cestas de Café da Manhã Personalizadas',
      description: 'Monte e entregue cestas temáticas para datas especiais, com produtos artesanais e personalizados.',
      researched: false,
      favorite: true
    },
    {
      id: '2',
      title: 'Consultoria de Organização Pessoal',
      description: 'Ajude outras mulheres a organizarem rotinas, ambientes e finanças.',
      researched: false,
      favorite: false
    },
    {
      id: '3',
      title: 'Aulas Online de Artesanato',
      description: 'Ensine técnicas de crochê, bordado, papelaria ou customização em vídeo ou ao vivo.',
      researched: false,
      favorite: false
    },
    {
      id: '4',
      title: 'Loja Virtual de Produtos Naturais',
      description: 'Venda cosméticos, chás, snacks e itens de autocuidado naturais.',
      researched: false,
      favorite: false
    }
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newIdeia, setNewIdeia] = useState({ title: '', description: '' });

  const toggleResearched = (id: string) => {
    setIdeias(ideias.map(i => i.id === id ? { ...i, researched: !i.researched } : i));
  };
  const toggleFavorite = (id: string) => {
    setIdeias(ideias.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i));
  };
  const addIdeia = () => {
    if (newIdeia.title && newIdeia.description) {
      setIdeias([
        ...ideias,
        {
          id: Date.now().toString(),
          title: newIdeia.title,
          description: newIdeia.description,
          researched: false,
          favorite: false
        }
      ]);
      setNewIdeia({ title: '', description: '' });
      setShowAdd(false);
    }
  };

  const dicas = [
    { icon: '🚀', text: 'Comece pequeno, mas comece! O importante é dar o primeiro passo.' },
    { icon: '💡', text: 'Busque inspiração em problemas do seu dia a dia.' },
    { icon: '🤝', text: 'Conecte-se com outras mulheres empreendedoras.' },
    { icon: '📚', text: 'Invista em conhecimento e capacitação.' }
  ];

  const pesquisadas = ideias.filter(i => i.researched).length;
  const favoritas = ideias.filter(i => i.favorite).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <Link to="/eu" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Ideias de Negócio</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Ideias e inspirações de pequenos negócios para começar ainda esse ano, especialmente pensadas para mulheres</p>
          </div>
        </div>
      </motion.div>

      {/* Dicas rápidas */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas para empreender</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {dicas.map((dica, idx) => (
            <div key={idx} className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-xl flex items-center gap-3">
              <span className="text-2xl">{dica.icon}</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{dica.text}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pesquisadas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pesquisadas}/{ideias.length}</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Favoritas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{favoritas}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lista de ideias */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Ideias para empreender</h2>
          <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nova Ideia
          </button>
        </div>
        <div className="space-y-4">
          {ideias.map((i, idx) => (
            <motion.div key={i.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}
              className={`border-2 rounded-xl p-4 transition-all duration-200 ${i.researched ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-pink-200'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${i.researched ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>{i.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{i.description}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => toggleResearched(i.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${i.researched ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'}`}>
                    {i.researched ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleFavorite(i.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${i.favorite ? 'bg-pink-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'}`}>
                    <Heart className={`w-4 h-4 ${i.favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal adicionar ideia */}
      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Ideia</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Título</label>
                <input type="text" value={newIdeia.title} onChange={e => setNewIdeia({ ...newIdeia, title: e.target.value })} className="input-field" placeholder="Ex: Loja de cosméticos naturais" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea value={newIdeia.description} onChange={e => setNewIdeia({ ...newIdeia, description: e.target.value })} className="input-field" rows={3} placeholder="Descreva a ideia..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={addIdeia} className="btn-primary flex-1">Adicionar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default IdeiasNegocioPanel; 