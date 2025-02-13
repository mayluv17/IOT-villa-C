'use client';

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Lock, LockOpen } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

// import Image from 'next/image';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const toggleBox = () => {
    setIsOpen((prev) => !prev);
  };

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      variant: 'default',
      title: 'Enquiry Submitted',
      description: (
        <div className="mt-2 rounded bg-slate-950 p-4">
          <p className="text-white mb-2">Category: {values.category}</p>
          <p className="text-white">Message: {values.message}</p>
        </div>
      ),
    });
    form.reset(); // Reset form after submission
  }

  return (
    <>
      <div
        className={cn(
          'flex gap-2 border-2 rounded p-2 max-w-60 justify-center items-center',
          !isOpen ? 'border-green-400' : 'border-red-400'
        )}
        onClick={toggleBox}>
        {isOpen ? (
          <Lock className="text-red-400" />
        ) : (
          <LockOpen className="text-green-400" />
        )}
        {isOpen ? 'Close Box' : 'Open Box'}
      </div>

      <Card className="max-w-[400px] mt-4">
        <CardHeader>
          <CardTitle>Make a request</CardTitle>
          <CardDescription>Submit your enquiry below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      <Textarea
                        placeholder="Type your message here."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Submit Enquiry
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
