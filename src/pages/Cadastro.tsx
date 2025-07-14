import AuthForm from '../components/auth/AuthForm';
import PaymentRequiredPage from '../components/payment/PaymentRequiredPage';

export default function Cadastro() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-purple-700 dark:text-purple-300">Cadastro / Login</h1>
        <AuthForm />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
          Use o mesmo e-mail da compra na Kiwify para acessar a plataforma.<br/>
          Após cadastrar, confirme seu e-mail para liberar o acesso.
        </p>
      </div>
    </div>
  );
} 