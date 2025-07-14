import { supabase } from '../src/lib/supabase';

// Função handler para o endpoint /api/kiwify-webhook
export default async function handler(req: any, res: any) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extrair dados do corpo da requisição
  const { email, valor, mensagem } = req.body;

  // Validar campos obrigatórios para doação
  if (!email || !valor) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Registrar doação (opcional)
  const { error: insertError } = await supabase
    .from('donations')
    .insert({ email, amount: valor, message: mensagem });
  if (insertError) {
    return res.status(500).json({ error: 'Erro ao registrar doação' });
  }

  // Criar usuário em public.users se ainda não existir
  const { data: userExists, error: userSelectError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (userSelectError && userSelectError.code !== 'PGRST116') {
    return res.status(500).json({ error: 'Erro ao consultar tabela de usuários' });
  }

  if (!userExists) {
    const { error: userInsertError } = await supabase
      .from('users')
      .insert({ email, profile_completed: false });
    if (userInsertError) {
      return res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  // Retornar sucesso
  return res.status(200).json({ success: true });
} 