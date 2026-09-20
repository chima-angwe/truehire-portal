import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';
import StatusBadge from '../components/StatusBadge';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/dashboard').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="p-8 text-stone-400 text-sm">Loading…</div>;

  const cards = [
    { label: 'Active Cases', value: data.counts.total, accent: 'text-ink' },
    { label: 'Pending', value: data.counts.pending, accent: 'text-stone-500' },
    { label: 'In Progress', value: data.counts.inProgress, accent: 'text-blue-600' },
    { label: 'Awaiting Response', value: data.counts.awaitingResponse, accent: 'text-orange-600' },
    { label: 'Awaiting Review', value: data.counts.awaitingReview, accent: 'text-amber-600' },
    { label: 'Needs Rework', value: data.counts.needsRework, accent: 'text-rose-600' },
    { label: 'Escalated', value: data.counts.escalated, accent: 'text-red-600' },
    { label: 'Overdue', value: data.counts.overdue, accent: 'text-red-600' },
    { label: 'Completed', value: data.counts.completed, accent: 'text-emerald-600' },
  ];

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="font-serif italic text-2xl mb-1">Good day, {user?.name?.split(' ')[0]}</h1>
      <p className="text-stone-500 text-sm mb-8">Here's what's happening across your verification operation.</p>

      <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-10">
        {cards.map((c) => (
          <div key={c.label} className="bg-white border border-stone-200 rounded-xl p-4">
            <div className={`text-2xl font-semibold ${c.accent}`}>{c.value}</div>
            <div className="text-xs text-stone-500 mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="font-medium text-sm">Recent Cases</h2>
          <Link to="/cases" className="text-xs text-gold hover:underline">View all →</Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-stone-400 border-b border-stone-100">
              <th className="px-5 py-2.5 font-normal">Case</th>
              <th className="px-5 py-2.5 font-normal">Candidate</th>
              <th className="px-5 py-2.5 font-normal">Client</th>
              <th className="px-5 py-2.5 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.recentCases.map((c) => (
              <tr key={c._id} className="border-b border-stone-50 hover:bg-stone-50">
                <td className="px-5 py-3">
                  <Link to={`/cases/${c._id}`} className="text-gold hover:underline">{c.caseNumber}</Link>
                </td>
                <td className="px-5 py-3">{c.candidate?.name}</td>
                <td className="px-5 py-3 text-stone-500">{c.client?.name}</td>
                <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
