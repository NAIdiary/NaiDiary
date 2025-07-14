import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Dumbbell, Apple, TrendingDown, Pill, HelpCircle, Calculator } from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

const sections = [
  {
    icon: Dumbbell,
    title: 'Ganho de massa por tipo de corpo',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Dicas para ganhar massa',
        items: [
          'Treine com regularidade e aumente a carga progressivamente.',
          'Inclua proteínas magras em todas as refeições.',
          'Durma bem para recuperar os músculos.',
          'Consulte um profissional para um treino personalizado.'
        ]
      },
      {
        type: 'list',
        title: 'Suplementos comuns',
        items: [
          'Whey protein',
          'Creatina',
          'BCAA',
          'Hipercalóricos (com orientação)'
        ]
      }
    ]
  },
  {
    icon: Apple,
    title: 'Consumo diário',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Alimentação ideal',
        items: [
          'Inclua frutas, verduras e legumes todos os dias.',
          'Prefira grãos integrais e proteínas magras.',
          'Evite ultraprocessados e excesso de açúcar.',
          'Faça pequenas refeições ao longo do dia.'
        ]
      },
      {
        type: 'text',
        title: 'Dica',
        text: 'Monte um prato colorido e variado para garantir todos os nutrientes.'
      }
    ]
  },
  {
    icon: TrendingDown,
    title: 'Perda de peso',
    color: 'text-purple-500',
    content: [
      {
        type: 'list',
        title: 'Métodos saudáveis',
        items: [
          'Evite dietas radicais e restritivas.',
          'Pratique exercícios aeróbicos e de força.',
          'Beba bastante água ao longo do dia.',
          'Busque acompanhamento profissional.'
        ]
      },
      {
        type: 'list',
        title: 'Sugestão de cardápio',
        items: [
          'Café da manhã: ovos mexidos + fruta',
          'Almoço: arroz integral, feijão, frango grelhado, salada',
          'Lanche: iogurte natural + castanhas',
          'Jantar: sopa de legumes + carne magra'
        ]
      }
    ]
  },
  {
    icon: Pill,
    title: 'Suplementação',
    color: 'text-pink-500',
    content: [
      {
        type: 'list',
        title: 'Suplementos mais usados',
        items: [
          'Whey protein',
          'Multivitamínicos',
          'Ferro e cálcio',
          'Colágeno'
        ]
      },
      {
        type: 'text',
        title: 'Atenção',
        text: 'Suplementos só devem ser usados com orientação profissional.'
      }
    ]
  }
];

const CorpoPanel: React.FC = () => {
  const [height, setHeight] = useState<number>(165);
  const [weight, setWeight] = useState<number>(60);

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('CorpoSimples');

  useEffect(() => {
    if (conteudo) {
      setHeight(conteudo.height ?? 165);
      setWeight(conteudo.weight ?? 60);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ height, weight });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, weight]);

  // Cálculo IMC
  const bmi = weight && height ? (weight / ((height / 100) ** 2)).toFixed(1) : '';
  let bmiStatus = '';
  if (bmi) {
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) bmiStatus = 'Abaixo do peso';
    else if (bmiNum < 25) bmiStatus = 'Peso normal';
    else if (bmiNum < 30) bmiStatus = 'Sobrepeso';
    else bmiStatus = 'Obesidade';
  }
  // Água: 35ml por kg
  const water = weight ? (weight * 35) : 0;
  // Calorias estimadas (fórmula simplificada)
  const calories = weight ? Math.round(weight * 30) : 0;

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-600 rounded-xl flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">Corpo</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Dicas para cuidar do corpo, alimentação, treinos e suplementação.</p>
          </div>
        </div>
      </motion.div>
      {/* Bloco interativo de cálculo */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <Calculator className="w-5 h-5 text-pink-500" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Calcule seu IMC, água e calorias</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Altura (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="input-field w-full" min={120} max={220} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Peso (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="input-field w-full" min={30} max={200} />
          </div>
        </div>
        {bmi && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            <div className="rounded-lg bg-pink-50 dark:bg-pink-900/20 p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">IMC</span>
              <span className="text-2xl font-bold text-pink-600 dark:text-pink-300">{bmi}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{bmiStatus}</span>
            </div>
            <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Água ideal</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-300">{water} ml</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">por dia</span>
            </div>
            <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4 flex flex-col items-center">
              <span className="text-xs text-gray-500 mb-1">Calorias estimadas</span>
              <span className="text-2xl font-bold text-purple-600 dark:text-purple-300">{calories}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">kcal/dia</span>
            </div>
          </div>
        )}
      </motion.div>
      {/* Blocos temáticos */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + idx * 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-5 flex flex-col gap-3 hover:scale-105 transition-transform transition-colors duration-300 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-pink-50 dark:bg-pink-900/20 ${section.color}`}>
              <section.icon className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 group-hover:text-pink-500 transition-colors duration-300">{section.title}</h2>
            <div className="space-y-2 mt-2">
              {section.content.map((item, i) => (
                <div key={i} className="rounded-lg p-3 bg-pink-50 dark:bg-gray-800/40 border border-pink-100 dark:border-pink-900/30">
                  <div className="flex items-center gap-2 mb-1">
                    <HelpCircle className="w-4 h-4 text-pink-400" />
                    <span className="font-medium text-gray-800 dark:text-gray-100">{item.title}</span>
                  </div>
                  {item.type === 'list' && Array.isArray(item.items) && (
                    <ul className="list-disc pl-8 text-sm text-gray-600 dark:text-gray-300">
                      {item.items.map((li, idx) => (
                        <li key={idx}>{li}</li>
                      ))}
                    </ul>
                  )}
                  {item.type === 'text' && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 pl-6">{item.text}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default CorpoPanel; 