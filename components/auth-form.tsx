'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from 'react-hook-form';
import { ZodType } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import ImageUpload from './image-upload';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

type AuthFormPropsType<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: 'SIGN_IN' | 'SIGN_UP';
};

export default function AuthForm<T extends FieldValues>({
  type,
  schema,
  defaultValues,
  onSubmit,
}: Readonly<AuthFormPropsType<T>>) {
  const router = useRouter();
  const isSignIn = type === 'SIGN_IN';

  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);

    if (result.success) {
      toast({
        title: 'Success',
        description: `You have successfully ${isSignIn ? 'Signed in' : 'Signed up'} to BookWise.`,
      });

      router.push('/');
    } else {
      toast({
        title: `Error ${isSignIn ? 'Signing in' : 'Signing up'}`,
        description: result.error ?? 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome back to BookWise' : 'Create your library account'}
      </h1>

      <p className="text-light-100">
        {isSignIn
          ? 'Access the vast collection of resources, and stay updated!'
          : 'Please complete all fields and upload a valid university ID to gain access to the library.'}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === 'universityId' ? (
                      <ImageUpload onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="form-btn">
            {isSignIn ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? 'New to BookWise? ' : 'Already have an account? '}

        <Link
          href={isSignIn ? '/sign-up' : '/sign-in'}
          className="font-bold text-primary"
        >
          {isSignIn ? 'Create an account' : 'Sign in'}
        </Link>
      </p>
    </div>
  );
}
