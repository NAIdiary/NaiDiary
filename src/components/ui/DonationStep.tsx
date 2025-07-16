import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

// Sistema simples de i18n
const getLang = () => {
  const lang = navigator.language || navigator.languages[0] || 'pt-BR';
  if (lang.toLowerCase().startsWith('en')) return 'en';
  return 'pt-BR';
};

const messages = {
  'pt-BR': {
    title: 'Apoie o Projeto Nai Diary',
    text: `Estou cursando Ciência da Computação e desenvolvendo um app focado em autoestima e autoconhecimento. Para continuar criando com qualidade, preciso montar um novo setup. Qualquer apoio é muito bem-vindo!`,
    donate: 'Doar agora 💗',
  },
  en: {
    title: 'Support Nai Diary Project',
    text: `I am studying Computer Science and developing an app focused on self-esteem and self-knowledge. To keep creating with quality, I need to build a new setup. Any support is very welcome!`,
    donate: 'Donate now 💗',
  },
};

const lang = getLang();
const t = messages[lang] || messages['pt-BR'];

interface DonationStepProps {
  onClose?: () => void;
}

const DonationStep: React.FC<DonationStepProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleGoToDashboard = async () => {
    try {
      if (!user?.email) {
        alert('Usuária não autenticada.');
        return;
      }
      const { data: updatedUser, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', user.email)
        .single();
      if (error) {
        console.error('Erro ao buscar usuário:', error);
        alert('Erro ao verificar o status do perfil.');
        return;
      }
      if (updatedUser?.profile_completed) {
        navigate('/');
      } else {
        alert('Você ainda precisa completar o onboarding.');
      }
    } catch (err) {
      console.error('Erro inesperado:', err);
      alert('Algo deu errado. Tente novamente.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 max-w-xl mx-auto w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Botão de fechar */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 z-10"
            title="Fechar"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 dark:text-gray-100 leading-tight">
              {t.title}
            </h1>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Message Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <div className="font-serif text-gray-700 leading-relaxed space-y-4 text-base md:text-lg whitespace-pre-line text-center">
            {t.text}
          </div>
        </motion.div>

        {/* Botões de Doação e Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col md:flex-row gap-4 mt-8 justify-center items-center"
        >
          <a
            href="https://ko-fi.com/naidiary"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-200 hover:bg-pink-300 text-pink-800 font-semibold py-3 px-8 rounded-xl shadow-lg text-base transition-all duration-200 text-center"
          >
            {t.donate}
          </a>
          <button
            onClick={handleGoToDashboard}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-xl shadow-md text-base transition-all duration-200 text-center"
          >
            Ir para o Dashboard agora
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DonationStep; 