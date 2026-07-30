import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { loginSchema, type LoginFormValues } from './schemas/LoginSchema';

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Hooking up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Handling the submission and loading state
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    // Fake API call for loading spinner
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log('Login successful:', data);
    setIsLoading(false);
    
    // Send the user to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-10 shadow-lg border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sign In</h2>
          <p className="mt-2 text-sm text-gray-600">Access your student dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            
            {/* EMAIL INPUT*/}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="student@university.edu"
                className={`block w-full rounded-md border p-2.5 outline-none transition-colors ${
                  errors.email 
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
                {...register('email')}
              />
              {/* ZOD VALIDATION ERROR DISPLAY*/}
              {errors.email && (
                <p className="mt-1 text-sm text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`block w-full rounded-md border p-2.5 outline-none transition-colors ${
                  errors.password 
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500' 
                    : 'border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                }`}
                {...register('password')}
              />
              {/* ZOD VALIDATION ERROR DISPLAY*/}
              {errors.password && (
                <p className="mt-1 text-sm text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON + LOADING STATE*/}
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full justify-center items-center rounded-md bg-blue-600 py-2.5 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}