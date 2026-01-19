import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import FormField from '../components/ui/form/FormField';
import FormInput from '../components/ui/form/FormInput';

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Enter a password'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      toast.error(error.message ?? 'Failed to sign in');
      return;
    }

    toast.success('Signed in');
    navigate('/admin/clients');
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center px-6">
      <div className="rounded-3xl bg-white px-6 py-8 shadow-sm ring-1 ring-slate-100">
        <h1 className="text-2xl font-semibold text-slate-900">Sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use your admin credentials to access the dashboard.
        </p>
        <form
          className="mt-6 space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            label="Email"
            htmlFor="email"
            error={form.formState.errors.email?.message}
          >
            <FormInput
              id="email"
              type="email"
              placeholder="you@email.com"
              {...form.register('email')}
              hasError={!!form.formState.errors.email}
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="password"
            error={form.formState.errors.password?.message}
          >
            <FormInput
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register('password')}
              hasError={!!form.formState.errors.password}
            />
          </FormField>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-2xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-teal-300"
          >
            {form.formState.isSubmitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
