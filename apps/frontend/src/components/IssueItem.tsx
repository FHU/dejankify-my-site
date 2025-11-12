import React from "react";
import type { Issue } from "../types";
import type { IssueSeverity } from "../types";
interface IssueItemProps {
  issue: Issue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  interface SeverityConfig {
    borderColor: string;
    bgColor: string;
    iconBg: string;
    icon: string;
  }

  const severityConfig: Record<IssueSeverity, SeverityConfig> = {
    critical: {
      borderColor: "border-l-red-500",
      bgColor: "bg-red-50 hover:bg-red-100",
      iconBg: "bg-red-500",
      icon: "!",
    },
    warning: {
      borderColor: "border-l-orange-500",
      bgColor: "bg-orange-50 hover:bg-orange-100",
      iconBg: "bg-orange-500",
      icon: "⚠",
    },
    info: {
      borderColor: "border-l-blue-500",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      iconBg: "bg-blue-500",
      icon: "ℹ",
    },
  };

  const config = severityConfig[issue.severity];

  return (
    <div
      className={`flex gap-4 p-4 rounded-lg border-l-4 ${config.borderColor} ${config.bgColor} transition-all hover:translate-x-0.5`}
    >
      <div className="flex-shrink-0">
        <div
          className={`w-8 h-8 rounded-lg ${config.iconBg} text-white flex items-center justify-center text-base font-bold`}
        >
          {config.icon}
        </div>
      </div>
      <div className="flex-1">
        <div className="text-[15px] font-bold text-gray-900 mb-2">
          {issue.title}
        </div>
        <div className="text-sm text-gray-700 leading-relaxed mb-3">
          {issue.description}
        </div>
        <div className="text-[13px] text-gray-900 bg-white p-3 rounded-lg border border-gray-200 leading-relaxed">
          <div className="font-bold text-indigo-600 mb-1.5 flex items-center gap-1.5">
            <span>💡</span>
            <span>Recommendation</span>
          </div>
          {issue.recommendation}
        </div>
      </div>
    </div>
  );
};
export default IssueItem;
