import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zrmtqqlimbqmughtvllf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpybXRxcWxpbWJxbXVnaHR2bGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NTA0MjEsImV4cCI6MjA2ODIyNjQyMX0.MpaUE2RC-GYqGHORCY-pdykH7VTpywqL3y1M9lSLuMw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Kiwify validation function
export const validateKiwifyPurchase = async (email: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from('validated_purchases')
      .select('email')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('Error validating purchase:', error);
    return false;
  }
};

// User management functions
// Removido: export const createUser = async (email: string) => {
//   const { data, error } = await supabase
//     .from('users')
//     .insert({ 
//       email, 
//       profile_completed: false,
//       created_at: new Date().toISOString()
//     })
//     .select()
//     .single();
//
//   if (error) throw error;
//   return data;
// };

export const updateUserProfile = async (userEmail: string, profile: Partial<any>) => {
  const { error } = await supabase
    .from('users')
    .update({ 
      ...profile, 
      updated_at: new Date().toISOString() 
    })
    .eq('email', userEmail);

  if (error) throw error;
};

// Busca usuário pelo id (seguro com RLS)
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

// Salva (upsert) o conteúdo de um painel para um usuário
export async function salvarConteudoDoPainel(userId: string, painel_nome: string, conteudo: any) {
  const { data, error } = await supabase
    .from('painel_conteudos')
    .upsert([
      {
        user_id: userId,
        painel_nome,
        conteudo,
        atualizado_em: new Date().toISOString(),
      },
    ], { onConflict: 'user_id,painel_nome' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Carrega o conteúdo de um painel para um usuário
export async function carregarConteudoDoPainel(userId: string, painel_nome: string) {
  const { data, error } = await supabase
    .from('painel_conteudos')
    .select('conteudo')
    .eq('user_id', userId)
    .eq('painel_nome', painel_nome)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data?.conteudo ?? null;
}

// Garante que o perfil do usuário existe na tabela users
export const ensureUserProfile = async (user: { id: string, email: string }) => {
  const { data } = await supabase
    .from('users')
    .select('id')
    .eq('email', user.email)
    .single();

  if (!data) {
    await supabase.from('users').insert({
      email: user.email,
      profile_completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    });
  }
};