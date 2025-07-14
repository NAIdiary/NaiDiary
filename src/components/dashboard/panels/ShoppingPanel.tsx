import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus, Edit, Trash2, CheckCircle, Star, DollarSign, Tag } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: string;
  priority: 'high' | 'medium' | 'low';
  purchased: boolean;
  notes: string;
  store: string;
}

interface ShoppingList {
  id: string;
  name: string;
  items: ShoppingItem[];
  date: string;
  completed: boolean;
}

const ShoppingPanel: React.FC = () => {
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [currentList, setCurrentList] = useState<ShoppingList | null>(null);
  
  const [showAddList, setShowAddList] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);

  const [newList, setNewList] = useState<Omit<ShoppingList, 'id' | 'items' | 'date' | 'completed'>>({
    name: '',
  });

  const [newItem, setNewItem] = useState<Omit<ShoppingItem, 'id' | 'purchased'>>({
    name: '',
    category: '',
    price: '',
    priority: 'medium',
    notes: '',
    store: '',
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Shopping');

  useEffect(() => {
    if (conteudo) {
      setShoppingLists(conteudo.shoppingLists || []);
      setCurrentList(conteudo.currentList || null);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ shoppingLists, currentList });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingLists, currentList]);

  const addShoppingList = () => {
    if (newList.name) {
      const list: ShoppingList = {
        id: Date.now().toString(),
        ...newList,
        items: [],
        date: new Date().toISOString().split('T')[0],
        completed: false,
      };
      setShoppingLists([list, ...shoppingLists]);
      setNewList({ name: '' });
      setShowAddList(false);
    }
  };

  const deleteShoppingList = (id: string) => {
    setShoppingLists(shoppingLists.filter(list => list.id !== id));
    if (currentList?.id === id) {
      setCurrentList(null);
    }
  };

  const addItemToList = (listId: string) => {
    if (newItem.name && newItem.category) {
      const item: ShoppingItem = {
        id: Date.now().toString(),
        ...newItem,
        purchased: false,
      };
      
      setShoppingLists(shoppingLists.map(list => 
        list.id === listId 
          ? { ...list, items: [item, ...list.items] }
          : list
      ));
      
      if (currentList?.id === listId) {
        setCurrentList({ ...currentList, items: [item, ...currentList.items] });
      }
      
      setNewItem({
        name: '',
        category: '',
        price: '',
        priority: 'medium',
        notes: '',
        store: '',
      });
      setShowAddItem(false);
    }
  };

  const deleteItem = (listId: string, itemId: string) => {
    setShoppingLists(shoppingLists.map(list => 
      list.id === listId 
        ? { ...list, items: list.items.filter(item => item.id !== itemId) }
        : list
    ));
    
    if (currentList?.id === listId) {
      setCurrentList({ ...currentList, items: currentList.items.filter(item => item.id !== itemId) });
    }
  };

  const toggleItemPurchased = (listId: string, itemId: string) => {
    setShoppingLists(shoppingLists.map(list => 
      list.id === listId 
        ? { 
            ...list, 
            items: list.items.map(item => 
              item.id === itemId ? { ...item, purchased: !item.purchased } : item
            )
          }
        : list
    ));
    
    if (currentList?.id === listId) {
      setCurrentList({
        ...currentList,
        items: currentList.items.map(item => 
          item.id === itemId ? { ...item, purchased: !item.purchased } : item
        )
      });
    }
  };

  const categories = [
    'Alimentação', 'Higiene', 'Beleza', 'Roupas', 'Casa', 
    'Eletrônicos', 'Livros', 'Presentes', 'Outros'
  ];

  const priorityColors = {
    high: 'text-red-600 bg-red-100',
    medium: 'text-yellow-600 bg-yellow-100',
    low: 'text-green-600 bg-green-100',
  };

  const priorityLabels = {
    high: 'Alta',
    medium: 'Média',
    low: 'Baixa',
  };

  const totalItems = shoppingLists.reduce((total, list) => total + list.items.length, 0);
  const purchasedItems = shoppingLists.reduce((total, list) => 
    total + list.items.filter(item => item.purchased).length, 0
  );
  const totalSpent = shoppingLists.reduce((total, list) => 
    total + list.items
      .filter(item => item.purchased && item.price)
      .reduce((sum, item) => sum + parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.')), 0), 0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Compras</h1>
            <p className="text-gray-600 dark:text-gray-400">Organize suas listas de compras 💰</p>
          </div>
        </div>
      </motion.div>

      {/* SHEIN Stores List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20"
      >
        <h2 className="text-lg font-semibold text-pink-700 dark:text-pink-300 mb-2 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-pink-500" /> Lojas da SHEIN
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Roupas */}
          <div>
            <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1">👗 Roupas</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>SOLEIA</li>
              <li>SHEINBAE</li>
              <li>SHEINICONY</li>
              <li>SHEINEZWEAR</li>
              <li>DAZYSPICE</li>
              <li>MUSERA</li>
              <li>FAIRYTALEGIRL</li>
              <li>RAFFERIZA</li>
              <li>MYOURSA</li>
              <li>ROMWE</li>
              <li>SHEINMOD</li>
              <li>OLDBLOWHSE</li>
              <li>HERSION</li>
              <li>SHEINPETITE</li>
              <li>FORESI</li>
            </ul>
          </div>
          {/* Maquiagem */}
          <div>
            <h3 className="font-medium text-pink-700 dark:text-pink-300 mb-1 flex items-center gap-1">💄 Maquiagem e Rosto</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>MEISHANG</li>
              <li>LASHES</li>
              <li>SHEGLAM <span className="text-xs text-pink-500">(oficial)</span></li>
              <li>PECOLOVERS</li>
              <li>GLAMGEAR</li>
              <li>NCSTARORANGE</li>
            </ul>
          </div>
          {/* Acessórios */}
          <div>
            <h3 className="font-medium text-purple-700 dark:text-purple-300 mb-1 flex items-center gap-1">💍 Acessórios</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <li>SHENMAN</li>
              <li>KUNJUAN</li>
              <li>PIERCINGALLOVERTHEHOUSE</li>
              <li>BRIGHTMORNING</li>
              <li>COLORSOFTHEWIND</li>
              <li>PANDUOLACHARM</li>
              <li>FASHION-WOMENJEWERLY</li>
              <li>ZHENNICE</li>
            </ul>
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
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Itens</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{purchasedItems}/{totalItems}</p>
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
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Gasto</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">R$ {totalSpent.toFixed(2)}</p>
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
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Tag className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Listas</p>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{shoppingLists.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Shopping Lists */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Listas de Compras</h2>
          <button
            onClick={() => setShowAddList(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Lista
          </button>
        </div>
        
        {shoppingLists.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma lista de compras criada ainda</p>
            <p className="text-sm">Clique em "Nova Lista" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {shoppingLists.map((list, index) => (
              <motion.div
                key={list.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                  list.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-green-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${list.completed ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                        {list.name}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        {list.items.length} itens
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Criada em: {new Date(list.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setCurrentList(list)}
                      className="btn-secondary text-xs px-3 py-1"
                    >
                      Ver Itens
                    </button>
                    <button
                      onClick={() => deleteShoppingList(list.id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {list.items.length > 0 && (
                  <div className="text-xs text-gray-500">
                    {list.items.filter(item => item.purchased).length} de {list.items.length} comprados
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Current List Items */}
      {currentList && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Itens: {currentList.name}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddItem(true)}
                className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Adicionar Item
              </button>
              <button
                onClick={() => setCurrentList(null)}
                className="btn-secondary text-sm px-4 py-2"
              >
                Voltar
              </button>
            </div>
          </div>
          
          {currentList.items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Tag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Nenhum item nesta lista</p>
              <p className="text-sm">Clique em "Adicionar Item" para começar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentList.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                    item.purchased 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${item.purchased ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'}`}>
                          {item.name}
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[item.priority]}`}>
                          {priorityLabels[item.priority]}
                        </span>
                      </div>
                      {item.price && (
                        <p className="text-sm font-medium text-green-600 mb-1">
                          R$ {item.price}
                        </p>
                      )}
                      {item.store && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                          Loja: {item.store}
                        </p>
                      )}
                      {item.notes && (
                        <p className={`text-sm ${item.purchased ? 'text-green-600' : 'text-gray-700'}`}>
                          {item.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => toggleItemPurchased(currentList.id, item.id)}
                        className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                          item.purchased 
                            ? 'bg-green-500 text-white' 
                            : 'border-2 border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {item.purchased && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => deleteItem(currentList.id, item.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Shopping Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas de Economia</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">📝 Lista Organizada</h3>
            <p className="text-sm text-green-700">
              Sempre faça uma lista antes de sair de casa. Isso evita compras por impulso.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">💰 Compare Preços</h3>
            <p className="text-sm text-blue-700">
              Pesquise preços em diferentes lojas antes de comprar itens mais caros.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">🎯 Prioridades</h3>
            <p className="text-sm text-purple-700">
              Defina prioridades para seus gastos. O que é realmente necessário agora?
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-2">📱 Aplicativos</h3>
            <p className="text-sm text-yellow-700">
              Use aplicativos de cupons e cashback para economizar em suas compras.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add List Modal */}
      {showAddList && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddList(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Nova Lista de Compras</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Lista</label>
                <input
                  type="text"
                  value={newList.name}
                  onChange={(e) => setNewList({...newList, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Compras do mês"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddList(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addShoppingList}
                className="btn-primary flex-1"
              >
                Criar Lista
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Item Modal */}
      {showAddItem && currentList && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddItem(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Adicionar Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Arroz integral"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço (opcional)</label>
                <input
                  type="text"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="input-field"
                  placeholder="Ex: 15,90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loja (opcional)</label>
                <input
                  type="text"
                  value={newItem.store}
                  onChange={(e) => setNewItem({...newItem, store: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Supermercado ABC"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                <select
                  value={newItem.priority}
                  onChange={(e) => setNewItem({...newItem, priority: e.target.value as 'high' | 'medium' | 'low'})}
                  className="input-field"
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Observações (opcional)</label>
                <textarea
                  value={newItem.notes}
                  onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                  className="input-field"
                  rows={2}
                  placeholder="Ex: Marca específica, quantidade..."
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
                onClick={() => addItemToList(currentList.id)}
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

export default ShoppingPanel;