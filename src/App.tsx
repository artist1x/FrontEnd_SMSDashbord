import React, { useState, useEffect } from 'react';
import { Phone, AlertCircle } from 'lucide-react';
import axios from 'axios';
import Analytics from './components/Analytics';
import Filters from './components/Filters';
import TransactionsTable from './components/TransactionsTable';
import { Transaction, TransactionStats } from './types/transaction';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<TransactionStats>({
    totalTransactions: 0,
    totalAmount: 0,
    averageAmount: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:3000/api/transactions');
        const data = response.data;
        
        // Ensure the data is properly structured
        const validatedData = data.map((tx: any) => ({
          timestamp: tx.timestamp || new Date().toISOString(),
          sender: tx.sender || '',
          amount: typeof tx.amount === 'string' ? tx.amount : '0',
        }));

        setTransactions(validatedData);
        setFilteredTransactions(validatedData);
        updateStats(validatedData);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch transactions';
        setError(message);
        // Set empty states on error
        setTransactions([]);
        setFilteredTransactions([]);
        updateStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const updateStats = (data: Transaction[]) => {
    try {
      const totalAmount = data.reduce((sum, tx) => sum + Number(tx.amount), 0);
      setStats({
        totalTransactions: data.length,
        totalAmount,
        averageAmount: data.length > 0 ? totalAmount / data.length : 0,
      });
    } catch (error) {
      console.error('Error updating stats:', error);
      setStats({
        totalTransactions: 0,
        totalAmount: 0,
        averageAmount: 0,
      });
    }
  };

  useEffect(() => {
    try {
      let filtered = [...transactions];

      if (searchQuery) {
        filtered = filtered.filter(tx =>
          tx.sender.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      if (dateRange[0] && dateRange[1]) {
        filtered = filtered.filter(tx => {
          const txDate = new Date(tx.timestamp);
          return txDate >= dateRange[0]! && txDate <= dateRange[1]!;
        });
      }

      setFilteredTransactions(filtered);
      updateStats(filtered);
    } catch (error) {
      console.error('Error filtering transactions:', error);
      setFilteredTransactions([]);
      updateStats([]);
    }
  }, [searchQuery, dateRange, transactions]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-50 rounded-lg">
              <Phone className="h-6 w-6 text-red-500" />
            </div>
            <h1 className="ml-3 text-2xl font-bold text-gray-900">
              Vodafone Cash Tracker
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>{error}</p>
          </div>
        ) : null}
        
        <Analytics stats={stats} />
        <Filters
          dateRange={dateRange}
          onDateChange={setDateRange}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <TransactionsTable transactions={filteredTransactions} />
      </main>
    </div>
  );
}

export default App;