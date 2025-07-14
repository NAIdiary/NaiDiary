import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, Users, Sparkles, BookOpen, Star } from 'lucide-react';

interface Advice {
  id: string;
  title: string;
  content: string;
  category: string;
  ageGroup: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const AdvicePanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('autoestima');
  const [selectedAge, setSelectedAge] = useState<string>('all');

  const categories: Category[] = [
    {
      id: 'autoestima',
      name: 'Autoestima',
      icon: '💖',
      color: 'from-pink-400 to-rose-500',
      description: 'Dicas para se amar e se valorizar',
    },
    {
      id: 'amizades',
      name: 'Amizades',
      icon: '👭',
      color: 'from-purple-400 to-indigo-500',
      description: 'Como cultivar relacionamentos saudáveis',
    },
    {
      id: 'corpo',
      name: 'Corpo',
      icon: '🌸',
      color: 'from-green-400 to-emerald-500',
      description: 'Aceitação e cuidados com o corpo',
    },
    {
      id: 'futuro',
      name: 'Futuro',
      icon: '🌟',
      color: 'from-yellow-400 to-orange-500',
      description: 'Planejamento e sonhos para o futuro',
    },
    {
      id: 'fe',
      name: 'Fé',
      icon: '🙏',
      color: 'from-blue-400 to-cyan-500',
      description: 'Espiritualidade e crescimento interior',
    },
  ];

  const advice: Advice[] = [
    {
      id: '1',
      title: 'Você é única e especial',
      content: 'Lembre-se sempre: não existe outra pessoa igual a você no mundo inteiro. Suas características, seus sonhos, sua forma de ver a vida - tudo isso te torna única e especial. Pare de se comparar com outras pessoas e comece a celebrar quem você é!',
      category: 'autoestima',
      ageGroup: 'all',
      tags: ['amor próprio', 'unicidade', 'comparação'],
    },
    {
      id: '2',
      title: 'Amizades verdadeiras vs. tóxicas',
      content: 'Uma amiga verdadeira te apoia, te escuta sem julgar e vibra com suas conquistas. Se alguém te faz sentir mal sobre si mesma, critica constantemente ou compete com você, talvez seja hora de repensar essa amizade. Você merece pessoas que te elevam!',
      category: 'amizades',
      ageGroup: 'teens',
      tags: ['amizade tóxica', 'relacionamentos', 'apoio'],
    },
    {
      id: '3',
      title: 'Seu corpo, suas regras',
      content: 'Seu corpo é seu templo e você decide como cuidar dele. Não deixe que padrões de beleza irreais te façam sentir inadequada. Foque em ser saudável e feliz, não em encaixar em moldes criados por outros. Você é linda do jeito que é!',
      category: 'corpo',
      ageGroup: 'all',
      tags: ['aceitação corporal', 'padrões de beleza', 'saúde'],
    },
    {
      id: '4',
      title: 'Sonhe grande, mas comece pequeno',
      content: 'Ter sonhos grandes é maravilhoso! Mas lembre-se de que toda grande jornada começa com pequenos passos. Defina metas menores que te levem ao seu objetivo maior. Cada pequena conquista é uma vitória que te aproxima dos seus sonhos.',
      category: 'futuro',
      ageGroup: 'young-adult',
      tags: ['sonhos', 'metas', 'planejamento'],
    },
    {
      id: '5',
      title: 'A fé move montanhas',
      content: 'Independente da sua religião ou crença, ter fé em algo maior que você pode trazer paz e força nos momentos difíceis. Cultive sua espiritualidade, seja através da oração, meditação ou conexão com a natureza. A fé é um refúgio seguro.',
      category: 'fe',
      ageGroup: 'all',
      tags: ['espiritualidade', 'fé', 'paz interior'],
    },
    {
      id: '6',
      title: 'Não tenha medo de dizer não',
      content: 'Aprender a dizer "não" é um ato de amor próprio. Você não precisa agradar todo mundo o tempo todo. Estabeleça seus limites e os mantenha. Pessoas que realmente te amam vão respeitar suas decisões.',
      category: 'autoestima',
      ageGroup: 'teens',
      tags: ['limites', 'não', 'respeito próprio'],
    },
    {
      id: '7',
      title: 'Qualidade é melhor que quantidade',
      content: 'É melhor ter poucas amigas verdadeiras do que muitas conhecidas superficiais. Invista tempo e energia nas pessoas que realmente importam. Relacionamentos profundos e sinceros são muito mais valiosos que uma grande rede social.',
      category: 'amizades',
      ageGroup: 'all',
      tags: ['qualidade', 'amizades profundas', 'relacionamentos'],
    },
    {
      id: '8',
      title: 'Exercite-se por amor, não por punição',
      content: 'Mova seu corpo porque você o ama, não porque quer puni-lo. Encontre atividades físicas que te dão prazer: dança, caminhada, natação, yoga. O exercício deve ser uma celebração do que seu corpo pode fazer, não uma forma de castigá-lo.',
      category: 'corpo',
      ageGroup: 'all',
      tags: ['exercício', 'amor próprio', 'movimento'],
    },
  ];

  const ageGroups = [
    { id: 'all', name: 'Todas as idades' },
    { id: 'teens', name: 'Adolescentes (13-17)' },
    { id: 'young-adult', name: 'Jovens adultas (18-25)' },
    { id: 'adult', name: 'Adultas (25+)' },
  ];

  const filteredAdvice = advice.filter(item => {
    const categoryMatch = item.category === selectedCategory;
    const ageMatch = selectedAge === 'all' || item.ageGroup === selectedAge || item.ageGroup === 'all';
    return categoryMatch && ageMatch;
  });

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-gray-100">Conselhos</h1>
            <p className="text-gray-600 dark:text-gray-400">Sábias palavras para iluminar seu caminho 💫</p>
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Escolha um tema</h2>
        <div className="grid md:grid-cols-5 gap-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-center transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'ring-2 ring-emerald-500 shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mx-auto mb-2 text-white text-xl`}>
                {category.icon}
              </div>
              <h3 className="font-medium text-gray-800 text-sm">{category.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{category.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Age Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Faixa etária</h2>
        <div className="flex flex-wrap gap-2">
          {ageGroups.map((age) => (
            <button
              key={age.id}
              onClick={() => setSelectedAge(age.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedAge === age.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {age.name}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Selected Category Header */}
      {selectedCategoryData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className={`bg-gradient-to-r ${selectedCategoryData.color} p-6 rounded-xl text-white`}>
            <div className="flex items-center gap-4">
              <div className="text-4xl">{selectedCategoryData.icon}</div>
              <div>
                <h2 className="text-2xl font-bold">{selectedCategoryData.name}</h2>
                <p className="opacity-90">{selectedCategoryData.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Advice Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {filteredAdvice.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="card p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-emerald-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{item.content}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Motivational Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card p-6"
      >
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">
              Mensagem Especial para Você
            </h3>
            <p className="text-emerald-700 text-lg italic mb-4">
              "Você é mais corajosa do que acredita, mais forte do que parece e mais amada do que imagina."
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-emerald-600">
              <Star className="w-4 h-4" />
              <span>Lembre-se disso todos os dias</span>
              <Star className="w-4 h-4" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Additional Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-semibold text-gray-800">Recursos Adicionais</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
            <h3 className="font-medium text-blue-800 mb-2">📞 Precisa de Ajuda?</h3>
            <p className="text-sm text-blue-700 mb-2">
              Se você está passando por momentos difíceis, lembre-se de que não está sozinha.
            </p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• CVV: 188 (24h, gratuito)</li>
              <li>• Conversar com um adulto de confiança</li>
              <li>• Procurar ajuda profissional</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
            <h3 className="font-medium text-purple-800 mb-2">💝 Comunidade</h3>
            <p className="text-sm text-purple-700 mb-2">
              Conecte-se com outras meninas na nossa comunidade para trocar experiências e apoio.
            </p>
            <button className="btn-primary text-xs px-3 py-2">
              Ir para Comunidade
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdvicePanel;