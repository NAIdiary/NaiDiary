import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 overflow-x-hidden">
      <div className="text-center">
        <Loader2 className="w-6 h-6 md:w-8 md:h-8 animate-spin text-primary-500 mx-auto mb-3 md:mb-4" />
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">Carregando NaiDiary...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;