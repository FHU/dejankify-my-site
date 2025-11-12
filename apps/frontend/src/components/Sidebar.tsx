import React from "react";
import type { Analysis } from "../types";
import HistoryItem from "./HistoryItem";

interface SidebarProps {
  analyses: Analysis[];
  activeId: number;
  onSelectAnalysis: (id: number) => void;
  urlInput: string;
  setUrlInput: (value: string) => void;
  onAnalyze: () => void;
}

const Sidebar = ({
  analyses,
  activeId,
  onSelectAnalysis,
  urlInput,
  setUrlInput,
  onAnalyze,
}: SidebarProps) => {
  return (
    <div>
      <div className="w-[340px] bg-white border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-7 border-b border-gray-200 bg-linear-to-br from-indigo-500 to-purple-600 text-white">
          <div className="text-xl font-bold mb-1.5 flex items-center gap-2">
            <span>⚡</span>
            <span>Dejankify My Site</span>
          </div>
          <div className="text-sm opacity-90">Performance & SEO Analyzer</div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Analyze Website
          </div>
          <input
            type="text"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all bg-white"
            placeholder="https://example.com"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
          />
          <button
            onClick={onAnalyze}
            className="w-full mt-3 px-4 py-3 bg-linear-to-br from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
          >
            <span>🔍</span>
            <span>Run Analysis</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="px-3 py-2 pb-4 text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center justify-between">
            <span>Analysis History</span>
            <span className="bg-gray-200 px-2 py-0.5 rounded-lg font-semibold">
              {analyses.length}
            </span>
          </div>

          {analyses.map((analysis) => (
            <HistoryItem
              key={analysis.id}
              analysis={analysis}
              isActive={analysis.id === activeId}
              onClick={() => onSelectAnalysis(analysis.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
