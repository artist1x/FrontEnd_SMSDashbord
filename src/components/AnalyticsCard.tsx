import React from 'react';
import { LucideIcon } from 'lucide-react';


interface AnalyticsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

export default function AnalyticsCard({ title, value, icon: Icon, color }: AnalyticsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center">
        <div className={`p-2 ${color} rounded-lg`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-xl font-bold text-gray-900">{value}</h3>
        </div>
      </div>
    </div>
  );
}