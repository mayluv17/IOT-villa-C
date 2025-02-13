'use client';

import { useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export type Request = {
  id: string;
  email: string;
  villa: string;
  status: 'pending' | 'resolved' | 'in-progress';
  category: 'room' | 'gym' | 'supplies' | 'sauna';
  message: string;
  createdAt: string;
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800',
  'in-progress': 'bg-blue-100 text-blue-800',
};

function RequestDetails({ request }: { request: Request }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            View details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Mark as resolved</DropdownMenuItem>
          <DropdownMenuItem>Mark as in-progress</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Full information about this request
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Status:</span>
              <div className="col-span-3">
                <Badge className={statusColors[request.status]}>
                  {request.status.replace('-', ' ')}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Email:</span>
              <span className="col-span-3">{request.email}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Villa:</span>
              <span className="col-span-3">{request.villa}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Category:</span>
              <span className="col-span-3 capitalize">{request.category}</span>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <span className="font-medium">Created:</span>
              <span className="col-span-3">{request.createdAt}</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <span className="font-medium">Message:</span>
              <div className="col-span-3">{request.message}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export const columns: ColumnDef<Request>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'villa',
    header: 'Villa',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue('category')}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as keyof typeof statusColors;
      return (
        <Badge className={statusColors[status]}>
          {status.replace('-', ' ')}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => {
      const message = row.getValue('message') as string;
      return <span className="truncate max-w-[200px]">{message}</span>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <RequestDetails request={row.original} />,
  },
];
