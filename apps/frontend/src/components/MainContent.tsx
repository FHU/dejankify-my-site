import React from "react";
import type { Analysis } from "../types";
import ScoreCircle from "./ScoreCircle";
import MetricCard from "./MetricCard";
import Section from "./Section";
import type { Metric, IssuesCollection } from "../types";

interface MainContentProps {
  analysis: Analysis | undefined;
}
const sampleMetrics: Metric[] = [
  {
    title: "First Contentful Paint",
    icon: "🎨",
    value: "3.2",
    unit: "s",
    target: "< 1.8s",
  },
  {
    title: "Largest Contentful Paint",
    icon: "🖼️",
    value: "5.1",
    unit: "s",
    target: "< 2.5s",
  },
  {
    title: "Total Blocking Time",
    icon: "⏱️",
    value: "890",
    unit: "ms",
    target: "< 200ms",
  },
  {
    title: "Cumulative Layout Shift",
    icon: "📐",
    value: "0.18",
    unit: "",
    target: "< 0.1",
  },
];

const sampleIssues: IssuesCollection = {
  performance: [
    {
      severity: "critical",
      title: "Large JavaScript Bundle Size",
      description:
        "Your main JavaScript bundle is 2.4 MB, which significantly impacts load time. First Contentful Paint is delayed by 3.2 seconds. This is causing a poor user experience, especially on mobile devices and slower connections.",
      recommendation:
        "Implement code splitting and lazy loading for non-critical components. Use dynamic imports to split your bundle into smaller chunks. Consider using tree-shaking to remove unused code. Target a main bundle size under 500 KB.",
    },
    {
      severity: "critical",
      title: "Unoptimized Images",
      description:
        "23 images are not optimized or properly sized. Total image payload is 8.7 MB. Several images are being served at 4x their display size, wasting bandwidth and slowing down page load times significantly.",
      recommendation:
        "Convert images to modern formats like WebP or AVIF for better compression. Implement responsive images using srcset and sizes attributes. Add lazy loading to images below the fold. Consider using a CDN with automatic image optimization.",
    },
    {
      severity: "warning",
      title: "Render-Blocking Resources",
      description:
        "5 render-blocking CSS files and 3 synchronous scripts are delaying page rendering by approximately 1.8 seconds. These resources must be downloaded and processed before the browser can display content.",
      recommendation:
        "Inline critical CSS directly in the HTML head. Defer non-critical CSS using media queries or JavaScript. Add async or defer attributes to non-critical scripts. Consider using a build tool to extract and inline critical CSS automatically.",
    },
    {
      severity: "info",
      title: "Browser Caching Not Configured",
      description:
        "Static assets don't have appropriate cache headers set, causing unnecessary re-downloads on repeat visits. This impacts return visitor experience and increases server load.",
      recommendation:
        "Set Cache-Control headers with max-age of at least 31536000 (1 year) for immutable assets. Use content hashing in filenames for cache busting when files change. Configure your CDN or server to send proper caching headers for all static resources.",
    },
  ],
  seo: [
    {
      severity: "warning",
      title: "Missing Meta Descriptions",
      description:
        "12 out of 45 pages are missing meta descriptions. This affects how your pages appear in search engine results and can reduce click-through rates from search results pages.",
      recommendation:
        "Add unique, compelling meta descriptions (150-160 characters) for each page that accurately describe the content and include relevant keywords. Write descriptions that encourage users to click through from search results.",
    },
    {
      severity: "info",
      title: "Image Alt Text Incomplete",
      description:
        "34% of images are missing alt attributes, which impacts both SEO and accessibility. Search engines use alt text to understand image content and index your pages appropriately.",
      recommendation:
        'Add descriptive alt text to all meaningful images, incorporating relevant keywords naturally. For decorative images that don\'t add information, use empty alt attributes (alt="") to indicate they should be ignored by screen readers.',
    },
    {
      severity: "info",
      title: "Improve Internal Linking Structure",
      description:
        "Several important product pages have minimal internal links pointing to them, reducing their discoverability by both users and search engines. Strong internal linking helps distribute page authority throughout your site.",
      recommendation:
        "Create a more robust internal linking structure by adding contextual links within content, implementing related product suggestions, and adding category navigation links. Ensure important pages are linked from your homepage or main navigation.",
    },
  ],
  accessibility: [
    {
      severity: "warning",
      title: "Color Contrast Issues",
      description:
        "8 elements have insufficient color contrast ratios (below 4.5:1 for normal text), making text difficult to read for users with visual impairments or when viewing in bright light conditions.",
      recommendation:
        "Increase contrast ratios to meet WCAG AA standards: 4.5:1 for normal text and 3:1 for large text (18pt or 14pt bold). Use a contrast checker tool to verify all text meets these requirements. Consider adjusting your color palette to ensure accessibility.",
    },
    {
      severity: "info",
      title: "Form Labels Missing",
      description:
        "The newsletter signup form and search bar don't have properly associated labels for screen readers. This makes it difficult for users relying on assistive technology to understand the purpose of these form inputs.",
      recommendation:
        'Add proper label elements using the "for" attribute to explicitly associate labels with inputs. Alternatively, use aria-label or aria-labelledby attributes for better screen reader support. Ensure all form controls have accessible names.',
    },
  ],
  bestPractices: [
    {
      severity: "info",
      title: "Mixed Content Detected",
      description:
        "Some resources are being loaded over HTTP instead of HTTPS. This can trigger browser warnings and reduce user trust in your site's security.",
      recommendation:
        "Ensure all resources (images, scripts, stylesheets) are loaded over HTTPS. Update any hardcoded HTTP URLs to use HTTPS or protocol-relative URLs. Configure your server to redirect all HTTP requests to HTTPS.",
    },
  ],
};

const MainContent: React.FC<MainContentProps> = ({ analysis }) => {
  if (!analysis) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500 p-12">
          <div className="text-6xl mb-6 opacity-30">⚡</div>
          <div className="text-xl font-semibold text-gray-900 mb-2">
            No Analysis Selected
          </div>
          <div className="text-sm">
            Enter a URL and run an analysis to get started
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
      <div className="px-10 py-8 bg-white border-b border-gray-200">
        <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
          <span>Analyzing:</span>
          <span className="bg-gray-100 px-2.5 py-1 rounded font-mono text-[13px]">
            {analysis.fullUrl}
          </span>
        </div>
        <h1 className="text-[28px] font-extrabold text-gray-900 mb-5">
          {analysis.title}
        </h1>

        <div className="flex gap-7">
          <ScoreCircle
            score={analysis.scores.overall}
            label="Overall Score"
            sublabel="Needs Improvement"
          />
          <ScoreCircle
            score={analysis.scores.performance}
            label="Performance"
            sublabel="Poor"
          />
          <ScoreCircle
            score={analysis.scores.seo}
            label="SEO"
            sublabel="Good"
          />
          <ScoreCircle
            score={analysis.scores.accessibility}
            label="Accessibility"
            sublabel="Very Good"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="grid grid-cols-4 gap-5 mb-8">
          {sampleMetrics.map((metric, index) => (
            <MetricCard key={index} metric={metric} />
          ))}
        </div>

        <Section
          title="Performance Issues"
          subtitle="4 issues found requiring attention"
          icon="⚡"
          score={analysis.scores.performance}
          issues={sampleIssues.performance}
          iconBg="bg-gradient-to-br from-indigo-500 to-purple-600"
        />

        <Section
          title="SEO Optimization"
          subtitle="3 opportunities to improve search visibility"
          icon="🔍"
          score={analysis.scores.seo}
          issues={sampleIssues.seo}
          iconBg="bg-gradient-to-br from-green-500 to-green-600"
        />

        <Section
          title="Accessibility"
          subtitle="2 issues affecting user experience"
          icon="♿"
          score={analysis.scores.accessibility}
          issues={sampleIssues.accessibility}
          iconBg="bg-gradient-to-br from-orange-500 to-orange-600"
        />

        <Section
          title="Best Practices"
          subtitle="General web development standards"
          icon="✓"
          score={82}
          issues={sampleIssues.bestPractices}
          iconBg="bg-gradient-to-br from-blue-500 to-blue-600"
        />
      </div>
    </div>
  );
};
export default MainContent;
