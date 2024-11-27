import React from 'react';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';
import { TransactionStats } from '../types/transaction';

interface StatsProps {
  stats: TransactionStats;
}

export default function DashboardStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-2 bg-blue-50 rounded-lg">
            <DollarSign className="h-6 w-6 text-blue-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Amount</p>
            <h3 className="text-xl font-bold text-gray-900">
              GH₵ {stats.totalAmount.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-2 bg-green-50 rounded-lg">
            <Users className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Total Transactions</p>
            <h3 className="text-xl font-bold text-gray-900">
              {stats.totalTransactions.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Daily Amount</p>
            <h3 className="text-xl font-bold text-gray-900">
              EGP {stats.dailyAmount.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center">
          <div className="p-2 bg-orange-50 rounded-lg">
            <Calendar className="h-6 w-6 text-orange-500" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">Daily Transactions</p>
            <h3 className="text-xl font-bold text-gray-900">
              {stats.dailyTransactions}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}