export async function fetchAccess() {
  const response = await fetch('/api/customers');
  if (!response.ok) {
    throw new Error('Failed to fetch access');
  }
  return response.json();
}

export const deleteAccess = async (id: string) => {
  const response = await fetch(`/api/customers/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete access');
  }
  return response.json();
};

export async function generateAccess(data: { email: string; validity: Date }) {
  const response = await fetch('/api/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      expiresAt: data.validity.toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate access');
  }

  return response.json();
}
