import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { salvarConteudoDoPainel, carregarConteudoDoPainel } from '../lib/supabase';

export function usePainelConteudo(painel_nome: string) {
  const { user } = useAuth();
  const [conteudo, setConteudo] = useState<any>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConteudo() {
      if (!user?.email) {
        setCarregando(false);
        return;
      }
      setCarregando(true);
      setErro(null);
      try {
        const data = await carregarConteudoDoPainel(user.email, painel_nome);
        setConteudo(data);
      } catch (e: any) {
        setErro(e.message || 'Erro ao carregar conteúdo');
      } finally {
        setCarregando(false);
      }
    }
    fetchConteudo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email, painel_nome]);

  const salvar = async (novoConteudo: any) => {
    if (!user?.email) return;
    setCarregando(true);
    setErro(null);
    try {
      await salvarConteudoDoPainel(user.email, painel_nome, novoConteudo);
      setConteudo(novoConteudo);
    } catch (e: any) {
      setErro(e.message || 'Erro ao salvar conteúdo');
    } finally {
      setCarregando(false);
    }
  };

  return { conteudo, setConteudo, salvar, carregando, erro };
} 