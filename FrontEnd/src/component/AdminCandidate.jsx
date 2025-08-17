import { useEffect, useState } from 'react';
import {
  fetchCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} from '../utils/candidateapi';
import { useAuth } from '../AuthContext';
import toast, { Toaster } from "react-hot-toast";


function CandidateCard({ candidate, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 flex justify-between items-start bg-white shadow">
      <div>
        <h3 className="font-semibold">{candidate.name || 'Unnamed'}</h3>
        <p className="text-sm text-gray-600">{candidate.age || '0'}</p>
        <p className="text-sm text-gray-600">{candidate.party || 'No description'}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(candidate)}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(candidate._id)}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function AdminCandidates() {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(null); // candidate object or null
  const [form, setForm] = useState({ name: '', age: '',party:'' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const data = await fetchCandidates();
      setCandidates(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (user?.role !== 'admin') return;
    load();
  }, [user]);

  if (user?.role !== 'admin') {
    return <div className="p-6 text-red-600">Access denied. Admins only.</div>;
  }

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', age: '',party:'' });
    setMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    try {
      if (editing) {
        await updateCandidate(editing._id, form);
        toast.success('Candidate update Successfully')
      } else {
        await addCandidate(form);
        toast.success('Candidate added Successfully');
      }
      await load();
      resetForm();
    } catch (e) {
      toast.error('Error: ' + e.message);
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (cand) => {
    setEditing(cand);
    setForm({ name: cand.name || '', party: cand.party || '',age:cand.age || '' });
    setMessage('');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete candidate?')) return;
    try {
      await deleteCandidate(id);
      setCandidates((c) => c.filter((x) => x._id !== id));
      toast.success('candidate deleted Successfully')
    } catch (e) {
      toast.error('Delete failed: ' + e.message);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-indigo-300 to-gray-400 p-6'>
    <div className="max-w-4xl w-full mx-auto p-6 space-y-6 relative">
      <h1 className="text-2xl font-bold">Admin: Manage Candidates</h1>

      <Toaster position="top-right" reverseOrder={false} />

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-5">
          <h2 className="font-semibold mb-3">{editing ? 'Edit Candidate' : 'Add Candidate'}</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full border rounded px-3 py-2"
                placeholder="Candidate name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Age</label>
              <textarea
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                className="w-full border rounded px-3 py-2"
                placeholder="Age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Party</label>
              <textarea
                value={form.party}
                onChange={(e) => setForm((f) => ({ ...f, party: e.target.value }))}
                className="w-full border rounded px-3 py-2"
                placeholder="party"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={busy}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                {editing ? 'Update' : 'Add'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold">Existing Candidates</h2>
          {candidates.length === 0 && <div>No candidates yet.</div>}
          <div className="space-y-3">
            {candidates.map((c) => (
              <CandidateCard
                key={c._id}
                candidate={c}
                onEdit={startEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
