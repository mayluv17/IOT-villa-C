import axios from 'axios';

export const customerSignIn = async (data: { pinCode: string }): Promise<any> => {
  try {
    const response = await axios.post('/api/customers/auth', {
      pinCode: data.pinCode,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const customerRequest = async (data: {
  email: string;
  category: string;
  message: string;
  villa: string;
}): Promise<any> => {
  try {
    const response = await axios.post('/api/customers/request', {
      email: data.email,
      category: data.category,
      message: data.message,
      villa: data.villa,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getBoxState = async (): Promise<any> => {
  try {
    const response = await axios.get('/api/customers/lockbox');
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const toggleBox = async (data: { status: boolean }): Promise<any> => {
  try {
    const response = await axios.post('/api/customers/lockbox', {
      status: data.status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
