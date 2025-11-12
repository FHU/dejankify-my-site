import React from "react";
import type { ScoreColorClass } from "../types";

interface ScoreCircleProps {
  score: number;
  label: string;
  sublabel: string;
}
const getScoreColorClass = (score: number): ScoreColorClass => {
  if (score >= 90) return "excellent";
  if (score >= 80) return "good";
  if (score >= 50) return "fair";
  return "poor";
};

const ScoreCircle: React.FC<ScoreCircleProps> = ({
  score,
  label,
  sublabel,
}) => {
  const colorClass = getScoreColorClass(score);

  const colorStyles: Record<
    ScoreColorClass,
    { bg: string; text: string; gradient: string }
  > = {
    excellent: {
      bg: "bg-green-100",
      text: "text-green-800",
      gradient: "bg-gradient-to-br from-green-500 to-green-600",
    },
    good: {
      bg: "bg-green-100",
      text: "text-green-800",
      gradient: "bg-gradient-to-br from-green-400 to-green-500",
    },
    fair: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      gradient: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
    poor: {
      bg: "bg-red-100",
      text: "text-red-800",
      gradient: "bg-gradient-to-br from-red-400 to-red-500",
    },
  };

  const styles = colorStyles[colorClass];

  return (
    <div className="flex items-center gap-3.5">
      <div
        className={`relative w-[68px] h-[68px] rounded-full flex items-center justify-center text-[22px] font-extrabold ${styles.bg} ${styles.text} before:content-[''] before:absolute before:inset-[-4px] before:rounded-full before:p-1 before:${styles.gradient} before:-z-10`}
      >
        {score}
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-sm font-bold text-gray-900">{label}</div>
        <div className="text-[13px] text-gray-600 font-medium">{sublabel}</div>
      </div>
    </div>
  );
};

export default ScoreCircle;
