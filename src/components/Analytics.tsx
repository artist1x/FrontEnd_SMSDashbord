import React from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import AnalyticsCard from './AnalyticsCard';
import { TransactionStats } from '../types/transaction';

interface AnalyticsProps {
  stats: TransactionStats;
}

export default function Analytics({ stats }: AnalyticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <AnalyticsCard
        title="Total Transactions"
        value={stats.totalTransactions.toLocaleString()}
        icon={Calculator}
        color="bg-blue-50 text-blue-500"
      />
      <AnalyticsCard
        title="Total Amount"
        value={`EGP ${Number(stats.totalAmount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        icon={DollarSign}
        color="bg-green-50 text-green-500"
      />
      <AnalyticsCard
        title="Average Amount"
        value={`EGP ${Number(stats.averageAmount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`}
        icon={TrendingUp}
        color="bg-purple-50 text-purple-500"
      />
    </div>
  );
}