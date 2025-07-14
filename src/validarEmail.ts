import { supabase } from './lib/supabase';

export async function validarEmail(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)

  if (error) {
    console.error('Erro ao buscar:', error)
    return false
  }

  return data.length > 0;
} 