import axios from 'axios';

export const getRequests = async (): Promise<any> => {
  try {
    const response = await axios.get('/api/customers/request');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDashboardData = async (): Promise<any> => {
  try {
    const response = await axios.get('/api/sensors');
    return response.data;
  } catch (error) {
    throw error;
  }
};
