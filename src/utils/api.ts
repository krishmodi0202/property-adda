import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// For iOS Simulator (using local network IP)
// For Android Emulator, use: http://10.0.2.2:5000/api
const API_URL = 'http://192.168.1.70:5000/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async ({ name, email, password }: RegisterParams): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

interface LoginParams {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginParams): Promise<AuthResponse> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    
    if (!response.data || !response.data.token || !response.data.user) {
      console.error('Invalid server response:', response.data);
      throw new Error('Invalid response format from server');
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      console.error('Login error:', error.response.data.message);
      throw new Error(error.response.data.message);
    }
    console.error('Login error:', error.message || error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getMe = async (): Promise<User> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Get user error:', error);
    throw error;
  }
};
