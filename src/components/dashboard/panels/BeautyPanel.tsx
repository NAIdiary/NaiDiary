import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Star, ShoppingBag, Heart, ExternalLink, Plus, Edit, Trash2 } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface BeautyItem {
  id: string;
  name: string;
  category: string;
  price: string;
  store: string;
  image: string;
  rating: number;
  favorite: boolean;
}

interface Style {
  id: string;
  name: string;
  description: string;
  colors: string[];
  items: string[];
}

const BeautyPanel: React.FC = () => {
  const [beautyItems, setBeautyItems] = useState<BeautyItem[]>([]);
  const [styles, setStyles] = useState<Style[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const [showAddStyleForm, setShowAddStyleForm] = useState(false);

  // Form states for new item
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    store: '',
    image: '',
    rating: 5,
  });

  // Form states for new style
  const [newStyle, setNewStyle] = useState({
    name: '',
    description: '',
    colors: ['#FFB6C1', '#FFC0CB', '#E6E6FA', '#F0F8FF'],
    items: [''],
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Beauty');

  useEffect(() => {
    if (conteudo) {
      setBeautyItems(conteudo.beautyItems || []);
      setStyles(conteudo.styles || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ beautyItems, styles });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beautyItems, styles]);

  const toggleFavorite = (itemId: string) => {
    setBeautyItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const addNewItem = () => {
    if (newItem.name && newItem.category && newItem.price) {
      const item: BeautyItem = {
        id: Date.now().toString(),
        ...newItem,
        favorite: false,
      };
      setBeautyItems([...beautyItems, item]);
      setNewItem({ name: '', category: '', price: '', store: '', image: '', rating: 5 });
      setShowAddItemForm(false);
    }
  };

  const addNewStyle = () => {
    if (newStyle.name && newStyle.description) {
      const style: Style = {
        id: Date.now().toString(),
        ...newStyle,
        items: newStyle.items.filter(item => item.trim() !== ''),
      };
      setStyles([...styles, style]);
      setNewStyle({ name: '', description: '', colors: ['#FFB6C1', '#FFC0CB', '#E6E6FA', '#F0F8FF'], items: [''] });
      setShowAddStyleForm(false);
    }
  };

  const deleteItem = (itemId: string) => {
    setBeautyItems(items => items.filter(item => item.id !== itemId));
  };

  const deleteStyle = (styleId: string) => {
    setStyles(styles => styles.filter(style => style.id !== styleId));
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
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-pink-600 rounded-xl flex items-center justify-center">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800">Beleza & Moda</h1>
            <p className="text-gray-600">Descubra seu estilo único 💄✨</p>
          </div>
        </div>
      </motion.div>

      {/* Style Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Meus Estilos</h2>
          <button
            onClick={() => setShowAddStyleForm(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Estilo
          </button>
        </div>
        
        {styles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Palette className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum estilo adicionado ainda</p>
            <p className="text-sm">Clique em "Adicionar Estilo" para começar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {styles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:border-pink-300 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{style.name}</h3>
                  <button
                    onClick={() => deleteStyle(style.id)}
                    className="p-1 text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{style.description}</p>
                
                <div className="flex gap-2 mb-3">
                  {style.colors.map((color, colorIndex) => (
                    <div
                      key={colorIndex}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <button 
                  className="btn-secondary text-sm w-full"
                  onClick={() => setSelectedStyle(style)}
                >
                  Ver Detalhes
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Beauty Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Meus Achados</h2>
          <button
            onClick={() => setShowAddItemForm(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar Item
          </button>
        </div>
        
        {beautyItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum item adicionado ainda</p>
            <p className="text-sm">Clique em "Adicionar Item" para começar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {beautyItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="relative mb-3">
                  <img
                    src={item.image || 'https://via.placeholder.com/200x150?text=Sem+Imagem'}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`p-2 rounded-full ${
                        item.favorite ? 'bg-red-500 text-white' : 'bg-white text-gray-400'
                      }`}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 rounded-full bg-white text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{item.store}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-800">{item.price}</span>
                  <button className="btn-primary text-xs px-3 py-2 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    Ver
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Jewelry Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Guia de Joias</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">✨ Ouro (Tom Quente)</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Combina com: pele dourada, morena</p>
              <p>• Cores que harmonizam: vermelho, laranja, amarelo</p>
              <p>• Estilo: clássico, elegante</p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-800 mb-3">💎 Prata (Tom Frio)</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Combina com: pele rosada, clara</p>
              <p>• Cores que harmonizam: azul, roxo, verde</p>
              <p>• Estilo: moderno, minimalista</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Makeup Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Dicas de Maquiagem</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl">
            <h3 className="font-medium text-pink-800 mb-2">💄 Maquiagem Natural</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Base leve ou BB cream</li>
              <li>• Blush rosado nas maçãs</li>
              <li>• Máscara de cílios marrom</li>
              <li>• Gloss ou batom nude</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">✨ Maquiagem Noturna</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Base com cobertura média</li>
              <li>• Sombra esfumada</li>
              <li>• Delineador marcado</li>
              <li>• Batom vermelho ou vinho</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Add Item Modal */}
      {showAddItemForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddItemForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Item</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Colar dourado"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <input
                  type="text"
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Joias, Roupas, Maquiagem"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preço</label>
                <input
                  type="text"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                  className="input-field"
                  placeholder="Ex: R$ 45,90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loja</label>
                <input
                  type="text"
                  value={newItem.store}
                  onChange={(e) => setNewItem({...newItem, store: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Shein, AliExpress"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem (opcional)</label>
                <input
                  type="text"
                  value={newItem.image}
                  onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                  className="input-field"
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={newItem.rating}
                  onChange={(e) => setNewItem({...newItem, rating: parseFloat(e.target.value)})}
                  className="input-field"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddItemForm(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addNewItem}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Add Style Modal */}
      {showAddStyleForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddStyleForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Adicionar Estilo</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Estilo</label>
                <input
                  type="text"
                  value={newStyle.name}
                  onChange={(e) => setNewStyle({...newStyle, name: e.target.value})}
                  className="input-field"
                  placeholder="Ex: Soft Girl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={newStyle.description}
                  onChange={(e) => setNewStyle({...newStyle, description: e.target.value})}
                  className="input-field"
                  rows={3}
                  placeholder="Descreva o estilo..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cores (hex)</label>
                <div className="grid grid-cols-4 gap-2">
                  {newStyle.colors.map((color, index) => (
                    <input
                      key={index}
                      type="color"
                      value={color}
                      onChange={(e) => {
                        const newColors = [...newStyle.colors];
                        newColors[index] = e.target.value;
                        setNewStyle({...newStyle, colors: newColors});
                      }}
                      className="w-full h-10 rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Peças Essenciais</label>
                {newStyle.items.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...newStyle.items];
                        newItems[index] = e.target.value;
                        setNewStyle({...newStyle, items: newItems});
                      }}
                      className="input-field flex-1"
                      placeholder="Ex: Blush rosado"
                    />
                    {newStyle.items.length > 1 && (
                      <button
                        onClick={() => {
                          const newItems = newStyle.items.filter((_, i) => i !== index);
                          setNewStyle({...newStyle, items: newItems});
                        }}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setNewStyle({...newStyle, items: [...newStyle.items, '']})}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Peça
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddStyleForm(false)}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={addNewStyle}
                className="btn-primary flex-1"
              >
                Adicionar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Style Modal */}
      {selectedStyle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStyle(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedStyle.name}</h3>
            <p className="text-gray-600 mb-4">{selectedStyle.description}</p>
            
            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-2">Paleta de Cores</h4>
              <div className="flex gap-2">
                {selectedStyle.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium text-gray-800 mb-2">Peças Essenciais</h4>
              <ul className="space-y-1">
                {selectedStyle.items.map((item, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary-400 rounded-full"></span>
                  {item}
                </li>
                ))}
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedStyle(null)}
                className="btn-secondary flex-1"
              >
                Fechar
              </button>
              <button className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                Comprar Peças
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default BeautyPanel;