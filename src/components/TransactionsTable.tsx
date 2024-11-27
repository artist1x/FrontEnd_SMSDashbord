import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Transaction } from '../types/transaction';
import { format } from 'date-fns';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({ transactions }: TransactionsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor('timestamp', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting()}
        >
          Timestamp
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: (info) => format(new Date(info.getValue()), 'PPp'),
    }),
    columnHelper.accessor('sender', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting()}
        >
          Sender
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
    }),
    columnHelper.accessor('amount', {
      header: ({ column }) => (
        <button
          className="flex items-center gap-2"
          onClick={() => column.toggleSorting()}
        >
          Amount
          <ArrowUpDown className="h-4 w-4" />
        </button>
      ),
      cell: (info) => `EGP ${Number(info.getValue()).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    }),
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}