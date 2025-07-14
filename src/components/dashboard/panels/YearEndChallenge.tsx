import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, CheckCircle, Heart, BookOpen, Dumbbell, 
  GraduationCap, Apple, Book, Sparkles, User, 
  Shield, Star, Mail, Calendar, Trophy, Crown
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface Challenge {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: string;
  completed: boolean;
  completedDate?: string;
}

const YearEndChallenge: React.FC = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const { conteudo, salvar, carregando, erro } = usePainelConteudo('YearEndChallenge');

  const allChallenges: Challenge[] = [
    {
      id: 'god',
      title: 'Buscar mais a Deus',
      description: 'Dedique tempo diário para oração, leitura bíblica e fortalecimento espiritual',
      icon: Heart,
      category: 'Espiritual',
      completed: false,
    },
    {
      id: 'work',
      title: 'Trabalho',
      description: 'Desenvolva suas habilidades profissionais e busque crescimento na carreira',
      icon: Target,
      category: 'Profissional',
      completed: false,
    },
    {
      id: 'gym',
      title: 'Academia',
      description: 'Mantenha uma rotina de exercícios físicos para cuidar do seu corpo',
      icon: Dumbbell,
      category: 'Saúde',
      completed: false,
    },
    {
      id: 'studies',
      title: 'Estudos',
      description: 'Continue aprendendo e se desenvolvendo intelectualmente',
      icon: GraduationCap,
      category: 'Educação',
      completed: false,
    },
    {
      id: 'healthy-food',
      title: 'Alimentação saudável',
      description: 'Cuide da sua alimentação com escolhas nutritivas e equilibradas',
      icon: Apple,
      category: 'Saúde',
      completed: false,
    },
    {
      id: 'reading',
      title: 'Leitura',
      description: 'Leia livros que inspirem e transformem sua perspectiva de vida',
      icon: Book,
      category: 'Educação',
      completed: false,
    },
    {
      id: 'new-skills',
      title: 'Aprender novas habilidades',
      description: 'Explore novos interesses e desenvolva talentos que sempre quis ter',
      icon: Sparkles,
      category: 'Desenvolvimento',
      completed: false,
    },
    {
      id: 'personal-growth',
      title: 'Desenvolvimento pessoal',
      description: 'Trabalhe em si mesma, autoconhecimento e evolução como pessoa',
      icon: User,
      category: 'Desenvolvimento',
      completed: false,
    },
    {
      id: 'spiritual-growth',
      title: 'Crescimento espiritual',
      description: 'Aprofunde sua conexão espiritual e fé em Deus',
      icon: Shield,
      category: 'Espiritual',
      completed: false,
    },
    {
      id: 'gratitude',
      title: 'Gratidão',
      description: 'Pratique a gratidão diariamente, reconhecendo as bênçãos da vida',
      icon: Star,
      category: 'Espiritual',
      completed: false,
    },
  ];

  useEffect(() => {
    if (conteudo) {
      setChallenges(conteudo.challenges || allChallenges);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ challenges });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [challenges]);

  const toggleChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => {
      if (challenge.id === challengeId) {
        return {
          ...challenge,
          completed: !challenge.completed,
          completedDate: !challenge.completed ? new Date().toISOString() : undefined,
        };
      }
      return challenge;
    }));
  };

  const completedCount = challenges.filter(c => c.completed).length;
  const totalCount = challenges.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const categories = ['Todos', 'Espiritual', 'Profissional', 'Saúde', 'Educação', 'Desenvolvimento'];
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredChallenges = challenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'Todos' || challenge.category === selectedCategory;
    const matchesVisibility = showCompleted || !challenge.completed;
    return matchesCategory && matchesVisibility;
  });

  const getDaysUntilDecember = () => {
    const now = new Date();
    const decemberFirst = new Date(now.getFullYear(), 11, 1);
    if (now > decemberFirst) {
      decemberFirst.setFullYear(decemberFirst.getFullYear() + 1);
    }
    const diffTime = decemberFirst.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilDecember = getDaysUntilDecember();

  return (
    <div className="space-y-6 md:space-y-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6 md:p-8"
      >
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center">
              <Trophy className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">
                Desafio de Fim de Ano
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                Sua jornada de transformação até dezembro
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-6"
        >
          <div className="text-center">
            <div className="text-3xl mb-4">✨</div>
            <h2 className="text-lg md:text-xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
              Desafio até o final do ano
            </h2>
            <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-3">
              <p>
                Se você está aqui, é porque está pronta para florescer. Durante os próximos meses, 
                desafie-se a evoluir em várias áreas da sua vida.
              </p>
              <p className="font-medium text-purple-600">
                No dia <span className="font-bold">1 de Dezembro</span> (em {daysUntilDecember} dias), 
                envie um e-mail para{' '}
                <a 
                  href="mailto:mikkaelah.sims@gmail.com" 
                  className="text-pink-600 font-semibold hover:text-pink-700 underline"
                >
                  mikkaelah.sims@gmail.com
                </a>{' '}
                contando sua experiência com esses desafios e com a NaiDiary.
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Diga o que mudou em você. Lembre-se: a jornada não precisa ser perfeita, mas precisa ser verdadeira.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-4 text-center"
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{completedCount}</p>
            <p className="text-sm text-gray-600 leading-relaxed">Concluídos</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card p-4 text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{totalCount}</p>
            <p className="text-sm text-gray-600 leading-relaxed">Total</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card p-4 text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">{daysUntilDecember}</p>
            <p className="text-sm text-gray-600 leading-relaxed">Dias restantes</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm md:text-base text-gray-600 leading-relaxed">Progresso geral</span>
            <span className="text-sm md:text-base font-medium text-purple-600">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-pink-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card p-4 md:p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <h2 className="text-lg md:text-xl font-display font-semibold text-gray-800 leading-tight">
            Seus Desafios
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCompleted(!showCompleted)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                showCompleted
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {showCompleted ? 'Mostrar todos' : 'Ocultar concluídos'}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <AnimatePresence>
            {filteredChallenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`card p-4 md:p-6 transition-all duration-300 hover:shadow-lg ${
                    challenge.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        challenge.completed 
                          ? 'bg-green-100' 
                          : 'bg-purple-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          challenge.completed 
                            ? 'text-green-600' 
                            : 'text-purple-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-base md:text-lg leading-tight ${
                          challenge.completed 
                            ? 'text-green-700 line-through' 
                            : 'text-gray-800'
                        }`}>
                          {challenge.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          challenge.category === 'Espiritual' ? 'bg-purple-100 text-purple-600' :
                          challenge.category === 'Profissional' ? 'bg-blue-100 text-blue-600' :
                          challenge.category === 'Saúde' ? 'bg-green-100 text-green-600' :
                          challenge.category === 'Educação' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-pink-100 text-pink-600'
                        }`}>
                          {challenge.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleChallenge(challenge.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                        challenge.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {challenge.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className={`text-sm md:text-base leading-relaxed ${
                    challenge.completed 
                      ? 'text-green-600' 
                      : 'text-gray-600'
                  }`}>
                    {challenge.description}
                  </p>
                  {challenge.completed && challenge.completedDate && (
                    <p className="text-xs text-green-500 mt-2">
                      Concluído em {new Date(challenge.completedDate).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredChallenges.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhum desafio encontrado para esta categoria.</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="card p-6 md:p-8 bg-gradient-to-r from-pink-50 to-purple-50"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-display font-semibold text-gray-800 mb-3 leading-tight">
            Não se esqueça de compartilhar sua jornada! 💌
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
            Em <span className="font-bold text-purple-600">{daysUntilDecember} dias</span>, 
            envie um e-mail para{' '}
            <a 
              href="mailto:mikkaelah.sims@gmail.com" 
              className="text-pink-600 font-semibold hover:text-pink-700 underline"
            >
              mikkaelah.sims@gmail.com
            </a>{' '}
            contando como foi sua experiência com esses desafios e com o NaiDiary.
          </p>
          <p className="text-sm md:text-base text-gray-600">
            Sua história pode inspirar outras princesas! ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default YearEndChallenge; 