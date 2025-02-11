'use client';
import { Access, columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';

async function getData(): Promise<Access[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      code: 'XHDG63',
      validity: '12 FEB 2025',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      code: 'XHDG63',
      validity: '12 FEB 2025',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      code: 'XHDG63',
      validity: '12 FEB 2025',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      code: 'XHDG63',
      validity: '12 FEB 2025',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      code: 'XHDG63',
      validity: '12 FEB 2025',
      email: 'm@example.com',
    },
    {
      id: '728ed52f',
      code: 'XHDG63',
      validity: '12 FEB 2025',
      email: 'm@example.com',
    },
    // ...
  ];
}

export default function AccessPage() {
  const { toast } = useToast();
  const [data, setData] = useState<Access[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  const formSchema = z.object({
    email: z.string().email(),
    validity: z.date(),
    // email: z.string().min(2, {
    //   message: 'Username must be at least 2 characters.',
    // }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      validity: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      variant: 'default',
      title: 'Access Code Generated',
      description: (
        <pre className="mt-2 w-[340px] rounded bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="container mx-auto p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-8">
          <div className="flex items-end gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="validity"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Validity Until</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}>
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Generate</Button>
          </div>
        </form>
      </Form>
      <Separator />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
