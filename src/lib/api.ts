import axios from 'axios';
import { Transaction } from '../types/transaction';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = {
  async logTransaction(transaction: Omit<Transaction, 'id'>) {
    const response = await axios.post(`${API_URL}/api/transactions`, transaction);
    return response.data;
  },

  async getTransactions() {
    const response = await axios.get(`${API_URL}/api/transactions`);
    return response.data as Transaction[];
  }
};