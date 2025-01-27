'use client';

import AuthForm from '@/components/auth-form';
import { signInSchema } from '@/lib/validations';
import React from 'react';

export default function Page() {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: '',
        password: '',
      }}
      onSubmit={() => { }}
    />
  );
}
