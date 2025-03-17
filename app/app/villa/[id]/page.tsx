'use client';

import { Card, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CarFront, Lock, LockOpen, Send } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import SignIn from './signin';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getBoxState, customerRequest, toggleBox } from '@/lib/services/customer.service';
import { useQueryClient } from '@tanstack/react-query';

type requestFormType = { category: string; message: string; email?: string; villa?: string };

type BoxState = {
  status: boolean;
};

export default function Home() {
  const [isBoxOpen, setIsBoxOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data: boxState } = useQuery<BoxState>({
    queryKey: ['boxState'],
    queryFn: () => getBoxState(),
  });

  useEffect(() => {
    const sessionCookie = document.cookie.split('; ').find((row) => row.startsWith('session='));
    if (sessionCookie) {
      setIsLoggedIn(true);
    }
    if (boxState?.status !== undefined) {
      setIsBoxOpen(boxState.status);
    }
  }, [boxState]);

  const formSchema = z.object({
    category: z.enum(['room', 'gym', 'supplies', 'sauna']),
    message: z.string().min(10, {
      message: 'Message must be at least 10 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: undefined,
      message: '',
    },
  });

  const requestMutation = useMutation({
    mutationFn: (data: requestFormType) => {
      const sessionCookie = document.cookie.split('; ').find((row) => row.startsWith('session='));
      const email = sessionCookie?.split('=')[1] || '';
      const decodedEmail = decodeURIComponent(email);

      if (!email) {
        throw new Error('Not logged in');
      }

      return customerRequest({
        ...data,
        villa: params.id,
        email: decodedEmail,
      });
    },
    onSuccess: () => {
      toast({
        title: 'Request submitted successfully',
        variant: 'default',
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: 'Failed to submit request',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  const toggleBoxMutation = useMutation({
    mutationFn: toggleBox,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boxState'] });
    },
  });

  const handleToggleBox = () => {
    toggleBoxMutation.mutate({ status: !isBoxOpen });
  };

  if (!isLoggedIn) {
    return <SignIn />;
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col gap-4 items-center max-w-screen-sm w-full">
        <Card className="flex flex-col gap-4 items-center max-w-screen-sm w-full">
          <CardHeader className="text-center">
            <CardTitle>Welcome to villa {params.id} occupant</CardTitle>
            <CardDescription>Grab your villa key and start enjoying your stay.</CardDescription>
          </CardHeader>
          <CardContent>
            <button
              className={cn(
                'flex gap-2 border-2 rounded p-2 w-60 justify-center items-center',
                !isBoxOpen ? 'border-green-400' : 'border-red-400'
              )}
              onClick={handleToggleBox}>
              {isBoxOpen ? <Lock className="text-red-400" /> : <LockOpen className="text-green-400" />}
              {isBoxOpen ? 'Close Box' : 'Open Box'}
            </button>
          </CardContent>
        </Card>
        <div className="w-full flex flex-col items-center">
          <div className="w-full bg-yellow-200 border border-yellow-400 rounded p-2 text-center">
            Your currently in villa {params.id}
          </div>
          <Card className="w-full mt-4">
            <CardHeader>
              <CardTitle>Make a request</CardTitle>
              <CardDescription>Submit your enquiry below.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((value: requestFormType) => requestMutation.mutate(value))}
                  className="space-y-4">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="room">Room</SelectItem>
                            <SelectItem value="gym">Gym</SelectItem>
                            <SelectItem value="supplies">Supplies</SelectItem>
                            <SelectItem value="sauna">Sauna</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Type your message here." className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full bg-green-500">
                    <Send className="mr-2" /> Submit Enquiry
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        <hr />
        <div className="w-full p-4 gap-4 flex flex-col">
          <p>Are you ready to leave the apartment?</p>
          <Button className="w-full">
            <CarFront className="mr-2" /> Leave the villa
          </Button>
        </div>
      </div>
    </div>
  );
}
