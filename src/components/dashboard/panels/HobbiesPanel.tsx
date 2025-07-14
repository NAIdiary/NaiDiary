import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Heart, Plus, CheckCircle, Star, BookOpen, 
  Music, Camera, Users, Sparkles, Target, Clock,
  Book, Brain, Sun, Flower, Dumbbell, Gamepad2
} from 'lucide-react';
import { usePainelConteudo } from '../../../hooks/usePainelConteudo';

interface Hobby {
  id: string;
  name: string;
  category: string;
  description: string;
  completed: boolean;
  favorite: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  timeRequired: string;
  mood: 'creative' | 'relaxing' | 'energetic' | 'social' | 'educational';
}

const HobbiesPanel: React.FC = () => {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [showAddHobby, setShowAddHobby] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newHobby, setNewHobby] = useState<Omit<Hobby, 'id' | 'completed' | 'favorite'>>({
    name: '',
    category: '',
    description: '',
    difficulty: 'easy',
    timeRequired: '',
    mood: 'creative',
  });

  const allHobbies = [
    // 🎨 Criativos e Artísticos
    { name: 'Desenho ou pintura', category: 'Criativos e Artísticos', description: 'Expressar criatividade através da arte', difficulty: 'easy' as const, timeRequired: '30-60 min', mood: 'creative' as const },
    { name: 'Scrapbooking (álbuns decorativos)', category: 'Criativos e Artísticos', description: 'Criar álbuns de memórias personalizados', difficulty: 'medium' as const, timeRequired: '1-2 horas', mood: 'creative' as const },
    { name: 'Fazer colagens estéticas (vision board)', category: 'Criativos e Artísticos', description: 'Criar painéis de inspiração e metas', difficulty: 'easy' as const, timeRequired: '45-90 min', mood: 'creative' as const },
    { name: 'Customizar roupas', category: 'Criativos e Artísticos', description: 'Dar nova vida às peças do guarda-roupa', difficulty: 'medium' as const, timeRequired: '1-3 horas', mood: 'creative' as const },
    { name: 'Caligrafia e lettering', category: 'Criativos e Artísticos', description: 'Aprender a arte da escrita bonita', difficulty: 'medium' as const, timeRequired: '30-60 min', mood: 'creative' as const },
    { name: 'Fazer bijuterias ou acessórios', category: 'Criativos e Artísticos', description: 'Criar peças únicas e personalizadas', difficulty: 'medium' as const, timeRequired: '1-2 horas', mood: 'creative' as const },
    { name: 'DIY (faça você mesma)', category: 'Criativos e Artísticos', description: 'Projetos manuais e artesanato', difficulty: 'easy' as const, timeRequired: '1-4 horas', mood: 'creative' as const },
    { name: 'Design de unhas (nail art)', category: 'Criativos e Artísticos', description: 'Criar designs únicos nas unhas', difficulty: 'medium' as const, timeRequired: '30-90 min', mood: 'creative' as const },
    { name: 'Criar filtros ou efeitos no Instagram', category: 'Criativos e Artísticos', description: 'Desenvolver filtros personalizados', difficulty: 'hard' as const, timeRequired: '2-4 horas', mood: 'creative' as const },
    { name: 'Decorar bullet journals', category: 'Criativos e Artísticos', description: 'Organizar e decorar agendas criativas', difficulty: 'easy' as const, timeRequired: '30-60 min', mood: 'creative' as const },

    // 📚 Mentais e Educativos
    { name: 'Leitura de romances ou poesias', category: 'Mentais e Educativos', description: 'Imersão em mundos literários', difficulty: 'easy' as const, timeRequired: '30-120 min', mood: 'relaxing' as const },
    { name: 'Escrever diário ou fanfics', category: 'Mentais e Educativos', description: 'Expressar pensamentos e criatividade', difficulty: 'easy' as const, timeRequired: '20-60 min', mood: 'creative' as const },
    { name: 'Aprender novos idiomas', category: 'Mentais e Educativos', description: 'Expandir horizontes culturais', difficulty: 'medium' as const, timeRequired: '30-60 min', mood: 'educational' as const },
    { name: 'Resolver quebra-cabeças ou sudoku', category: 'Mentais e Educativos', description: 'Exercitar o cérebro com desafios', difficulty: 'easy' as const, timeRequired: '15-45 min', mood: 'relaxing' as const },
    { name: 'Filosofar e refletir sobre a vida', category: 'Mentais e Educativos', description: 'Desenvolver pensamento crítico', difficulty: 'medium' as const, timeRequired: '30-60 min', mood: 'educational' as const },
    { name: 'Pesquisar sobre espiritualidade ou astrologia', category: 'Mentais e Educativos', description: 'Explorar o universo e autoconhecimento', difficulty: 'easy' as const, timeRequired: '30-90 min', mood: 'relaxing' as const },
    { name: 'Fazer cursos online (ex: arte, moda, negócios)', category: 'Mentais e Educativos', description: 'Desenvolver novas habilidades', difficulty: 'medium' as const, timeRequired: '1-3 horas', mood: 'educational' as const },
    { name: 'Criar podcasts ou blogs', category: 'Mentais e Educativos', description: 'Compartilhar conhecimento e experiências', difficulty: 'hard' as const, timeRequired: '2-4 horas', mood: 'social' as const },
    { name: 'Meditar e estudar autoconhecimento', category: 'Mentais e Educativos', description: 'Desenvolver consciência interior', difficulty: 'easy' as const, timeRequired: '10-30 min', mood: 'relaxing' as const },
    { name: 'Aprender programação ou design', category: 'Mentais e Educativos', description: 'Desenvolver habilidades técnicas', difficulty: 'hard' as const, timeRequired: '2-6 horas', mood: 'educational' as const },

    // 🎧 Sozinhas & Relaxantes
    { name: 'Escutar músicas e criar playlists', category: 'Sozinhas & Relaxantes', description: 'Criar trilhas sonoras para momentos especiais', difficulty: 'easy' as const, timeRequired: '20-60 min', mood: 'relaxing' as const },
    { name: 'Assistir documentários', category: 'Sozinhas & Relaxantes', description: 'Aprender enquanto se diverte', difficulty: 'easy' as const, timeRequired: '45-120 min', mood: 'educational' as const },
    { name: 'Cuidar da pele e cabelo (skincare day)', category: 'Sozinhas & Relaxantes', description: 'Ritual de autocuidado completo', difficulty: 'easy' as const, timeRequired: '30-60 min', mood: 'relaxing' as const },
    { name: 'Fazer banhos relaxantes com sais e velas', category: 'Sozinhas & Relaxantes', description: 'Momento de relaxamento profundo', difficulty: 'easy' as const, timeRequired: '30-60 min', mood: 'relaxing' as const },
    { name: 'Colorir livros antistress', category: 'Sozinhas & Relaxantes', description: 'Atividade terapêutica e relaxante', difficulty: 'easy' as const, timeRequired: '20-60 min', mood: 'relaxing' as const },
    { name: 'Fazer aromaterapia', category: 'Sozinhas & Relaxantes', description: 'Usar óleos essenciais para bem-estar', difficulty: 'easy' as const, timeRequired: '15-30 min', mood: 'relaxing' as const },
    { name: 'Cuidar de plantas ou jardim', category: 'Sozinhas & Relaxantes', description: 'Conectar com a natureza', difficulty: 'easy' as const, timeRequired: '20-60 min', mood: 'relaxing' as const },
    { name: 'Observar o pôr do sol', category: 'Sozinhas & Relaxantes', description: 'Momento de contemplação e paz', difficulty: 'easy' as const, timeRequired: '15-30 min', mood: 'relaxing' as const },
    { name: 'Escrever cartas para o futuro', category: 'Sozinhas & Relaxantes', description: 'Refletir sobre sonhos e metas', difficulty: 'easy' as const, timeRequired: '30-60 min', mood: 'creative' as const },
    { name: 'Criar uma rotina de autocuidado', category: 'Sozinhas & Relaxantes', description: 'Desenvolver hábitos saudáveis', difficulty: 'medium' as const, timeRequired: '30-90 min', mood: 'relaxing' as const },

    // 💃 Físicas e Divertidas
    { name: 'Dançar em casa (TikTok ou freestyle)', category: 'Físicas e Divertidas', description: 'Expressar-se através da dança', difficulty: 'easy' as const, timeRequired: '20-60 min', mood: 'energetic' as const },
    { name: 'Fazer yoga ou pilates', category: 'Físicas e Divertidas', description: 'Exercitar corpo e mente', difficulty: 'medium' as const, timeRequired: '30-90 min', mood: 'relaxing' as const },
    { name: 'Treinar em casa (glúteos, abdômen, pernas)', category: 'Físicas e Divertidas', description: 'Fortalecer o corpo', difficulty: 'medium' as const, timeRequired: '30-60 min', mood: 'energetic' as const },
    { name: 'Patinar ou andar de bicicleta', category: 'Físicas e Divertidas', description: 'Atividades ao ar livre divertidas', difficulty: 'medium' as const, timeRequired: '30-120 min', mood: 'energetic' as const },
    { name: 'Aprender acrobacias simples ou alongamentos', category: 'Físicas e Divertidas', description: 'Desenvolver flexibilidade', difficulty: 'medium' as const, timeRequired: '20-45 min', mood: 'energetic' as const },
    { name: 'Fazer caminhadas com música', category: 'Físicas e Divertidas', description: 'Exercício leve e relaxante', difficulty: 'easy' as const, timeRequired: '30-60 min', mood: 'relaxing' as const },
    { name: 'Experimentar receitas saudáveis', category: 'Físicas e Divertidas', description: 'Cozinhar de forma nutritiva', difficulty: 'medium' as const, timeRequired: '30-120 min', mood: 'creative' as const },
    { name: 'Participar de challenges fitness', category: 'Físicas e Divertidas', description: 'Desafios motivadores de exercício', difficulty: 'medium' as const, timeRequired: '15-45 min', mood: 'energetic' as const },
    { name: 'Treinar poses para fotos', category: 'Físicas e Divertidas', description: 'Desenvolver confiança e postura', difficulty: 'easy' as const, timeRequired: '15-30 min', mood: 'creative' as const },
    { name: 'Brincar com o estilo pessoal (looks)', category: 'Físicas e Divertidas', description: 'Explorar diferentes estilos', difficulty: 'easy' as const, timeRequired: '20-60 min', mood: 'creative' as const },

    // 👯‍♀️ Em grupo ou com amigas
    { name: 'Criar um clube do livro', category: 'Em grupo ou com amigas', description: 'Compartilhar leituras e discussões', difficulty: 'easy' as const, timeRequired: '1-2 horas', mood: 'social' as const },
    { name: 'Fazer chamadas de vídeo temáticas', category: 'Em grupo ou com amigas', description: 'Conectar com amigas virtualmente', difficulty: 'easy' as const, timeRequired: '30-90 min', mood: 'social' as const },
    { name: 'Organizar noites de spa em casa', category: 'Em grupo ou com amigas', description: 'Spa day com as melhores amigas', difficulty: 'easy' as const, timeRequired: '2-4 horas', mood: 'social' as const },
    { name: 'Jogar jogos de tabuleiro ou cartas', category: 'Em grupo ou com amigas', description: 'Diversão e estratégia em grupo', difficulty: 'easy' as const, timeRequired: '1-3 horas', mood: 'social' as const },
    { name: 'Fazer sessões de fotos com amigas', category: 'Em grupo ou com amigas', description: 'Criar memórias fotográficas', difficulty: 'easy' as const, timeRequired: '1-2 horas', mood: 'social' as const },
    { name: 'Gravar vídeos juntas (vlogs, challenges)', category: 'Em grupo ou com amigas', description: 'Criar conteúdo colaborativo', difficulty: 'medium' as const, timeRequired: '1-3 horas', mood: 'social' as const },
    { name: 'Decorar um quarto ou espaço juntas', category: 'Em grupo ou com amigas', description: 'Projeto de decoração colaborativo', difficulty: 'medium' as const, timeRequired: '2-6 horas', mood: 'social' as const },
    { name: 'Escrever um livro colaborativo', category: 'Em grupo ou com amigas', description: 'Criar história em conjunto', difficulty: 'hard' as const, timeRequired: '2-4 horas', mood: 'social' as const },
    { name: 'Fazer um piquenique', category: 'Em grupo ou com amigas', description: 'Dia ao ar livre com amigas', difficulty: 'easy' as const, timeRequired: '2-4 horas', mood: 'social' as const },
    { name: 'Montar um negócio criativo em grupo', category: 'Em grupo ou com amigas', description: 'Empreender juntas', difficulty: 'hard' as const, timeRequired: '4-8 horas', mood: 'social' as const },
  ];

  const categories = [
    'all',
    'Criativos e Artísticos',
    'Mentais e Educativos', 
    'Sozinhas & Relaxantes',
    'Físicas e Divertidas',
    'Em grupo ou com amigas'
  ];

  const categoryIcons = {
    'Criativos e Artísticos': Palette,
    'Mentais e Educativos': Brain,
    'Sozinhas & Relaxantes': Heart,
    'Físicas e Divertidas': Dumbbell,
    'Em grupo ou com amigas': Users,
  };

  const moodColors = {
    creative: 'text-purple-600 bg-purple-100',
    relaxing: 'text-blue-600 bg-blue-100',
    energetic: 'text-orange-600 bg-orange-100',
    social: 'text-pink-600 bg-pink-100',
    educational: 'text-green-600 bg-green-100',
  };

  const difficultyColors = {
    easy: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    hard: 'text-red-600 bg-red-100',
  };

  const addHobby = (hobbyData: any) => {
    const hobby: Hobby = {
      id: Date.now().toString(),
      ...hobbyData,
      completed: false,
      favorite: false,
    };
    setHobbies([hobby, ...hobbies]);
  };

  const toggleHobbyCompleted = (id: string) => {
    setHobbies(hobbies.map(hobby => 
      hobby.id === id ? { ...hobby, completed: !hobby.completed } : hobby
    ));
  };

  const toggleHobbyFavorite = (id: string) => {
    setHobbies(hobbies.map(hobby => 
      hobby.id === id ? { ...hobby, favorite: !hobby.favorite } : hobby
    ));
  };

  const deleteHobby = (id: string) => {
    setHobbies(hobbies.filter(hobby => hobby.id !== id));
  };

  const filteredHobbies = allHobbies.filter(hobby => {
    const matchesCategory = selectedCategory === 'all' || hobby.category === selectedCategory;
    const matchesSearch = hobby.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hobby.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const completedHobbies = hobbies.filter(hobby => hobby.completed).length;
  const favoriteHobbies = hobbies.filter(hobby => hobby.favorite).length;

  const { conteudo, salvar, carregando, erro } = usePainelConteudo('Hobbies');

  useEffect(() => {
    if (conteudo) {
      setHobbies(conteudo.hobbies || []);
    }
  }, [conteudo]);

  useEffect(() => {
    if (!carregando) {
      salvar({ hobbies });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hobbies]);

  return (
    <div className="space-y-4 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4 md:p-6"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-400 to-pink-600 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-gray-800 leading-tight">Hobbies</h1>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">Descubra paixões e desenvolva novos interesses ✨</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-3 md:p-4"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Hobbies Ativos</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-tight">{hobbies.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-3 md:p-4"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Concluídos</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-tight">{completedHobbies}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-3 md:p-4 sm:col-span-2 md:col-span-1"
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">Favoritos</p>
              <p className="text-lg md:text-xl font-bold text-gray-800 leading-tight">{favoriteHobbies}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hobbies Explorer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4 md:p-6"
      >
        <h2 className="text-base md:text-lg font-semibold text-gray-800 leading-tight mb-4">Explorar Hobbies</h2>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar hobbies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field text-base"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
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
              {category === 'all' ? 'Todos' : category}
            </button>
          ))}
        </div>

        {/* Hobbies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filteredHobbies.map((hobby, index) => {
            const Icon = categoryIcons[hobby.category as keyof typeof categoryIcons] || Sparkles;
            const isAdded = hobbies.some(h => h.name === hobby.name);
            
            return (
              <motion.div
                key={hobby.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-3 md:p-4 transition-all duration-200 ${
                  isAdded 
                    ? 'border-purple-200 bg-purple-50' 
                    : 'border-gray-200 hover:shadow-lg hover:border-purple-300'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-purple-500" />
                      <h3 className="font-semibold text-sm md:text-base text-gray-800 leading-tight">
                        {hobby.name}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-2">
                      {hobby.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${moodColors[hobby.mood]}`}>
                        {hobby.mood === 'creative' ? 'Criativo' :
                         hobby.mood === 'relaxing' ? 'Relaxante' :
                         hobby.mood === 'energetic' ? 'Energético' :
                         hobby.mood === 'social' ? 'Social' : 'Educativo'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[hobby.difficulty]}`}>
                        {hobby.difficulty === 'easy' ? 'Fácil' :
                         hobby.difficulty === 'medium' ? 'Médio' : 'Difícil'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{hobby.timeRequired}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {isAdded ? (
                      <>
                        <button
                          onClick={() => toggleHobbyCompleted(hobbies.find(h => h.name === hobby.name)?.id || '')}
                          className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                            hobbies.find(h => h.name === hobby.name)?.completed
                              ? 'bg-green-500 text-white' 
                              : 'border-2 border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {hobbies.find(h => h.name === hobby.name)?.completed && <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => toggleHobbyFavorite(hobbies.find(h => h.name === hobby.name)?.id || '')}
                          className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                            hobbies.find(h => h.name === hobby.name)?.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${hobbies.find(h => h.name === hobby.name)?.favorite ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => deleteHobby(hobbies.find(h => h.name === hobby.name)?.id || '')}
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px]"
                        >
                          <Plus className="w-4 h-4 rotate-45" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => addHobby(hobby)}
                        className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center bg-purple-500 text-white hover:bg-purple-600 transition-colors min-h-[48px] min-w-[48px]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* My Hobbies */}
      {hobbies.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-4 md:p-6"
        >
          <h2 className="text-base md:text-lg font-semibold text-gray-800 leading-tight mb-4">Meus Hobbies</h2>
          <div className="space-y-3 md:space-y-4">
            {hobbies.map((hobby, index) => (
              <motion.div
                key={hobby.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`border-2 rounded-xl p-3 md:p-4 transition-all duration-200 ${
                  hobby.completed 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className={`font-semibold text-sm md:text-base leading-tight ${hobby.completed ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                        {hobby.name}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${moodColors[hobby.mood]}`}>
                        {hobby.mood === 'creative' ? 'Criativo' :
                         hobby.mood === 'relaxing' ? 'Relaxante' :
                         hobby.mood === 'energetic' ? 'Energético' :
                         hobby.mood === 'social' ? 'Social' : 'Educativo'}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-1">
                      {hobby.category}
                    </p>
                    <p className={`text-xs md:text-sm leading-relaxed ${hobby.completed ? 'text-green-600' : 'text-gray-700'}`}>
                      {hobby.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{hobby.timeRequired}</span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => toggleHobbyCompleted(hobby.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                        hobby.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {hobby.completed && <CheckCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => toggleHobbyFavorite(hobby.id)}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center transition-colors min-h-[48px] min-w-[48px] ${
                        hobby.favorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${hobby.favorite ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => deleteHobby(hobby.id)}
                      className="w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors min-h-[48px] min-w-[48px]"
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HobbiesPanel; 