'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccess } from '@/lib/services/access.service';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export type Access = {
  id: string;
  pinCode: string;
  expiresAt: string;
  email: string;
};

function DeleteAction({ access }: { access: Access }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: deleteAccess,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['access'] });
      toast({
        title: 'Access Deleted',
        description: 'The access has been successfully deleted',
      });
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete access',
      });
    },
  });

  return (
    <DropdownMenuItem onClick={() => mutation.mutate(access.id)}>
      Delete Access
    </DropdownMenuItem>
  );
}

export const columns: ColumnDef<Access>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'pinCode',
    header: 'Code',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('pinCode')}</div>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'expiresAt',
    header: () => <div className="text-right">Validity</div>,
    cell: ({ row }) => {
      // const validity = row.getValue('validity');
      return (
        <div className="text-right font-medium">
          {format(new Date(row.getValue('expiresAt')), 'PPp')}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const access = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(access.pinCode)}>
              Copy Access code
            </DropdownMenuItem>
            <DeleteAction access={access} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
