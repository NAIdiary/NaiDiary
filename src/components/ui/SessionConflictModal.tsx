import React from 'react';
import { motion } from 'framer-motion';

interface SessionConflictModalProps {
  onAcknowledge: () => void;
}

const SessionConflictModal: React.FC<SessionConflictModalProps> = ({ onAcknowledge }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full border border-pink-200 dark:border-pink-800 text-center"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-2">Detecção de Múltiplas Sessões</h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4 text-base">
            Você está conectada em mais de um dispositivo. Por motivos de segurança e para proteger o conteúdo exclusivo do NaiDiary, permitimos apenas uma sessão ativa por vez.<br /><br />
            Por favor, desconecte-se de outro dispositivo para continuar usando normalmente.
          </p>
          <button
            onClick={onAcknowledge}
            className="btn-primary w-full mt-2 text-base"
            autoFocus
          >
            Entendi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SessionConflictModal; 