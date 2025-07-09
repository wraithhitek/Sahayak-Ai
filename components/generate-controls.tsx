'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function GenerateControls({
  subject,
  instructions,
  createPlanChecked,
  setStudyPlan,
  setNotes,
  setNotesGenerated,
}: {
  subject: string;
  instructions: string;
  createPlanChecked: boolean;
  setStudyPlan: (value: string) => void;
  setNotes: (value: string) => void;
  setNotesGenerated: (value: boolean) => void; // ✅ Add this
}) {
  const [loadingStudyPlan, setLoadingStudyPlan] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const handleGenerateStudyPlan = async () => {
    if (!subject || !instructions) return alert('Enter subject and instructions.');
    if (!createPlanChecked) return alert('Enable Study Plan generation.');

    setLoadingStudyPlan(true);
    try {
      const res = await fetch('/api/generate-study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, instructions }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setStudyPlan(data.studyPlan);
    } catch (err: any) {
      console.error('Error generating study plan:', err.message);
      alert('Failed to generate study plan.');
    } finally {
      setLoadingStudyPlan(false);
    }
  };

  const handleGenerateNotes = async () => {
    if (!subject || !instructions) return alert('Enter subject and instructions.');

    setLoadingNotes(true);
    try {
      const res = await fetch('/api/generate-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, instructions }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setNotes(data.notes);
      setNotesGenerated(true); // ✅ Mark as generated
    } catch (err: any) {
      console.error('Error generating notes:', err.message);
      alert('Failed to generate notes.');
      setNotesGenerated(false); // ❌ On error, reset
    } finally {
      setLoadingNotes(false);
    }
  };

  return (
    <div className="space-x-4 mt-4">
      <Button
        onClick={handleGenerateStudyPlan}
        disabled={loadingStudyPlan}
        className="bg-green-600 hover:bg-green-700"
      >
        {loadingStudyPlan ? 'Generating Study Plan...' : 'Generate Study Plan'}
      </Button>

      <Button
        onClick={handleGenerateNotes}
        disabled={loadingNotes}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {loadingNotes ? 'Generating Notes...' : 'Generate Notes'}
      </Button>
    </div>
  );
}
