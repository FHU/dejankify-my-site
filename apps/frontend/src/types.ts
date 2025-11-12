export interface Scores {
  performance: number;
  seo: number;
  accessibility: number;
  overall: number;
}

export interface Analysis {
  id: number;
  url: string;
  timestamp: string;
  scores: Scores;
  title: string;
  fullUrl: string;
}

export interface Metric {
  title: string;
  icon: string;
  value: string;
  unit: string;
  target: string;
}

export type IssueSeverity = "critical" | "warning" | "info";

export interface Issue {
  severity: IssueSeverity;
  title: string;
  description: string;
  recommendation: string;
}

export interface IssuesCollection {
  performance: Issue[];
  seo: Issue[];
  accessibility: Issue[];
  bestPractices: Issue[];
}

export type ScoreColorClass = "excellent" | "good" | "fair" | "poor";
