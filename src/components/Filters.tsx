import React from 'react';
import DatePicker from 'react-datepicker';
import { Search } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

interface FiltersProps {
  dateRange: [Date | null, Date | null];
  onDateChange: (dates: [Date | null, Date | null]) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Filters({
  dateRange,
  onDateChange,
  searchQuery,
  onSearchChange,
}: FiltersProps) {
  const [startDate, endDate] = dateRange;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Search by sender number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(dates) => onDateChange(dates as [Date | null, Date | null])}
        className="block w-full py-2 px-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        placeholderText="Select date range"
        isClearable
      />
    </div>
  );
}