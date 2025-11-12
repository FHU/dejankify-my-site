import React from "react";
import type { Metric } from "../types";
interface MetricCardProps {
  metric: Metric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          {metric.title}
        </div>
        <span className="text-xl">{metric.icon}</span>
      </div>
      <div className="text-[32px] font-extrabold text-gray-900 mb-1">
        {metric.value}
        <span className="text-sm text-gray-600 font-medium">{metric.unit}</span>
      </div>
      <div className="text-sm text-gray-600 font-medium">
        Target: {metric.target}
      </div>
    </div>
  );
};

export default MetricCard;
