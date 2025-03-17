'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { customerSignIn } from '@/lib/services/customer.service';

const formSchema = z.object({
  pinCode: z.string().min(6, {
    message: 'Pin code must be 6 characters.',
  }),
});

type SignInData = {
  pinCode: string;
};

export default function SignIn() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pinCode: '',
    },
  });

  const signInMutation = useMutation({
    mutationFn: (data: SignInData) => customerSignIn(data),
    onSuccess: () => {
      toast({
        title: 'Successfully signed in',
        variant: 'default',
      });
      window.location.reload();
    },
    onError: () => {
      toast({
        title: 'Failed to sign in',
        description: 'Please check your pin code and try again',
        variant: 'destructive',
      });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <h6 className="text-2xl font-bold text-center mb-10">Login</h6>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((value: SignInData) => signInMutation.mutate(value))} className="space-y-6">
            <FormField
              control={form.control}
              name="pinCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your 6-digit pin"
                      maxLength={6}
                      {...field}
                      value={field.value.toUpperCase()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
