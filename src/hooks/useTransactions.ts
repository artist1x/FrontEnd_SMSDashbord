import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { api } from '../lib/api';
import { Transaction, TransactionStats } from '../types/transaction';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000');

export function useTransactions() {
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<TransactionStats>({
    totalTransactions: 0,
    totalAmount: 0,
    dailyTransactions: 0,
    dailyAmount: 0
  });

  const { data: transactions = [] } = useQuery('transactions', api.getTransactions, {
    onSuccess: (data) => {
      setFilteredTransactions(data);
      updateStats(data);
    }
  });

  useEffect(() => {
    socket.on('newTransaction', (transaction: Transaction) => {
      const updatedTransactions = [transaction, ...transactions];
      setFilteredTransactions(updatedTransactions);
      updateStats(updatedTransactions);
      toast.success('New transaction received!');
    });

    return () => {
      socket.off('newTransaction');
    };
  }, [transactions]);

  const updateStats = (txs: Transaction[]) => {
    const today = new Date().toISOString().split('T')[0];
    const dailyTxs = txs.filter(t => t.date === today);

    setStats({
      totalTransactions: txs.length,
      totalAmount: txs.reduce((sum, t) => sum + t.amount, 0),
      dailyTransactions: dailyTxs.length,
      dailyAmount: dailyTxs.reduce((sum, t) => sum + t.amount, 0)
    });
  };

  const handleSearch = (query: string) => {
    if (!transactions) return;
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = transactions.filter(tx => 
      tx.senderNumber.toLowerCase().includes(lowercaseQuery) ||
      tx.reference.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredTransactions(filtered);
    updateStats(filtered);
  };

  return {
    transactions: filteredTransactions,
    stats,
    handleSearch
  };
}