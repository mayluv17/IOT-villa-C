'use client';

import { Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { registerUser } from '@/lib/actions/auth.actions';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface StateType {
  status: string;
  message?: string;
  errors?: { username?: string; email?: string; password?: string };
}

export default function Register() {
  return (
    <Suspense>
      <Form />
    </Suspense>
  );
}

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
};

function Form() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirectPath') || '/login';

  const [state, setState] = useState<StateType>({
    status: STATUS.IDLE,
  });

  useEffect(() => {
    document.title = 'Register';
  });

  const doSubmit = async (formData: FormData) => {
    setState((prev) => ({
      ...prev,
      status: STATUS.IDLE,
      message: '',
    }));

    const res = await registerUser(formData);

    if (res?.error) {
      toast.error(res.message);

      setState((prev) => ({
        ...prev,
        status: STATUS.ERROR,
        errors: res.errors,
        message: res?.message,
      }));
    } else {
      window.location.href = `${window.location.origin}${redirectPath}`;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[80%] lg:w-[400px] mx-auto shadow-md rounded p-6">
        <form action={doSubmit} className="grid gap-3">
          <div className="mb-3">
            <Label>Username</Label>
            <Input name="username" />
            {state.errors?.username && (
              <div className="text-red-500 mt-1">{state.errors.username}</div>
            )}
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" />
            {state.errors?.email && (
              <div className="text-red-500 mt-1">{state.errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <Label>Password</Label>
            <Input type="password" name="password" />
            {state.errors?.password && (
              <div className="text-red-500 mt-1">{state.errors.password}</div>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <Button>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
