'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function StudyPlanOutput({ studyPlan }: { studyPlan: string }) {
  const outputRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [studyPlan]);

  if (!studyPlan) return null;

  return (
    <div
      ref={outputRef}
      className="mt-8 p-6 bg-white shadow-lg rounded-xl border border-gray-300"
    >
      <h2 className="text-xl font-semibold text-green-700 mb-4">
        📚 Study Plan Generated
      </h2>
      <div className="prose prose-green max-w-none whitespace-pre-wrap">
        <ReactMarkdown>{studyPlan}</ReactMarkdown>
      </div>
    </div>
  );
}
