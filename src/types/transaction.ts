export interface Transaction {
  id: number;
  timestamp: string;
  sender: string;
  amount: string;
  status: string;
}

export interface TransactionStats {
  totalTransactions: number;
  totalAmount: number;
  averageAmount: number;
  dailyAmount:number;
  dailyTransactions:number;
}