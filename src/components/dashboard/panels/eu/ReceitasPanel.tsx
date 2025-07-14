import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ArrowLeft, Plus, CheckCircle, Circle, Heart, Star } from 'lucide-react';
import { usePainelConteudo } from '../../../../hooks/usePainelConteudo';

interface Receita {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  done: boolean;
  favorite: boolean;
}

const ReceitasPanel: React.FC = () => {
  const [receitas, setReceitas] = useState<Receita[]>([
    {
      id: '1',
      title: 'Smoothie de Frutas Vermelhas',
      ingredients: ['1 xícara de morangos', '1/2 xícara de mirtilos', '1 banana', '200ml de água de coco'],
      instructions: ['Bata tudo no liquidificador até ficar cremoso.', 'Sirva gelado.'],
      done: false,
      favorite: true
    },
    {
      id: '2',
      title: 'Salada Colorida',
      ingredients: ['Folhas verdes', 'Tomate-cereja', 'Cenoura ralada', 'Sementes de girassol', 'Azeite e limão'],
      instructions: ['Misture todos os ingredientes.', 'Tempere com azeite e limão.'],
      done: false,
      favorite: false
    },
    {
      id: '3',
      title: 'Tapioca com Queijo Branco',
      ingredients: ['2 colheres de sopa de goma de tapioca', '2 fatias de queijo branco'],
      instructions: ['Aqueça a frigideira, coloque a goma e espalhe.', 'Adicione o queijo, dobre e sirva.'],
      done: false,
      favorite: false
    }
  ]);

  const [showAdd, setShowAdd] = useState(false);
  const [newReceita, setNewReceita] = useState({ title: '', ingredients: [''], instructions: [''] });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Receitas');

  useEffect(() => {
    if (conteudo) {
      setReceitas(conteudo.receitas || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ receitas });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receitas]);

  const toggleDone = (id: string) => {
    setReceitas(receitas.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };
  const toggleFavorite = (id: string) => {
    setReceitas(receitas.map(r => r.id === id ? { ...r, favorite: !r.favorite } : r));
  };
  const addReceita = () => {
    if (newReceita.title && newReceita.ingredients[0] && newReceita.instructions[0]) {
      setReceitas([
        ...receitas,
        {
          id: Date.now().toString(),
          title: newReceita.title,
          ingredients: newReceita.ingredients.filter(i => i.trim() !== ''),
          instructions: newReceita.instructions.filter(i => i.trim() !== ''),
          done: false,
          favorite: false
        }
      ]);
      setNewReceita({ title: '', ingredients: [''], instructions: [''] });
      setShowAdd(false);
    }
  };

  const dicas = [
    { icon: '🥗', text: 'Prefira alimentos frescos, coloridos e naturais.' },
    { icon: '💧', text: 'Beba bastante água ao longo do dia.' },
    { icon: '🌱', text: 'Inclua sementes e folhas verdes nas refeições.' },
    { icon: '🍓', text: 'Frutas são ótimas opções de lanches rápidos.' }
  ];

  const feitas = receitas.filter(r => r.done).length;
  const favoritas = receitas.filter(r => r.favorite).length;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <Link to="/eu" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Receitas</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Receitas saudáveis, naturais, nutritivas e leves para seu dia a dia feminino</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas rápidas de alimentação</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {dicas.map((dica, idx) => (
            <div key={idx} className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-xl flex items-center gap-3">
              <span className="text-2xl">{dica.icon}</span>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{dica.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Feitas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{feitas}/{receitas.length}</p>
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Receitas</h2>
          <button onClick={() => setShowAdd(true)} className="btn-primary text-sm px-4 py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nova Receita
          </button>
        </div>
        <div className="space-y-4">
          {receitas.map((r, idx) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * idx }}
              className={`border-2 rounded-xl p-4 transition-all duration-200 ${r.done ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-pink-200'}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${r.done ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>{r.title}</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredientes:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {r.ingredients.map((ing, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Modo de preparo:</h4>
                      <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {r.instructions.map((inst, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                            {inst}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button onClick={() => toggleDone(r.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${r.done ? 'bg-green-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'}`}>
                    {r.done ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                  <button onClick={() => toggleFavorite(r.id)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${r.favorite ? 'bg-pink-500 text-white' : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'}`}>
                    <Heart className={`w-4 h-4 ${r.favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {showAdd && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Receita</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Receita</label>
                <input type="text" value={newReceita.title} onChange={e => setNewReceita({ ...newReceita, title: e.target.value })} className="input-field" placeholder="Ex: Salada Colorida" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ingredientes</label>
                {newReceita.ingredients.map((ing, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={ing} onChange={e => {
                      const ingredients = [...newReceita.ingredients];
                      ingredients[i] = e.target.value;
                      setNewReceita({ ...newReceita, ingredients });
                    }} className="input-field flex-1" placeholder="Ex: 1 banana" />
                    {newReceita.ingredients.length > 1 && (
                      <button onClick={() => {
                        const ingredients = newReceita.ingredients.filter((_, idx) => idx !== i);
                        setNewReceita({ ...newReceita, ingredients });
                      }} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">Remover</button>
                    )}
                  </div>
                ))}
                <button onClick={() => setNewReceita({ ...newReceita, ingredients: [...newReceita.ingredients, ''] })} className="btn-secondary text-sm w-full">
                  <Plus className="w-4 h-4 inline mr-2" />Adicionar Ingrediente
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Modo de preparo</label>
                {newReceita.instructions.map((inst, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input type="text" value={inst} onChange={e => {
                      const instructions = [...newReceita.instructions];
                      instructions[i] = e.target.value;
                      setNewReceita({ ...newReceita, instructions });
                    }} className="input-field flex-1" placeholder="Ex: Misture tudo" />
                    {newReceita.instructions.length > 1 && (
                      <button onClick={() => {
                        const instructions = newReceita.instructions.filter((_, idx) => idx !== i);
                        setNewReceita({ ...newReceita, instructions });
                      }} className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">Remover</button>
                    )}
                  </div>
                ))}
                <button onClick={() => setNewReceita({ ...newReceita, instructions: [...newReceita.instructions, ''] })} className="btn-secondary text-sm w-full">
                  <Plus className="w-4 h-4 inline mr-2" />Adicionar Passo
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdd(false)} className="btn-secondary flex-1">Cancelar</button>
              <button onClick={addReceita} className="btn-primary flex-1">Adicionar</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ReceitasPanel; 