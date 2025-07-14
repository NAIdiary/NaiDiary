import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ArrowLeft, 
  Plus, 
  CheckCircle, 
  Circle,
  Heart,
  Star,
  ShoppingBag,
  Sparkles,
  Droplets,
  Scissors,
  Palette
} from 'lucide-react';
import { usePainelConteudo } from '../../../../hooks/usePainelConteudo';

interface NecessaireItem {
  id: string;
  name: string;
  category: string;
  essential: boolean;
  checked: boolean;
  notes?: string;
}

const NecessairePanel: React.FC = () => {
  const [items, setItems] = useState<NecessaireItem[]>([
    // Higiene Básica
    { id: '1', name: 'Escova de dentes', category: 'Higiene Básica', essential: true, checked: true },
    { id: '2', name: 'Pasta de dente', category: 'Higiene Básica', essential: true, checked: true },
    { id: '3', name: 'Fio dental', category: 'Higiene Básica', essential: true, checked: false },
    { id: '4', name: 'Enxaguante bucal', category: 'Higiene Básica', essential: false, checked: false },
    { id: '5', name: 'Sabonete íntimo', category: 'Higiene Básica', essential: true, checked: true },
    { id: '6', name: 'Desodorante', category: 'Higiene Básica', essential: true, checked: true },
    
    // Cuidados com a Pele
    { id: '7', name: 'Protetor solar FPS 50+', category: 'Cuidados com a Pele', essential: true, checked: true },
    { id: '8', name: 'Hidratante facial', category: 'Cuidados com a Pele', essential: true, checked: true },
    { id: '9', name: 'Limpeza facial', category: 'Cuidados com a Pele', essential: true, checked: false },
    { id: '10', name: 'Tônico facial', category: 'Cuidados com a Pele', essential: false, checked: false },
    { id: '11', name: 'Sérum vitamina C', category: 'Cuidados com a Pele', essential: false, checked: false },
    { id: '12', name: 'Máscara facial', category: 'Cuidados com a Pele', essential: false, checked: false },
    
    // Maquiagem Essencial
    { id: '13', name: 'Base/BB cream', category: 'Maquiagem Essencial', essential: true, checked: true },
    { id: '14', name: 'Corretivo', category: 'Maquiagem Essencial', essential: true, checked: false },
    { id: '15', name: 'Pó compacto', category: 'Maquiagem Essencial', essential: false, checked: false },
    { id: '16', name: 'Blush', category: 'Maquiagem Essencial', essential: false, checked: true },
    { id: '17', name: 'Batom', category: 'Maquiagem Essencial', essential: true, checked: true },
    { id: '18', name: 'Máscara de cílios', category: 'Maquiagem Essencial', essential: false, checked: false },
    
    // Cuidados com o Cabelo
    { id: '19', name: 'Shampoo', category: 'Cuidados com o Cabelo', essential: true, checked: true },
    { id: '20', name: 'Condicionador', category: 'Cuidados com o Cabelo', essential: true, checked: true },
    { id: '21', name: 'Máscara de hidratação', category: 'Cuidados com o Cabelo', essential: false, checked: false },
    { id: '22', name: 'Óleo capilar', category: 'Cuidados com o Cabelo', essential: false, checked: false },
    { id: '23', name: 'Protetor térmico', category: 'Cuidados com o Cabelo', essential: false, checked: false },
    
    // Ferramentas
    { id: '24', name: 'Escova de cabelo', category: 'Ferramentas', essential: true, checked: true },
    { id: '25', name: 'Secador de cabelo', category: 'Ferramentas', essential: false, checked: true },
    { id: '26', name: 'Chapinha', category: 'Ferramentas', essential: false, checked: false },
    { id: '27', name: 'Pincéis de maquiagem', category: 'Ferramentas', essential: false, checked: false },
    { id: '28', name: 'Espelho de aumento', category: 'Ferramentas', essential: false, checked: false },
    
    // Extras
    { id: '29', name: 'Perfume', category: 'Extras', essential: false, checked: true },
    { id: '30', name: 'Creme para as mãos', category: 'Extras', essential: false, checked: false },
    { id: '31', name: 'Creme para os pés', category: 'Extras', essential: false, checked: false },
    { id: '32', name: 'Algodão', category: 'Extras', essential: true, checked: true },
    { id: '33', name: 'Lenços umedecidos', category: 'Extras', essential: false, checked: false },
  ]);

  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', category: '', essential: false, notes: '' });

  const categories = [
    'Higiene Básica',
    'Cuidados com a Pele', 
    'Maquiagem Essencial',
    'Cuidados com o Cabelo',
    'Ferramentas',
    'Extras'
  ];

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Necessaire');

  useEffect(() => {
    if (conteudo) {
      setItems(conteudo.items || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ items });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const addItem = () => {
    if (newItem.name && newItem.category) {
      const item: NecessaireItem = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        essential: newItem.essential,
        checked: false,
        notes: newItem.notes || undefined
      };
      setItems([...items, item]);
      setNewItem({ name: '', category: '', essential: false, notes: '' });
      setShowAddItem(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Higiene Básica': return <Droplets className="w-5 h-5" />;
      case 'Cuidados com a Pele': return <Sparkles className="w-5 h-5" />;
      case 'Maquiagem Essencial': return <Palette className="w-5 h-5" />;
      case 'Cuidados com o Cabelo': return <Scissors className="w-5 h-5" />;
      case 'Ferramentas': return <Package className="w-5 h-5" />;
      case 'Extras': return <Star className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Higiene Básica': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
      case 'Cuidados com a Pele': return 'text-pink-600 bg-pink-100 dark:bg-pink-900/30';
      case 'Maquiagem Essencial': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/30';
      case 'Cuidados com o Cabelo': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'Ferramentas': return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
      case 'Extras': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800';
    }
  };

  const completedItems = items.filter(item => item.checked).length;
  const totalItems = items.length;
  const essentialItems = items.filter(item => item.essential);
  const completedEssential = essentialItems.filter(item => item.checked).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <Link 
            to="/eu"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Necessaire</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Itens essenciais para seu kit pessoal de beleza, higiene e autocuidado</p>
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
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Itens</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{completedItems}/{totalItems}</p>
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
              <p className="text-sm text-gray-600 dark:text-gray-400">Essenciais</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{completedEssential}/{essentialItems.length}</p>
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
              <ShoppingBag className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progresso</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0}%
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Categories */}
      {categories.map((category, index) => {
        const categoryItems = items.filter(item => item.category === category);
        const completedCategory = categoryItems.filter(item => item.checked).length;
        
        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(category)}`}>
                  {getCategoryIcon(category)}
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{category}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{completedCategory}/{categoryItems.length} itens</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {categoryItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 ${
                    item.checked 
                      ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                      : 'border-gray-200 dark:border-gray-700 hover:border-pink-200 dark:hover:border-pink-700'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      item.checked 
                        ? 'bg-green-500 text-white' 
                        : 'border-2 border-gray-300 dark:border-gray-600 hover:border-pink-400'
                    }`}
                  >
                    {item.checked ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${item.checked ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {item.name}
                      </h3>
                      {item.essential && (
                        <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">
                          Essencial
                        </span>
                      )}
                    </div>
                    {item.notes && (
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.notes}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}

      {/* Add Item Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <button
          onClick={() => setShowAddItem(true)}
          className="btn-primary flex items-center gap-2 px-6 py-3"
        >
          <Plus className="w-5 h-5" />
          Adicionar Item
        </button>
      </motion.div>

      {/* Add Item Modal */}
      {showAddItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddItem(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Adicionar Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Protetor solar"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Categoria</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="input-field"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="essential"
                  checked={newItem.essential}
                  onChange={(e) => setNewItem({...newItem, essential: e.target.checked})}
                  className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="essential" className="text-sm text-gray-700 dark:text-gray-300">
                  Item essencial
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Observações (opcional)</label>
                <textarea
                  value={newItem.notes}
                  onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  className="input-field"
                  rows={2}
                  placeholder="Alguma observação sobre o item..."
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addItem}
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

export default NecessairePanel; 