import { supabase } from './supabase';

// Cadastro de usuário (sign up)
export async function signUp(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

// Login de usuário (sign in)
export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

// Logout
export async function signOut() {
  return await supabase.auth.signOut();
} 