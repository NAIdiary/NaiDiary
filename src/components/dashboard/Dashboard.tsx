import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import MobileMenu from '../ui/MobileMenu';
import DashboardHome from './DashboardHome';
import EducationPanel from './panels/EducationPanel';
import BodyPanel from './panels/BodyPanel';
import ShoppingPanel from './panels/ShoppingPanel';
import SelfCarePanel from './panels/SelfCarePanel';
import MenstruationPanel from './panels/MenstruationPanel';
import ManifestationPanel from './panels/ManifestationPanel';
import EmotionalTrashPanel from './panels/EmotionalTrashPanel';
import BeautyPanel from './panels/BeautyPanel';
import AppsPanel from './panels/AppsPanel';
import ReligionPanel from './panels/ReligionPanel';
import SelfPanel from './panels/SelfPanel';
import GlowUpPanel from './panels/GlowUpPanel';
import HygienePanel from './panels/HygienePanel';
import AdvicePanel from './panels/AdvicePanel';
import HobbiesPanel from './panels/HobbiesPanel';
import YearEndChallenge from './panels/YearEndChallenge';
import NecessairePanel from './panels/eu/NecessairePanel';
import FimDeSemanaPanel from './panels/eu/FimDeSemanaPanel';
import ClareamentoPanel from './panels/eu/ClareamentoPanel';
import BanhoPremiumPanel from './panels/eu/BanhoPremiumPanel';
import ReceitasPanel from './panels/eu/ReceitasPanel';
import RelacionamentoPanel from './panels/eu/RelacionamentoPanel';
import IdeiasNegocioPanel from './panels/eu/IdeiasNegocioPanel';
import RelacionamentosPanel from './panels/RelacionamentosPanel';
import SaudePanel from './panels/SaudePanel';
import CorpoPanel from './panels/CorpoPanel';
import EntretenimentoPanel from './panels/EntretenimentoPanel';
import DonationStep from '../ui/DonationStep';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDonation, setShowDonation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden transition-colors duration-300 ease-in-out">
      {/* Botão flutuante de doação */}
      <button
        onClick={() => setShowDonation(true)}
        className="fixed bottom-6 right-6 z-40 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-all duration-200"
        title="Apoie o projeto!"
      >
        <span>Doar 💗</span>
      </button>
      {showDonation && <DonationStep onClose={() => setShowDonation(false)} />}
      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'md:ml-16'
        }`}>
          <div className="p-4 md:p-6 pt-16 md:pt-6">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/education" element={<EducationPanel />} />
              <Route path="/body" element={<BodyPanel />} />
              <Route path="/shopping" element={<ShoppingPanel />} />
              <Route path="/selfcare" element={<SelfCarePanel />} />
              <Route path="/menstruation" element={<MenstruationPanel />} />
              <Route path="/manifestation" element={<ManifestationPanel />} />
              <Route path="/emotional-trash" element={<EmotionalTrashPanel />} />
              <Route path="/beauty" element={<BeautyPanel />} />
              <Route path="/apps" element={<AppsPanel />} />
              <Route path="/religion" element={<ReligionPanel />} />
              <Route path="/self" element={<SelfPanel />} />
              <Route path="/eu" element={<SelfPanel />} />
              <Route path="/glow-up" element={<GlowUpPanel />} />
              <Route path="/hygiene" element={<HygienePanel />} />
              <Route path="/advice" element={<AdvicePanel />} />
              <Route path="/hobbies" element={<HobbiesPanel />} />
              <Route path="/year-end-challenge" element={<YearEndChallenge />} />
              <Route path="/eu/necessaire" element={<NecessairePanel />} />
              <Route path="/eu/fim-de-semana" element={<FimDeSemanaPanel />} />
              <Route path="/eu/clareamento" element={<ClareamentoPanel />} />
              <Route path="/eu/banho-premium" element={<BanhoPremiumPanel />} />
              <Route path="/eu/receitas" element={<ReceitasPanel />} />
              <Route path="/eu/relacionamento" element={<RelacionamentoPanel />} />
              <Route path="/eu/ideias-negocio" element={<IdeiasNegocioPanel />} />
              <Route path="/relacionamentos" element={<RelacionamentosPanel />} />
              <Route path="/saude" element={<SaudePanel />} />
              <Route path="/corpo" element={<CorpoPanel />} />
              <Route path="/entretenimento" element={<EntretenimentoPanel />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;