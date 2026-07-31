import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Loader2, AlertCircle } from 'lucide-react';
import { loginSchema, type LoginFormValues } from './schemas/LoginSchema';

export default function Login() {
  const navigate = useNavigate();

  // Hooking up React Hook Form with Zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Handling the submission and loading state with React Query
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      // Fake API call to simulate login
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return data;
    },
    onSuccess: (data) => {
      console.log('Login successful:', data);
      // Save a dummy auth token to local storage so the app knows we are logged in
      localStorage.setItem('learnGround_auth', 'true');
      
      // Send the user to the dashboard
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    }
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCFBF3] px-4">
      <div className="w-full max-w-md space-y-8 rounded-[2.5rem] bg-white p-10 shadow-xl shadow-[#A8C9D8]/20 border-4 border-white">
        
        {/* BRAND HEADER */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">LearnGround</h1>
          <h2 className="text-2xl font-extrabold text-slate-700">Sign In</h2>
          <p className="mt-2 text-sm font-bold text-slate-400">Access your student dashboard</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            
            {/* EMAIL INPUT */}
            <div>
              <label htmlFor="email" className="block text-sm font-extrabold text-slate-700 mb-2 ml-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="student@university.edu"
                className={`block w-full rounded-2xl border-2 p-4 outline-none font-medium transition-all ${
                  errors.email 
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100 text-slate-800' 
                    : 'border-[#D6DBDF] bg-[#FCFBF3]/50 focus:bg-white focus:border-[#A8C9D8] focus:ring-4 focus:ring-[#A8C9D8]/40 text-slate-800'
                }`}
                {...register('email')}
              />
              {/* ZOD VALIDATION ERROR DISPLAY */}
              {errors.email && (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{errors.email.message}</p>
                </div>
              )}
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <label htmlFor="password" className="block text-sm font-extrabold text-slate-700 mb-2 ml-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className={`block w-full rounded-2xl border-2 p-4 outline-none font-medium transition-all ${
                  errors.password 
                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100 text-slate-800' 
                    : 'border-[#D6DBDF] bg-[#FCFBF3]/50 focus:bg-white focus:border-[#A8C9D8] focus:ring-4 focus:ring-[#A8C9D8]/40 text-slate-800'
                }`}
                {...register('password')}
              />
              {/* ZOD VALIDATION ERROR DISPLAY */}
              {errors.password && (
                <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-600 border border-red-100 animate-in fade-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{errors.password.message}</p>
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT BUTTON + LOADING STATE */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="flex w-full justify-center items-center rounded-full bg-[#A8C9D8] py-4 px-4 text-base font-extrabold text-slate-800 transition-all hover:bg-[#97b8c7] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#A8C9D8]/30 focus:outline-none focus:ring-4 focus:ring-[#A8C9D8]/50 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
          >
            {loginMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin text-slate-700" />
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