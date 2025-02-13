'use client';

import { DataTable } from './data-table';
import { columns } from './columns';
import { useState, useEffect } from 'react';

type Request = {
  id: string;
  email: string;
  villa: string;
  status: 'pending' | 'resolved' | 'in-progress';
  category: 'room' | 'gym' | 'supplies' | 'sauna';
  message: string;
  createdAt: string;
};

async function getData(): Promise<Request[]> {
  // Fetch data from your API here
  return [
    {
      id: '1',
      email: 'user@example.com',
      villa: 'Villa A1',
      status: 'pending',
      category: 'room',
      message: 'AC not working properly',
      createdAt: '2024-03-20',
    },
    // Add more mock data...
  ];
}

export default function RequestsPage() {
  const [data, setData] = useState<Request[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Requests</h2>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
