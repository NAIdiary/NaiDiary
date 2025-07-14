import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Heart, Shield, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';

interface HygieneTip {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'products' | 'myths' | 'health';
  important: boolean;
}

interface Product {
  id: string;
  name: string;
  type: 'recommended' | 'avoid';
  description: string;
  reason: string;
}

const HygienePanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('daily');
  const [completedTips, setCompletedTips] = useState<string[]>([]);

  const hygieneTips: HygieneTip[] = [
    {
      id: '1',
      title: 'Higiene diária básica',
      description: 'Lave a região íntima apenas com água morna ou sabonete neutro específico para a área.',
      category: 'daily',
      important: true,
    },
    {
      id: '2',
      title: 'Direção correta',
      description: 'Sempre limpe da frente para trás para evitar infecções.',
      category: 'daily',
      important: true,
    },
    {
      id: '3',
      title: 'Roupas íntimas',
      description: 'Use calcinhas de algodão e evite tecidos sintéticos que não deixam a pele respirar.',
      category: 'daily',
      important: false,
    },
    {
      id: '4',
      title: 'Troca de absorventes',
      description: 'Troque absorventes a cada 3-4 horas, mesmo com pouco fluxo.',
      category: 'daily',
      important: true,
    },
    {
      id: '5',
      title: 'Sabonete íntimo',
      description: 'Use produtos com pH entre 3,5 e 5,5, específicos para a região íntima.',
      category: 'products',
      important: false,
    },
    {
      id: '6',
      title: 'Evite duchas vaginais',
      description: 'A vagina tem limpeza natural própria. Duchas podem causar desequilíbrio.',
      category: 'products',
      important: true,
    },
    {
      id: '7',
      title: 'Mito: Cheiro forte é normal',
      description: 'Odor muito forte pode indicar infecção. Procure ajuda médica se necessário.',
      category: 'myths',
      important: true,
    },
    {
      id: '8',
      title: 'Mito: Corrimento sempre é problema',
      description: 'Corrimento transparente ou esbranquiçado sem odor forte é normal.',
      category: 'myths',
      important: false,
    },
    {
      id: '9',
      title: 'Quando procurar médico',
      description: 'Coceira persistente, odor forte, corrimento com cor/cheiro estranho.',
      category: 'health',
      important: true,
    },
    {
      id: '10',
      title: 'Exames preventivos',
      description: 'Faça o Papanicolau anualmente após o início da vida sexual.',
      category: 'health',
      important: true,
    },
  ];

  const products: Product[] = [
    {
      id: '1',
      name: 'Sabonete neutro específico',
      type: 'recommended',
      description: 'pH balanceado para a região íntima',
      reason: 'Mantém o equilíbrio natural da flora vaginal',
    },
    {
      id: '2',
      name: 'Calcinhas de algodão',
      type: 'recommended',
      description: 'Tecido natural e respirável',
      reason: 'Permite ventilação e reduz umidade',
    },
    {
      id: '3',
      name: 'Absorventes sem perfume',
      type: 'recommended',
      description: 'Produtos hipoalergênicos',
      reason: 'Evita irritações e alergias',
    },
    {
      id: '4',
      name: 'Sabonetes perfumados',
      type: 'avoid',
      description: 'Produtos com fragrâncias fortes',
      reason: 'Podem causar irritação e desequilíbrio do pH',
    },
    {
      id: '5',
      name: 'Roupas muito apertadas',
      type: 'avoid',
      description: 'Calças e calcinhas muito justas',
      reason: 'Criam ambiente úmido propício para fungos',
    },
    {
      id: '6',
      name: 'Lenços umedecidos perfumados',
      type: 'avoid',
      description: 'Produtos com álcool e fragrâncias',
      reason: 'Podem ressecar e irritar a pele sensível',
    },
  ];

  const categories = [
    { id: 'daily', name: 'Cuidados Diários', icon: '🌸' },
    { id: 'products', name: 'Produtos', icon: '🧴' },
    { id: 'myths', name: 'Mitos e Verdades', icon: '💭' },
    { id: 'health', name: 'Saúde', icon: '🏥' },
  ];

  const toggleTipCompletion = (tipId: string) => {
    setCompletedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const filteredTips = hygieneTips.filter(tip => tip.category === selectedCategory);
  const recommendedProducts = products.filter(p => p.type === 'recommended');
  const avoidProducts = products.filter(p => p.type === 'avoid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-pink-600 rounded-xl flex items-center justify-center">
            <Smile className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Higiene Íntima</h1>
            <p className="text-gray-600 dark:text-gray-400">Cuidados essenciais para sua saúde 🌸</p>
          </div>
        </div>
      </motion.div>

      {/* Important Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-pink-800 mb-2">Informação Importante</h2>
            <p className="text-pink-700 text-sm mb-3">
              Este conteúdo é educativo e não substitui consulta médica. Sempre procure um ginecologista 
              para orientações personalizadas sobre sua saúde íntima.
            </p>
            <div className="bg-pink-100 p-3 rounded-lg">
              <p className="text-xs text-pink-800 font-medium">
                💡 Lembre-se: cada corpo é único e pode ter necessidades específicas. 
                Não tenha vergonha de tirar dúvidas com profissionais de saúde!
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-3 rounded-xl text-center transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <p className="text-sm font-medium">{category.name}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <div className="space-y-4">
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                completedTips.includes(tip.id)
                  ? 'bg-green-50 border-green-200'
                  : tip.important
                  ? 'bg-rose-50 border-rose-200'
                  : 'bg-gray-50 border-gray-200 hover:border-rose-300'
              }`}
              onClick={() => toggleTipCompletion(tip.id)}
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 flex-shrink-0">
                  {tip.important && !completedTips.includes(tip.id) && (
                    <AlertCircle className="w-5 h-5 text-rose-500" />
                  )}
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    completedTips.includes(tip.id)
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300'
                  }`}>
                    {completedTips.includes(tip.id) && <CheckCircle className="w-3 h-3 text-white" />}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className={`font-medium mb-2 ${
                    completedTips.includes(tip.id) ? 'text-green-800 dark:text-green-300 line-through' : 'text-gray-800 dark:text-gray-100'
                  }`}>
                    {tip.title}
                    {tip.important && (
                      <span className="ml-2 text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-full">
                        Importante
                      </span>
                    )}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Products Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recomendados</h2>
          </div>
          <div className="space-y-3">
            {recommendedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-green-50 p-3 rounded-lg border border-green-200"
              >
                <h3 className="font-medium text-green-800 mb-1">{product.name}</h3>
                <p className="text-sm text-green-700 mb-2">{product.description}</p>
                <p className="text-xs text-green-600">{product.reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Products to Avoid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Evitar</h2>
          </div>
          <div className="space-y-3">
            {avoidProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-red-50 p-3 rounded-lg border border-red-200"
              >
                <h3 className="font-medium text-red-800 mb-1">{product.name}</h3>
                <p className="text-sm text-red-700 mb-2">{product.description}</p>
                <p className="text-xs text-red-600">{product.reason}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Educational Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recursos Educativos</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">📚 Livros Recomendados</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• "Vulva: A Revolução do Prazer" - Carla Cecarello</li>
              <li>• "O Livro da Vagina" - Nina Brochmann</li>
              <li>• "Ginecologia Natural" - Lara Owen</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">🌐 Sites Confiáveis</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Federação Brasileira de Ginecologia</li>
              <li>• Ministério da Saúde</li>
              <li>• Instituto Nacional de Câncer (INCA)</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HygienePanel;