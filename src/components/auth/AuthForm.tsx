import { useState } from 'react';
import { signUp, signIn } from '../../lib/auth';
import { supabase } from '../../lib/supabase';
import { validarEmail } from '../../lib/validarEmail';

export default function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setMsg('');
    const { error } = await signUp(email, password);
    if (error) setMsg(error.message);
    else setMsg('Cadastro realizado! Verifique sua caixa de e-mail (inclusive spam) para confirmar sua conta antes de fazer login.');
    setLoading(false);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setMsg('');
    // Validação de e-mail antes do login
    const isValid = await validarEmail(email);
    if (!isValid) {
      setMsg('Seu e-mail não está liberado para acesso.');
      setLoading(false);
      return;
    }
    const { error } = await signIn(email, password);
    if (error) setMsg(error.message);
    else setMsg('Login realizado!');
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 320, margin: '0 auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>Entrar ou Cadastrar</h2>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="E-mail"
        type="email"
        style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Senha"
        style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      />
      <button onClick={handleSignUp} disabled={loading} style={{ width: '100%', marginBottom: 8, padding: 10, background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 4 }}>
        Cadastrar
      </button>
      <button onClick={handleSignIn} disabled={loading} style={{ width: '100%', marginBottom: 8, padding: 10, background: '#6366f1', color: '#fff', border: 'none', borderRadius: 4 }}>
        Entrar
      </button>
      {msg && (
        <div style={{
          marginTop: 12,
          color: msg.includes('Verifique') || msg.includes('Cadastro realizado') ? 'green' : 'red',
          background: msg.includes('Verifique') || msg.includes('Cadastro realizado') ? '#e6ffed' : 'transparent',
          border: msg.includes('Verifique') || msg.includes('Cadastro realizado') ? '1px solid #b7eb8f' : 'none',
          padding: msg.includes('Verifique') || msg.includes('Cadastro realizado') ? 10 : 0,
          borderRadius: 6,
          textAlign: 'center',
        }}>
          {msg}
        </div>
      )}
    </div>
  );
} 