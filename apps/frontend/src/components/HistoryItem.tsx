//import React from "react";
import type { Analysis } from "../types";
interface HistoryItemProps {
  analysis: Analysis;
  isActive: boolean;
  onClick: () => void;
}

const HistoryItem = ({ analysis, isActive, onClick }: HistoryItemProps) => {
  const getScoreBadgeClass = (score: number): string => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 50) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div
      onClick={onClick}
      className={`p-3.5 mb-2.5 rounded-lg cursor-pointer transition-all border-2 ${
        isActive
          ? "bg-indigo-50 border-indigo-500 shadow-md"
          : "bg-gray-50 border-transparent hover:bg-gray-100 hover:translate-x-0.5"
      }`}
    >
      <div className="text-sm font-semibold text-gray-900 mb-1.5 truncate">
        {analysis.url}
      </div>
      <div className="text-xs text-gray-600 mb-2">{analysis.timestamp}</div>
      <div className="flex gap-1.5 flex-wrap">
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded ${getScoreBadgeClass(
            analysis.scores.performance
          )}`}
        >
          Perf: {analysis.scores.performance}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded ${getScoreBadgeClass(
            analysis.scores.seo
          )}`}
        >
          SEO: {analysis.scores.seo}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded ${getScoreBadgeClass(
            analysis.scores.accessibility
          )}`}
        >
          A11y: {analysis.scores.accessibility}
        </span>
      </div>
    </div>
  );
};

export default HistoryItem;
