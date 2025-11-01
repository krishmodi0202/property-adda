import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// For iOS Simulator (replace with your computer's local IP)
// For Android Emulator, use: http://10.0.2.2:5000/api
const API_URL = 'http://YOUR_LOCAL_IP:5000/api';

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
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
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
