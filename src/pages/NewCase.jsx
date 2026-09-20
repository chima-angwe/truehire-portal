import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';

const CHECK_TYPES = ['employment', 'education', 'identity', 'address', 'reference'];

export default function NewCase() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ candidateName: '', candidateEmail: '', client: '', checks: [], dueDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // reuse dashboard's populate to grab known client orgs from existing cases
    api.get('/cases').then((res) => {
      const unique = new Map();
      res.data.forEach((c) => unique.set(c.client._id, c.client));
      setClients([...unique.values()]);
    });
  }, []);

  function toggleCheck(type) {
    setForm((f) => ({
      ...f,
      checks: f.checks.includes(type) ? f.checks.filter((c) => c !== type) : [...f.checks, type],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await api.post('/cases', form);
    navigate(`/cases/${res.data.case._id}`);
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-serif italic text-2xl mb-1">New Verification Request</h1>
      <p className="text-stone-500 text-sm mb-6">Simulates a client submitting a candidate for screening.</p>

      <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-xl p-6 space-y-4">
        <div>
          <label className="text-xs font-medium text-stone-500">Candidate name</label>
          <input
            required value={form.candidateName}
            onChange={(e) => setForm({ ...form, candidateName: e.target.value })}
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500">Candidate email</label>
          <input
            value={form.candidateEmail}
            onChange={(e) => setForm({ ...form, candidateEmail: e.target.value })}
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500">Client</label>
          <select
            required value={form.client}
            onChange={(e) => setForm({ ...form, client: e.target.value })}
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          >
            <option value="">Select client…</option>
            {clients.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500">Checks required</label>
          <div className="flex flex-wrap gap-2 mt-1.5">
            {CHECK_TYPES.map((type) => (
              <button
                type="button" key={type} onClick={() => toggleCheck(type)}
                className={`px-3 py-1.5 rounded-full text-xs capitalize border ${
                  form.checks.includes(type) ? 'bg-ink text-paper border-ink' : 'border-stone-300 text-stone-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-stone-500">Due date</label>
          <input
            type="date" value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="mt-1 w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
          />
        </div>
        <button
          type="submit" disabled={form.checks.length === 0}
          className="bg-ink text-paper rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-stone-800"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
