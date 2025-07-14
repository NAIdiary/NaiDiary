import { supabase } from './supabase';
import { User } from '../types/index';

export async function validarEmail(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  return !!data && !error;
} 