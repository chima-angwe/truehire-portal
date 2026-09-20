import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/tasks/my/assignments').then((res) => setTasks(res.data));
  }, []);

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="font-serif italic text-2xl mb-1">My Assignments</h1>
      <p className="text-stone-500 text-sm mb-6">Verification tasks currently assigned to you.</p>

      <div className="space-y-3">
        {tasks.map((t) => (
          <Link
            key={t._id} to={`/tasks/${t._id}/verify`}
            className="block bg-white border border-stone-200 rounded-xl p-5 hover:border-gold transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{t.case?.candidate?.name}</div>
                <div className="text-xs text-stone-400 capitalize mt-0.5">{t.type} verification — {t.case?.client?.name}</div>
              </div>
              <div className="text-xs text-stone-400">
                Due {t.case?.dueDate ? new Date(t.case.dueDate).toLocaleDateString() : '—'}
              </div>
            </div>
          </Link>
        ))}
        {tasks.length === 0 && (
          <div className="text-sm text-stone-400 text-center py-12">No assignments right now.</div>
        )}
      </div>
    </div>
  );
}
