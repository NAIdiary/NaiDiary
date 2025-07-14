# Configuração do Supabase

## Tabelas Necessárias

### 1. Tabela `users`
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  profile_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2. Tabela `validated_purchases`
```sql
CREATE TABLE validated_purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Tabela `active_sessions`
```sql
CREATE TABLE active_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);
```

## Configuração de Autenticação

1. **Habilitar Email/Password Auth**:
   - Vá para Authentication > Settings
   - Habilite "Enable email confirmations"
   - Configure o template de email de confirmação

2. **Configurar RLS (Row Level Security)**:
   ```sql
   -- Para tabela users
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can view own profile" ON users
     FOR SELECT USING (auth.uid()::text = id::text);
   
   CREATE POLICY "Users can update own profile" ON users
     FOR UPDATE USING (auth.uid()::text = id::text);
   
   -- Para tabela validated_purchases
   ALTER TABLE validated_purchases ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Anyone can check purchase status" ON validated_purchases
     FOR SELECT USING (true);
   
   -- Para tabela active_sessions
   ALTER TABLE active_sessions ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Users can manage own sessions" ON active_sessions
     FOR ALL USING (auth.uid()::text = user_id::text);
   ```

## Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
```

## Integração com Kiwify

Para integrar com a Kiwify, você pode:

1. **Webhook da Kiwify**: Configure um webhook que insere automaticamente na tabela `validated_purchases`
2. **Verificação Manual**: Adicione manualmente os emails na tabela `validated_purchases`
3. **API da Kiwify**: Use a API da Kiwify para verificar pagamentos em tempo real

## Fluxo do Sistema

1. **Cadastro**: Usuário se cadastra com email/senha
2. **Verificação**: Email é enviado para confirmação
3. **Login**: Após confirmar email, usuário faz login
4. **Verificação de Pagamento**: Sistema verifica se email está na tabela `validated_purchases`
5. **Onboarding**: Se pagamento confirmado, usuário é redirecionado para onboarding
6. **Pagamento**: Após onboarding, usuário é redirecionado para página de pagamento
7. **Dashboard**: Após pagamento confirmado, usuário acessa o dashboard

## Funções do Supabase

### Função para criar usuário automaticamente
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
``` 