export async function fetchAccess() {
  const response = await fetch('/api/customers');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

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
