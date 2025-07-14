import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Heart, Sparkles, CheckCircle } from 'lucide-react';

interface ContractModalProps {
  onAccept: () => void;
}

const ContractModal: React.FC<ContractModalProps> = ({ onAccept }) => {
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleAccept = () => {
    if (hasAccepted) {
      onAccept();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 max-w-2xl mx-auto w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-gray-800 leading-tight">
              Contrato de Autovalorização
            </h1>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-4xl mb-2">👑✨</div>
          <p className="text-gray-600 text-lg">Um compromisso sagrado com você mesma</p>
        </motion.div>

        {/* Contract Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg max-w-none mb-6"
        >
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-400 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
              EU, A PRINCESA DA MINHA VIDA, PROMETO:
            </h3>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-start gap-3"
              >
                <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-pink-600">Me tornar obcecada por mim mesma</strong> - colocando-me no pedestal que mereço, reconhecendo minha beleza, inteligência e valor único.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="flex items-start gap-3"
              >
                <Crown className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-purple-600">Ser minha melhor versão</strong> - cultivando hábitos que me elevem, me cuidando com amor e dedicação, e honrando minha essência divina.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="flex items-start gap-3"
              >
                <Sparkles className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
                <p>
                  <strong className="text-yellow-600">Nunca me colocar em segundo plano</strong> - priorizando meu bem-estar, meus sonhos e minha felicidade acima de tudo e todos.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex items-start gap-3"
              >
                <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mt-1 flex-shrink-0" />
                                 <p>
                   <strong className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Honrar minha divindade feminina</strong> - reconhecendo que sou uma criação divina, merecedora de amor, respeito e abundância.
                 </p>
              </motion.div>
            </div>
          </div>

          <div className="text-center bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 font-medium">
              "Eu sou a protagonista da minha história. Eu sou digna de tudo que desejo. Eu sou suficiente."
            </p>
          </div>
        </motion.div>

        {/* Acceptance Checkbox */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <button
            onClick={() => setHasAccepted(!hasAccepted)}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
              hasAccepted 
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 border-transparent' 
                : 'border-gray-300 hover:border-pink-400'
            }`}
          >
            {hasAccepted && <CheckCircle className="w-4 h-4 text-white" />}
          </button>
          <span className="text-gray-700 font-medium">
            Eu aceito e me comprometo com este contrato sagrado
          </span>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center"
        >
          <button
            onClick={handleAccept}
            disabled={!hasAccepted}
            className={`px-8 py-4 font-bold rounded-xl transition-all duration-200 shadow-lg transform ${
              hasAccepted
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {hasAccepted ? 'Assinar Contrato ✨👑' : 'Marque a caixa para continuar'}
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="absolute top-4 right-4 text-4xl opacity-10"
        >
          👑
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute bottom-4 left-4 text-4xl opacity-10"
        >
          ✨
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContractModal; 