import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, ExternalLink, Star, Download, Plus, Edit, Trash2 } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface App {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: string;
  rating: number;
  color: string;
  features: string[];
}

const AppsPanel: React.FC = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [showAddApp, setShowAddApp] = useState(false);
  const [editingApp, setEditingApp] = useState<App | null>(null);
  const [newApp, setNewApp] = useState<Omit<App, 'id'>>({
    name: '',
    category: '',
    description: '',
    icon: '📱',
    rating: 5,
    color: 'from-blue-400 to-blue-600',
    features: [''],
  });

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Apps');

  useEffect(() => {
    if (conteudo) {
      setApps(conteudo.apps || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ apps });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apps]);

  const addApp = () => {
    if (newApp.name && newApp.category && newApp.description) {
      const app: App = {
        id: Date.now().toString(),
        ...newApp,
        features: newApp.features.filter(feature => feature.trim() !== ''),
      };
      setApps([...apps, app]);
      setNewApp({
        name: '',
        category: '',
        description: '',
        icon: '📱',
        rating: 5,
        color: 'from-blue-400 to-blue-600',
        features: [''],
      });
      setShowAddApp(false);
    }
  };

  const deleteApp = (id: string) => {
    setApps(apps.filter(app => app.id !== id));
  };

  const startEditApp = (app: App) => {
    setEditingApp(app);
    setShowAddApp(false);
  };

  const saveEditApp = () => {
    if (editingApp && editingApp.name && editingApp.category && editingApp.description) {
      setApps(apps.map(app => app.id === editingApp.id ? editingApp : app));
      setEditingApp(null);
    }
  };

  const categories = [
    { name: 'Saúde Feminina', icon: '🌸' },
    { name: 'Beleza', icon: '✨' },
    { name: 'Moda', icon: '👗' },
    { name: 'Produtividade', icon: '📝' },
    { name: 'Fotografia', icon: '📷' },
    { name: 'Social', icon: '👻' },
    { name: 'Leitura', icon: '📚' },
    { name: 'Religião', icon: '🙏' },
    { name: 'Inspiração', icon: '📌' },
    { name: 'Educação', icon: '📖' },
    { name: 'Fitness', icon: '💪' },
    { name: 'Música', icon: '🎵' },
  ];

  const colorOptions = [
    { value: 'from-pink-400 to-rose-500', label: 'Rosa' },
    { value: 'from-red-400 to-red-600', label: 'Vermelho' },
    { value: 'from-gray-400 to-gray-600', label: 'Cinza' },
    { value: 'from-yellow-400 to-orange-500', label: 'Laranja' },
    { value: 'from-purple-400 to-purple-600', label: 'Roxo' },
    { value: 'from-pink-400 to-fuchsia-500', label: 'Fuchsia' },
    { value: 'from-orange-400 to-red-500', label: 'Vermelho-Laranja' },
    { value: 'from-yellow-400 to-yellow-600', label: 'Amarelo' },
    { value: 'from-blue-400 to-blue-600', label: 'Azul' },
    { value: 'from-green-400 to-green-600', label: 'Verde' },
    { value: 'from-indigo-400 to-indigo-600', label: 'Índigo' },
    { value: 'from-teal-400 to-teal-600', label: 'Teal' },
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
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Apps Úteis</h1>
            <p className="text-gray-600 dark:text-gray-400">Aplicativos essenciais para garotas 📱</p>
          </div>
        </div>
      </motion.div>

      {/* Categories Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Categorias</h2>
          <button
            onClick={() => setShowAddApp(true)}
            className="btn-primary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar App
          </button>
        </div>
        
        {apps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum app adicionado ainda</p>
            <p className="text-sm">Clique em "Adicionar App" para começar</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {categories.map((category, index) => {
              const count = apps.filter(app => app.category === category.name).length;
              if (count === 0) return null;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <p className="text-xs font-medium text-gray-700">{category.name}</p>
                  <p className="text-xs text-gray-500">{count} app{count > 1 ? 's' : ''}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Apps Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Meus Aplicativos</h2>
        
        {apps.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Download className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum app adicionado ainda</p>
            <p className="text-sm">Adicione seus apps favoritos para começar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {apps.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${app.color} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                    {app.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100 truncate">{app.name}</h3>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{app.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-2">{app.category}</p>
                    <p className="text-sm text-gray-700 mb-3">{app.description}</p>
                    
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {app.features.slice(0, 3).map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                        {app.features.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{app.features.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="btn-primary text-sm flex-1 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Baixar App
                      </button>
                      <button
                        onClick={() => startEditApp(app)}
                        className="btn-secondary text-sm px-3 py-2"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteApp(app.id)}
                        className="btn-secondary text-sm px-3 py-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
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
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Dicas de Uso</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">📱 Organização</h3>
            <p className="text-sm text-blue-700">
              Crie pastas temáticas no seu celular para organizar os apps por categoria (Beleza, Estudos, Social, etc.)
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">🔔 Notificações</h3>
            <p className="text-sm text-purple-700">
              Configure notificações apenas para apps essenciais para evitar distrações durante os estudos.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h3 className="font-medium text-green-800 mb-2">🔒 Privacidade</h3>
            <p className="text-sm text-green-700">
              Sempre revise as permissões dos apps e mantenha suas informações pessoais seguras.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl">
            <h3 className="font-medium text-yellow-800 mb-2">⏰ Tempo de Tela</h3>
            <p className="text-sm text-yellow-700">
              Use o controle de tempo de tela para manter um equilíbrio saudável entre digital e vida real.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit App Modal */}
      {(showAddApp || editingApp) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => { setShowAddApp(false); setEditingApp(null); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {editingApp ? 'Editar App' : 'Adicionar App'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do App</label>
                <input
                  type="text"
                  value={editingApp ? editingApp.name : newApp.name}
                  onChange={(e) => editingApp ? setEditingApp({ ...editingApp, name: e.target.value }) : setNewApp({ ...newApp, name: e.target.value })}
                  className="input-field"
                  placeholder="Ex: Instagram"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  value={editingApp ? editingApp.category : newApp.category}
                  onChange={(e) => editingApp ? setEditingApp({ ...editingApp, category: e.target.value }) : setNewApp({ ...newApp, category: e.target.value })}
                  className="input-field"
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(category => (
                    <option key={category.name} value={category.name}>{category.icon} {category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  value={editingApp ? editingApp.description : newApp.description}
                  onChange={(e) => editingApp ? setEditingApp({ ...editingApp, description: e.target.value }) : setNewApp({ ...newApp, description: e.target.value })}
                  className="input-field"
                  rows={2}
                  placeholder="Descreva o app..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ícone (emoji)</label>
                <input
                  type="text"
                  value={editingApp ? editingApp.icon : newApp.icon}
                  onChange={(e) => editingApp ? setEditingApp({ ...editingApp, icon: e.target.value }) : setNewApp({ ...newApp, icon: e.target.value })}
                  className="input-field"
                  placeholder="📱"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avaliação (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={editingApp ? editingApp.rating : newApp.rating}
                  onChange={(e) => editingApp ? setEditingApp({ ...editingApp, rating: parseFloat(e.target.value) }) : setNewApp({ ...newApp, rating: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cor do Ícone</label>
                <select
                  value={editingApp ? editingApp.color : newApp.color}
                  onChange={(e) => editingApp ? setEditingApp({ ...editingApp, color: e.target.value }) : setNewApp({ ...newApp, color: e.target.value })}
                  className="input-field"
                >
                  {colorOptions.map(color => (
                    <option key={color.value} value={color.value}>{color.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Funcionalidades</label>
                {(editingApp ? editingApp.features : newApp.features).map((feature, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => {
                        const features = editingApp ? [...editingApp.features] : [...newApp.features];
                        features[index] = e.target.value;
                        if (editingApp) {
                          setEditingApp({ ...editingApp, features });
                        } else {
                          setNewApp({ ...newApp, features });
                        }
                      }}
                      className="input-field flex-1"
                      placeholder="Ex: Filtros de beleza"
                    />
                    {(editingApp ? editingApp.features : newApp.features).length > 1 && (
                      <button
                        onClick={() => {
                          const features = (editingApp ? editingApp.features : newApp.features).filter((_, i) => i !== index);
                          if (editingApp) {
                            setEditingApp({ ...editingApp, features });
                          } else {
                            setNewApp({ ...newApp, features });
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
                    const features = [...(editingApp ? editingApp.features : newApp.features), ''];
                    if (editingApp) {
                      setEditingApp({ ...editingApp, features });
                    } else {
                      setNewApp({ ...newApp, features });
                    }
                  }}
                  className="btn-secondary text-sm w-full"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  Adicionar Funcionalidade
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowAddApp(false); setEditingApp(null); }}
                className="btn-secondary flex-1"
              >
                Cancelar
              </button>
              <button
                onClick={editingApp ? saveEditApp : addApp}
                className="btn-primary flex-1"
              >
                {editingApp ? 'Salvar' : 'Adicionar'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AppsPanel;