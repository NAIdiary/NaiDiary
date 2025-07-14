import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeLetterProps {
  onClose?: () => void;
}

const WelcomeLetter: React.FC<WelcomeLetterProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="bg-white shadow-2xl rounded-2xl p-6 md:p-8 max-w-xl mx-auto w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
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
              Uma carta para você
            </h1>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-3xl">💌</div>
        </motion.div>

        {/* Letter Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <div className="font-serif text-gray-700 leading-relaxed space-y-4 text-base md:text-lg">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-pink-600 font-medium"
            >
              Se você está lendo isso, fique sabendo que <span className="text-purple-600 font-semibold">"tudo acontece por um motivo"</span>. Não importa se nada está dando certo, não importa se tudo parece difícil... acredite, tudo tem um motivo.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Sei que não é fácil ter a mente cheia de problemas, que você sinta que está falhando, que está no fundo do poço. Que sua vida parece ser problema atrás de problema… Mas você precisa entender que a vida é como um filme escrito por <span className="text-purple-600 font-semibold">DEUS</span> e filmado pelos anjos. E a melhor parte é que todo filme tem uma reviravolta <span className="text-pink-500 font-medium">(plot twist)</span>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Deus já escreveu seu destino antes mesmo de você nascer. E uma coisa é certa: você precisa confiar nele. Você precisa se humilhar para Ele. <span className="text-red-500 font-medium">NÃO</span>, Ele não quer que você sofra. Pelo contrário, Ele quer que você aproveite o que tem de melhor no mundo — mas jamais se apegue.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center font-medium"
            >
              Agradeça pelo passado. Confie no futuro. Ele, mais do que ninguém, sabe o que é melhor para você.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-center text-pink-600 font-semibold text-lg md:text-xl"
            >
              Por favor... volte para Ele.
            </motion.p>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="text-center mt-8 pt-6 border-t border-gray-200"
        >
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <Heart className="w-4 h-4 text-pink-400" />
            <span>Com muito amor,</span>
            <Heart className="w-4 h-4 text-pink-400" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">A criadora do NaiDiary</p>
          
          {onClose && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 2.0 }}
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Entendi 💕
            </motion.button>
          )}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="absolute top-4 right-4 text-4xl opacity-10"
        >
          ✨
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 10 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 1, delay: 2.4 }}
          className="absolute bottom-4 left-4 text-4xl opacity-10"
        >
          💫
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeLetter; 