import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  Plus, 
  CheckCircle, 
  Circle,
  Heart,
  Star,
  Droplets,
  Clock,
  AlertCircle
} from 'lucide-react';
import { usePainelConteudo } from '../../../../hooks/usePainelConteudo';

interface ClareamentoRecipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  area: string;
  frequency: string;
  completed: boolean;
  favorite: boolean;
}

const ClareamentoPanel: React.FC = () => {
  const [recipes, setRecipes] = useState<ClareamentoRecipe[]>([
    {
      id: '1',
      title: 'Máscara de Bicarbonato e Limão',
      ingredients: ['1 colher de bicarbonato de sódio', 'Suco de 1/2 limão', '1 colher de mel'],
      instructions: [
        'Misture o bicarbonato com o suco de limão',
        'Adicione o mel e misture até formar uma pasta',
        'Aplique na área desejada por 10-15 minutos',
        'Enxague com água morna'
      ],
      area: 'Axilas',
      frequency: '2x por semana',
      completed: false,
      favorite: true
    },
    {
      id: '2',
      title: 'Esfoliante de Açúcar e Óleo de Coco',
      ingredients: ['2 colheres de açúcar mascavo', '1 colher de óleo de coco', '1 colher de mel'],
      instructions: [
        'Misture todos os ingredientes',
        'Aplique com movimentos circulares suaves',
        'Deixe agir por 5 minutos',
        'Enxague com água morna'
      ],
      area: 'Virilha',
      frequency: '1x por semana',
      completed: false,
      favorite: false
    },
    {
      id: '3',
      title: 'Pasta de Cúrcuma e Leite',
      ingredients: ['1 colher de cúrcuma em pó', '2 colheres de leite', '1 colher de farinha de arroz'],
      instructions: [
        'Misture a cúrcuma com o leite',
        'Adicione a farinha de arroz até formar pasta',
        'Aplique por 20 minutos',
        'Enxague com água fria'
      ],
      area: 'Axilas',
      frequency: '3x por semana',
      completed: false,
      favorite: true
    }
  ]);

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Clareamento');

  useEffect(() => {
    if (conteudo) {
      setRecipes(conteudo.recipes || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ recipes });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    ingredients: [''],
    instructions: [''],
    area: '',
    frequency: ''
  });

  const areas = ['Axilas', 'Virilha', 'Joelhos', 'Cotovelos', 'Pescoço'];
  const frequencies = ['1x por semana', '2x por semana', '3x por semana', 'Diário'];

  const toggleRecipe = (id: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, completed: !recipe.completed } : recipe
    ));
  };

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    ));
  };

  const addRecipe = () => {
    if (newRecipe.title && newRecipe.area && newRecipe.frequency) {
      const recipe: ClareamentoRecipe = {
        id: Date.now().toString(),
        title: newRecipe.title,
        ingredients: newRecipe.ingredients.filter(ing => ing.trim() !== ''),
        instructions: newRecipe.instructions.filter(inst => inst.trim() !== ''),
        area: newRecipe.area,
        frequency: newRecipe.frequency,
        completed: false,
        favorite: false
      };
      setRecipes([...recipes, recipe]);
      setNewRecipe({ title: '', ingredients: [''], instructions: [''], area: '', frequency: '' });
      setShowAddRecipe(false);
    }
  };

  const completedRecipes = recipes.filter(recipe => recipe.completed).length;
  const totalRecipes = recipes.length;
  const favoriteRecipes = recipes.filter(recipe => recipe.favorite).length;

  const safetyTips = [
    {
      title: 'Teste de sensibilidade',
      description: 'Sempre teste em uma pequena área antes de usar em toda a região',
      icon: '⚠️'
    },
    {
      title: 'Não exagere',
      description: 'Respeite a frequência indicada para evitar irritações',
      icon: '⏰'
    },
    {
      title: 'Proteção solar',
      description: 'Use protetor solar nas áreas tratadas para evitar manchas',
      icon: '☀️'
    },
    {
      title: 'Hidratação',
      description: 'Mantenha a pele hidratada após os tratamentos',
      icon: '💧'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <Link to="/eu" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Clareamento</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Rotinas e receitas naturais para clareamento de áreas como virilha e axilas</p>
          </div>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 text-gray-800 dark:text-gray-100">
        <h2 className="text-lg font-semibold mb-2">Dicas de clareamento natural</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">Descubra cuidados e receitas para clarear áreas delicadas do corpo de forma segura e saudável.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receitas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{completedRecipes}/{totalRecipes}</p>
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
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Favoritas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{favoriteRecipes}</p>
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
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progresso</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {totalRecipes > 0 ? Math.round((completedRecipes / totalRecipes) * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-5 h-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Dicas de Segurança</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {safetyTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-xl"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-1">{tip.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Receitas Naturais</h2>
          <button
            onClick={() => setShowAddRecipe(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Receita
          </button>
        </div>

        <div className="space-y-4">
          {recipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                recipe.completed 
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-pink-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${recipe.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                      {recipe.title}
                    </h3>
                    <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 px-2 py-1 rounded-full">
                      {recipe.area}
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                      {recipe.frequency}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Ingredientes:</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {recipe.ingredients.map((ingredient, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Instruções:</h4>
                      <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {recipe.instructions.map((instruction, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-xs bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            {instruction}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => toggleRecipe(recipe.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      recipe.completed 
                        ? 'bg-green-500 text-white' 
                        : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'
                    }`}
                  >
                    {recipe.completed ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => toggleFavorite(recipe.id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      recipe.favorite 
                        ? 'bg-pink-500 text-white' 
                        : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${recipe.favorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {showAddRecipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddRecipe(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Receita</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome da Receita</label>
                <input
                  type="text"
                  value={newRecipe.title}
                  onChange={(e) => setNewRecipe({...newRecipe, title: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Máscara de Bicarbonato"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Área</label>
                  <select
                    value={newRecipe.area}
                    onChange={(e) => setNewRecipe({...newRecipe, area: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Selecione a área</option>
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Frequência</label>
                  <select
                    value={newRecipe.frequency}
                    onChange={(e) => setNewRecipe({...newRecipe, frequency: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Selecione a frequência</option>
                    {frequencies.map(frequency => (
                      <option key={frequency} value={frequency}>{frequency}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ingredientes</label>
                {newRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => {
                        const ingredients = [...newRecipe.ingredients];
                        ingredients[index] = e.target.value;
                        setNewRecipe({...newRecipe, ingredients});
                      }}
                      className="input-field flex-1"
                      placeholder="Ex: 1 colher de bicarbonato"
                    />
                    {newRecipe.ingredients.length > 1 && (
                      <button
                        onClick={() => {
                          const ingredients = newRecipe.ingredients.filter((_, i) => i !== index);
                          setNewRecipe({...newRecipe, ingredients});
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewRecipe({...newRecipe, ingredients: [...newRecipe.ingredients, '']})}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Ingrediente
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instruções</label>
                {newRecipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={instruction}
                      onChange={(e) => {
                        const instructions = [...newRecipe.instructions];
                        instructions[index] = e.target.value;
                        setNewRecipe({...newRecipe, instructions});
                      }}
                      className="input-field flex-1"
                      placeholder="Ex: Misture os ingredientes"
                    />
                    {newRecipe.instructions.length > 1 && (
                      <button
                        onClick={() => {
                          const instructions = newRecipe.instructions.filter((_, i) => i !== index);
                          setNewRecipe({...newRecipe, instructions});
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        Remover
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewRecipe({...newRecipe, instructions: [...newRecipe.instructions, '']})}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Instrução
                </button>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddRecipe(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addRecipe}
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

export default ClareamentoPanel; 