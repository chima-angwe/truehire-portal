const STYLES = {
  pending: 'bg-stone-200 text-stone-700',
  unassigned: 'bg-stone-200 text-stone-700',
  assigned: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-blue-100 text-blue-700',
  awaiting_information: 'bg-orange-100 text-orange-700',
  awaiting_response: 'bg-orange-100 text-orange-700',
  submitted: 'bg-amber-100 text-amber-800',
  awaiting_review: 'bg-amber-100 text-amber-800',
  needs_rework: 'bg-rose-100 text-rose-700',
  escalated: 'bg-red-100 text-red-700',
  approved: 'bg-emerald-100 text-emerald-700',
  completed: 'bg-emerald-100 text-emerald-700',
  delayed: 'bg-red-100 text-red-700',
};

const LABELS = {
  pending: 'Pending',
  unassigned: 'Unassigned',
  assigned: 'Assigned',
  in_progress: 'In Progress',
  awaiting_information: 'Awaiting Info',
  awaiting_response: 'Awaiting Response',
  submitted: 'Submitted',
  awaiting_review: 'Awaiting Review',
  needs_rework: 'Needs Rework',
  escalated: 'Escalated',
  approved: 'Approved',
  completed: 'Completed',
  delayed: 'Delayed',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STYLES[status] || 'bg-stone-200 text-stone-700'}`}>
      {LABELS[status] || status}
    </span>
  );
}
