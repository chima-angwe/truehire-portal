import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/client';

export default function AssignTask() {
  const { taskId } = useParams();
  const [verifiers, setVerifiers] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tasks/verifiers').then((res) => setVerifiers(res.data));
  }, []);

  async function handleAssign() {
    const task = await api.patch(`/tasks/${taskId}/assign`, { verifierId: selected });
    navigate(`/cases/${task.data.case}`);
  }

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-serif italic text-2xl mb-1">Assign Verification</h1>
      <p className="text-stone-500 text-sm mb-6">Choose who will handle this verification task.</p>

      <div className="space-y-2 mb-6">
        {verifiers.map((v) => (
          <button
            key={v._id} onClick={() => setSelected(v._id)}
            className={`w-full text-left p-4 rounded-xl border transition ${
              selected === v._id ? 'border-gold bg-amber-50' : 'border-stone-200 bg-white hover:border-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm">{v.name}</div>
                <div className="text-xs text-stone-400">{v.location}</div>
              </div>
              <div className="text-xs text-stone-500">{v.activeCases} active cases</div>
            </div>
          </button>
        ))}
      </div>

      <button
        disabled={!selected} onClick={handleAssign}
        className="bg-ink text-paper rounded-lg px-5 py-2.5 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-800"
      >
        Confirm Assignment
      </button>
    </div>
  );
}
