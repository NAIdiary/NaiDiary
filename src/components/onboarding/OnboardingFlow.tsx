import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { updateUserProfile } from '../../lib/supabase';
import WelcomeLetter from '../ui/WelcomeLetter';
import ContractModal from '../ui/ContractModal';
import DonationStep from '../ui/DonationStep';

interface Question {
  id: string;
  question: string;
  options: { text: string; value: string; score?: number }[];
  type: 'single' | 'multiple';
}

const onboardingQuestions: Question[] = [
  {
    id: 'self_concept',
    question: 'Como você se vê hoje?',
    type: 'single',
    options: [
      { text: 'Amo quem eu sou! ✨', value: 'high', score: 5 },
      { text: 'Tô no processo de me aceitar 💕', value: 'medium', score: 3 },
      { text: 'Ainda não me valorizo como deveria 😔', value: 'low', score: 1 },
    ],
  },
  {
    id: 'pedestal_mindset',
    question: 'Sobre a mentalidade do pedestal...',
    type: 'single',
    options: [
      { text: 'Eu sou a princesa da minha vida! 👑', value: 'high', score: 5 },
      { text: 'Tô aprendendo a me valorizar mais', value: 'medium', score: 3 },
      { text: 'Ainda me coloco em segundo plano', value: 'low', score: 1 },
    ],
  },
  {
    id: 'divine_protection',
    question: 'Você acredita em proteção divina?',
    type: 'single',
    options: [
      { text: 'Sim, totalmente! Deus me protege sempre 🙏', value: 'high', score: 5 },
      { text: 'Às vezes sinto essa proteção', value: 'medium', score: 3 },
      { text: 'Tenho dúvidas sobre isso', value: 'low', score: 1 },
    ],
  },
  {
    id: 'assumption_law',
    question: 'Já pratica a lei da suposição?',
    type: 'single',
    options: [
      { text: 'Sim! Assumo que sou abençoada ✨', value: 'high', score: 5 },
      { text: 'Tô começando a aprender', value: 'medium', score: 3 },
      { text: 'Não sei bem como funciona', value: 'low', score: 1 },
    ],
  },
];

const personalQuestions = [
  {
    id: 'alter_ego',
    question: 'Como você quer ser chamada aqui? (Seu alter ego)',
    type: 'text',
    placeholder: 'Ex: Princesa Luna, Diva Sofia...',
  },
  {
    id: 'age',
    question: 'Qual sua idade?',
    type: 'number',
    placeholder: '18',
  },
  {
    id: 'zodiac_sign',
    question: 'Qual seu signo?',
    type: 'select',
    options: [
      'Áries', 'Touro', 'Gêmeos', 'Câncer', 'Leão', 'Virgem',
      'Libra', 'Escorpião', 'Sagitário', 'Capricórnio', 'Aquário', 'Peixes'
    ],
  },
  {
    id: 'ethnicity',
    question: 'Como você se identifica?',
    type: 'select',
    options: [
      'Branca', 'Preta', 'Parda', 'Indígena', 'Asiática', 'Prefiro não informar'
    ],
  },
];

const OnboardingFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isPersonalInfo, setIsPersonalInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showWelcomeLetter, setShowWelcomeLetter] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
  const { user, updateUser, logout } = useAuth(); // Adiciona logout
  const navigate = useNavigate();

  const totalSteps = onboardingQuestions.length + personalQuestions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextStep = () => {
    if (currentStep < onboardingQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (!isPersonalInfo) {
      setIsPersonalInfo(true);
      setCurrentStep(0);
    } else if (currentStep < personalQuestions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else if (isPersonalInfo) {
      setIsPersonalInfo(false);
      setCurrentStep(onboardingQuestions.length - 1);
    }
  };

  const completeOnboarding = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Envie apenas os campos válidos do schema users
      const profileData = {
        alter_ego: answers.alter_ego,
        age: answers.age,
        zodiac_sign: answers.zodiac_sign,
        ethnicity: answers.ethnicity,
        profile_completed: true,
      };

      await updateUserProfile(user.email, profileData);
      updateUser(profileData);
      setShowContract(true);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContractAccept = () => {
    setShowContract(false);
    setShowWelcomeLetter(true);
  };

  const handleWelcomeLetterClose = () => {
    setShowWelcomeLetter(false);
    setShowDonation(true);
  };

  const currentQuestions = isPersonalInfo ? personalQuestions : onboardingQuestions;
  const currentQuestion = currentQuestions[currentStep];

  if (showContract) {
    return <ContractModal onAccept={handleContractAccept} />;
  }

  if (showWelcomeLetter) {
    return <WelcomeLetter onClose={handleWelcomeLetterClose} />;
  }

  if (showDonation) {
    return <DonationStep />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">Preparando sua experiência...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 overflow-x-hidden relative"> {/* Adiciona relative para posicionamento absoluto */}
      {/* Botão de logout no topo direito */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 btn-secondary z-10"
        title="Sair da conta"
      >
        Sair
      </button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl mx-auto"
      >
        {/* Progress Bar */}
        <div className="mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
              {isPersonalInfo ? 'Vamos te conhecer melhor' : 'Descobrindo seu perfil'}
            </span>
            <span className="text-sm md:text-base font-medium text-primary-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${isPersonalInfo}-${currentStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-4 md:p-8"
          >
            {!isPersonalInfo ? (
              <QuestionStep
                question={currentQuestion as Question}
                answer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
              />
            ) : (
              <PersonalInfoStep
                question={currentQuestion as any}
                answer={answers[currentQuestion.id]}
                onAnswer={handleAnswer}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-4 md:mt-6 gap-3">
          <button
            onClick={prevStep}
            disabled={currentStep === 0 && !isPersonalInfo}
            className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>

          <button
            onClick={nextStep}
            disabled={!answers[currentQuestion.id]}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            {currentStep === personalQuestions.length - 1 && isPersonalInfo ? (
              <>
                Finalizar
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                Próximo
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const QuestionStep: React.FC<{
  question: Question;
  answer: string;
  onAnswer: (id: string, answer: string) => void;
}> = ({ question, answer, onAnswer }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg md:text-2xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-6 md:mb-8 leading-tight">
        {question.question}
      </h2>
      
      <div className="space-y-3 md:space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option.value}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onAnswer(question.id, option.value)}
            className={`w-full p-4 md:p-5 rounded-xl border-2 transition-all duration-200 text-left min-h-[60px] md:min-h-[70px] flex items-center ${
              answer === option.value
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-300 hover:bg-primary-25'
            }`}
          >
            <span className="text-sm md:text-base leading-relaxed">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const PersonalInfoStep: React.FC<{
  question: any;
  answer: any;
  onAnswer: (id: string, answer: any) => void;
}> = ({ question, answer, onAnswer }) => {
  return (
    <div className="text-center">
      <h2 className="text-lg md:text-2xl font-display font-semibold text-gray-800 dark:text-gray-100 mb-6 md:mb-8 leading-tight">
        {question.question}
      </h2>
      
      <div className="max-w-md mx-auto">
        {question.type === 'text' && (
          <input
            type="text"
            value={answer || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="input-field text-center text-base"
          />
        )}
        
        {question.type === 'number' && (
          <input
            type="number"
            value={answer || ''}
            onChange={(e) => onAnswer(question.id, parseInt(e.target.value))}
            placeholder={question.placeholder}
            className="input-field text-center text-base"
          />
        )}
        
        {question.type === 'select' && (
          <select
            value={answer || ''}
            onChange={(e) => onAnswer(question.id, e.target.value)}
            className="input-field text-center text-base"
          >
            <option value="">Selecione uma opção</option>
            {question.options.map((option: string) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow;