'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { getRequests } from '@/lib/services/request.service';

type RequestType = {
  id: string;
  email: string;
  villa: string;
  status: 'pending' | 'resolved' | 'in-progress';
  category: 'room' | 'gym' | 'supplies' | 'sauna';
  message: string;
  createdAt: string;
};

export default function RequestsPage() {
  const { data: requestsData = [] } = useQuery<RequestType[]>({
    queryKey: ['requests'],
    queryFn: () => getRequests(),
  });

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Requests</h2>
      <DataTable columns={columns} data={requestsData} />
    </div>
  );
}
